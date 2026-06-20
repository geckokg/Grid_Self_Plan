#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const collator = new Intl.Collator("zh-Hans-CN", {
  numeric: true,
  sensitivity: "base"
});

const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".bmp",
  ".gif",
  ".tif",
  ".tiff"
]);

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const sourceDir = path.resolve(root, args.source ?? "quest_pic");
const outDir = path.resolve(root, args.out ?? "tmp/question-image-scan");
const startIndex = parsePositiveInt(args.start ?? "1", "--start");

await main();

async function main() {
  const sourceStats = await stat(sourceDir).catch(() => null);
  if (!sourceStats?.isDirectory()) {
    throw new Error(`Image source directory not found: ${sourceDir}`);
  }

  await mkdir(outDir, { recursive: true });

  const files = (await collectImageFiles(sourceDir)).sort((a, b) =>
    collator.compare(relativeTo(sourceDir, a), relativeTo(sourceDir, b))
  );

  const categoryCodes = new Map();
  const perCategoryIndexes = new Map();
  const seenHashes = new Map();
  const images = [];

  for (const filePath of files) {
    const relSourcePath = relativeTo(sourceDir, filePath);
    const relProjectPath = relativeTo(root, filePath);
    const parts = relSourcePath.split("/");
    const category = args.category ?? parts[0] ?? "未分类";
    const batch = parts.length > 2 ? parts.slice(1, -1).join("/") : "";
    const buffer = await readFile(filePath);
    const hash = createHash("sha256").update(buffer).digest("hex");
    const ext = path.extname(filePath).toLowerCase();
    const fileStats = await stat(filePath);
    const categoryCode = args.prefix ?? getCategoryCode(categoryCodes, category);
    const serial = nextCategoryIndex(perCategoryIndexes, category, startIndex);
    const id = `${categoryCode}-${String(serial).padStart(4, "0")}`;
    const duplicateOf = seenHashes.get(hash)?.id ?? null;

    const item = {
      id,
      category,
      batch,
      fileName: path.basename(filePath),
      relativePath: relProjectPath,
      sourceRelativePath: relSourcePath,
      extension: ext.slice(1),
      sizeBytes: fileStats.size,
      modifiedAt: fileStats.mtime.toISOString(),
      sha256: hash,
      sha256Short: hash.slice(0, 12),
      duplicateOf,
      width: null,
      height: null,
      status: duplicateOf ? "duplicate" : "pending-review",
      ocrText: "",
      draftQuestion: makeDraftQuestion({
        id,
        category,
        batch,
        source: `图片导入：${relProjectPath}`
      })
    };

    const dimensions = readImageDimensions(buffer, ext);
    if (dimensions) {
      item.width = dimensions.width;
      item.height = dimensions.height;
    }

    images.push(item);
    if (!seenHashes.has(hash)) {
      seenHashes.set(hash, item);
    }
  }

  const manifest = makeManifest(images);
  const drafts = {
    generatedAt: manifest.generatedAt,
    sourceDir: relativeTo(root, sourceDir),
    note: "Fill stem/options/answer/explanation after OCR or manual review, then convert these drafts into src/data/sampleQuestions.ts.",
    drafts: images
      .filter((item) => !item.duplicateOf)
      .map((item) => ({
        imagePath: item.relativePath,
        imageHash: item.sha256Short,
        ocrText: item.ocrText,
        ...item.draftQuestion
      }))
  };

  await writeJson(path.join(outDir, "image-manifest.json"), manifest);
  await writeFile(
    path.join(outDir, "image-manifest.jsonl"),
    images.map((item) => JSON.stringify(item)).join("\n") + (images.length ? "\n" : ""),
    "utf8"
  );
  await writeFile(path.join(outDir, "image-review.csv"), makeCsv(images), "utf8");
  await writeJson(path.join(outDir, "question-drafts.json"), drafts);
  await writeFile(path.join(outDir, "review.html"), makeReviewHtml(images), "utf8");
  await writeFile(path.join(outDir, "report.md"), makeReport(manifest), "utf8");

  console.log(`Scanned ${images.length} image(s) from ${relativeTo(root, sourceDir)}`);
  console.log(`Unique images: ${manifest.uniqueImages}`);
  console.log(`Duplicate images: ${manifest.duplicateImages}`);
  console.log(`Report: ${relativeTo(root, path.join(outDir, "report.md"))}`);
  console.log(`Review page: ${relativeTo(root, path.join(outDir, "review.html"))}`);
}

async function collectImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function makeManifest(images) {
  const generatedAt = new Date().toISOString();
  const byCategory = countBy(images, (item) => item.category);
  const byBatch = countBy(
    images.filter((item) => item.batch),
    (item) => `${item.category}/${item.batch}`
  );
  const byExtension = countBy(images, (item) => item.extension);
  const duplicateImages = images.filter((item) => item.duplicateOf).length;

  return {
    generatedAt,
    sourceDir: relativeTo(root, sourceDir),
    totalImages: images.length,
    uniqueImages: images.length - duplicateImages,
    duplicateImages,
    byCategory,
    byBatch,
    byExtension,
    images
  };
}

function makeDraftQuestion({ id, category, batch, source }) {
  return {
    id,
    type: "single",
    stem: "",
    options: [
      { id: "A", text: "" },
      { id: "B", text: "" },
      { id: "C", text: "" },
      { id: "D", text: "" }
    ],
    answer: [],
    explanation: "",
    category,
    difficulty: "medium",
    source,
    tags: batch ? [batch] : [],
    needsReview: true
  };
}

function makeCsv(images) {
  const columns = [
    "id",
    "status",
    "category",
    "batch",
    "fileName",
    "relativePath",
    "extension",
    "sizeBytes",
    "width",
    "height",
    "sha256Short",
    "duplicateOf",
    "ocrText",
    "stem",
    "optionA",
    "optionB",
    "optionC",
    "optionD",
    "answer",
    "explanation",
    "tags"
  ];

  const rows = images.map((item) => ({
    id: item.id,
    status: item.status,
    category: item.category,
    batch: item.batch,
    fileName: item.fileName,
    relativePath: item.relativePath,
    extension: item.extension,
    sizeBytes: item.sizeBytes,
    width: item.width ?? "",
    height: item.height ?? "",
    sha256Short: item.sha256Short,
    duplicateOf: item.duplicateOf ?? "",
    ocrText: item.ocrText,
    stem: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    explanation: "",
    tags: item.batch
  }));

  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))
  ].join("\n");
}

function makeReviewHtml(images) {
  const cards = images
    .map((item) => {
      const imageUrl = toPosix(path.relative(outDir, path.join(root, item.relativePath)));
      const draft = JSON.stringify(item.draftQuestion, null, 2);
      return `<article class="card ${item.duplicateOf ? "duplicate" : ""}">
  <div class="image-wrap"><img loading="lazy" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.id)}"></div>
  <div class="meta">
    <h2>${escapeHtml(item.id)} <span>${escapeHtml(item.status)}</span></h2>
    <p>${escapeHtml(item.category)}${item.batch ? ` / ${escapeHtml(item.batch)}` : ""}</p>
    <p class="path">${escapeHtml(item.relativePath)}</p>
    <p>${item.width && item.height ? `${item.width} x ${item.height}px · ` : ""}${formatBytes(item.sizeBytes)} · ${escapeHtml(item.sha256Short)}</p>
    ${item.duplicateOf ? `<p class="warn">Duplicate of ${escapeHtml(item.duplicateOf)}</p>` : ""}
    <details>
      <summary>Draft JSON</summary>
      <pre>${escapeHtml(draft)}</pre>
    </details>
  </div>
</article>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Question Image Review</title>
  <style>
    :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f6f7f9; color: #1f2933; }
    header { position: sticky; top: 0; z-index: 1; padding: 16px 20px; background: #fff; border-bottom: 1px solid #d9dee7; }
    h1 { margin: 0 0 4px; font-size: 20px; }
    header p { margin: 0; color: #596575; }
    main { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; padding: 16px; }
    .card { display: grid; grid-template-rows: auto 1fr; overflow: hidden; background: #fff; border: 1px solid #d9dee7; border-radius: 8px; }
    .card.duplicate { opacity: 0.62; }
    .image-wrap { display: grid; place-items: center; min-height: 260px; background: #eef1f5; }
    img { display: block; max-width: 100%; max-height: 420px; object-fit: contain; }
    .meta { padding: 12px; }
    h2 { display: flex; gap: 8px; align-items: center; margin: 0 0 8px; font-size: 16px; }
    h2 span { padding: 2px 6px; border-radius: 999px; background: #e8eef7; color: #42526b; font-size: 12px; font-weight: 500; }
    p { margin: 6px 0; font-size: 13px; }
    .path { word-break: break-all; color: #596575; }
    .warn { color: #9a3412; }
    summary { cursor: pointer; font-size: 13px; }
    pre { overflow: auto; max-height: 260px; padding: 10px; background: #111827; color: #e5e7eb; border-radius: 6px; font-size: 12px; }
  </style>
</head>
<body>
  <header>
    <h1>Question Image Review</h1>
    <p>${images.length} images scanned from ${escapeHtml(relativeTo(root, sourceDir))}. Edit OCR/question data in JSONL/CSV, then import reviewed drafts.</p>
  </header>
  <main>
${cards}
  </main>
</body>
</html>
`;
}

function makeReport(manifest) {
  return `# Question image scan report

- Generated at: ${manifest.generatedAt}
- Source: \`${manifest.sourceDir}\`
- Total images: ${manifest.totalImages}
- Unique images: ${manifest.uniqueImages}
- Duplicate images: ${manifest.duplicateImages}

## By category

${makeMarkdownTable(manifest.byCategory, ["Category", "Count"])}

## By batch

${makeMarkdownTable(manifest.byBatch, ["Batch", "Count"])}

## By extension

${makeMarkdownTable(manifest.byExtension, ["Extension", "Count"])}

## Output files

- \`image-manifest.json\`: full scan result with draft question skeletons
- \`image-manifest.jsonl\`: one image per line, useful for batch processing
- \`image-review.csv\`: spreadsheet-friendly review file
- \`question-drafts.json\`: unique-image draft question objects
- \`review.html\`: local visual review page

## Next step

Fill \`ocrText\`, \`stem\`, options, answer, explanation, and tags in a reviewed file. Then convert reviewed rows into \`src/data/sampleQuestions.ts\`.
`;
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function makeMarkdownTable(entries, [labelColumn, valueColumn]) {
  const rows = Object.entries(entries);
  if (!rows.length) {
    return "_No rows._";
  }

  return [
    `| ${labelColumn} | ${valueColumn} |`,
    "| --- | ---: |",
    ...rows.map(([label, count]) => `| ${label || "(empty)"} | ${count} |`)
  ].join("\n");
}

function countBy(items, keyFn) {
  return Object.fromEntries(
    Array.from(
      items.reduce((acc, item) => {
        const key = keyFn(item);
        acc.set(key, (acc.get(key) ?? 0) + 1);
        return acc;
      }, new Map())
    ).sort(([a], [b]) => collator.compare(a, b))
  );
}

function getCategoryCode(categoryCodes, category) {
  const existing = categoryCodes.get(category);
  if (existing) {
    return existing;
  }

  const asciiSlug = slug(category);
  const code = asciiSlug || `cat${String(categoryCodes.size + 1).padStart(3, "0")}`;
  categoryCodes.set(category, code);
  return code;
}

function nextCategoryIndex(perCategoryIndexes, category, start) {
  const current = perCategoryIndexes.get(category) ?? start;
  perCategoryIndexes.set(category, current + 1);
  return current;
}

function slug(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readImageDimensions(buffer, ext) {
  if (ext === ".png") {
    return readPngDimensions(buffer);
  }
  if (ext === ".jpg" || ext === ".jpeg") {
    return readJpegDimensions(buffer);
  }
  if (ext === ".gif") {
    return readGifDimensions(buffer);
  }
  if (ext === ".webp") {
    return readWebpDimensions(buffer);
  }
  return null;
}

function readPngDimensions(buffer) {
  if (
    buffer.length < 24 ||
    buffer.readUInt32BE(0) !== 0x89504e47 ||
    buffer.readUInt32BE(4) !== 0x0d0a1a0a
  ) {
    return null;
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    const size = buffer.readUInt16BE(offset);
    if (size < 2) {
      return null;
    }

    const isSof =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isSof) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5)
      };
    }

    offset += size;
  }

  return null;
}

function readGifDimensions(buffer) {
  if (buffer.length < 10 || buffer.toString("ascii", 0, 3) !== "GIF") {
    return null;
  }
  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  };
}

function readWebpDimensions(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }

  const format = buffer.toString("ascii", 12, 16);
  if (format === "VP8X" && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3)
    };
  }

  if (format === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff
    };
  }

  if (format === "VP8L" && buffer.length >= 25) {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1
    };
  }

  return null;
}

function parseArgs(rawArgs) {
  const parsed = {};

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const next = rawArgs[i + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for ${arg}`);
    }

    parsed[key] = next;
    i += 1;
  }

  return parsed;
}

function parsePositiveInt(value, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${label} must be a positive integer`);
  }
  return number;
}

function relativeTo(base, target) {
  return toPosix(path.relative(base, target));
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function csvCell(value) {
  const text = String(value ?? "");
  if (!/[",\r\n]/.test(text)) {
    return text;
  }
  return `"${text.replace(/"/g, '""')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function printHelp() {
  console.log(`Usage: npm run scan:question-images -- [options]

Options:
  --source <dir>     Image source directory, relative to project root or absolute.
                     Default: quest_pic
  --out <dir>        Output directory, relative to project root or absolute.
                     Default: tmp/question-image-scan
  --category <name>  Force all images into one category.
                     Default: first folder under source directory
  --prefix <text>    Force draft question ID prefix, for example fiber-transmission.
                     Default: ASCII category slug, or cat001 for Chinese-only names
  --start <number>   First draft ID number per category. Default: 1
  --help             Show this help.
`);
}
