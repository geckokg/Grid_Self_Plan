#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const manifestPath = path.resolve(root, args.manifest ?? "tmp/question-image-scan/image-manifest.json");
const outDir = path.resolve(root, args.out ?? "tmp/question-image-scan");
const language = args.lang ?? "zh-Hans-CN";
const correctionsPath = path.resolve(outDir, args.corrections ?? "ocr-corrections.json");

async function main() {
  await mkdir(outDir, { recursive: true });

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const images = (manifest.images ?? []).filter((item) => !item.duplicateOf);
  if (!images.length) {
    throw new Error(`No non-duplicate images found in ${relativeTo(root, manifestPath)}`);
  }

  console.log(`OCR processing ${images.length} image(s) from ${relativeTo(root, manifestPath)}`);
  const ocrResults = await runWindowsOcr(images);
  const corrections = await loadCorrections(correctionsPath);
  const items = images.map((image, index) =>
    applyCorrection(processOcrResult(image, ocrResults[index] ?? {}), corrections)
  );

  const review = {
    generatedAt: new Date().toISOString(),
    sourceManifest: relativeTo(root, manifestPath),
    ocrLanguage: language,
    totalImages: items.length,
    items
  };

  await writeJson(path.join(outDir, "ocr-review.json"), review);
  await writeFile(path.join(outDir, "ocr-review.csv"), makeCsv(items), "utf8");
  await writeFile(path.join(outDir, "ocr-report.md"), makeReport(review, manifest), "utf8");
  await writeFile(path.join(outDir, "review.html"), makeReviewHtml(images, items), "utf8");

  const typeCounts = countBy(items, (item) => item.inferredType);
  const warningCount = items.filter((item) => item.warnings.length).length;
  const missingAnswer = items.filter((item) => item.warnings.includes("missing-answer")).length;

  console.log("OCR complete.");
  console.log(`Types: ${Object.entries(typeCounts).map(([key, value]) => `${key}=${value}`).join(", ")}`);
  console.log(`Missing answers: ${missingAnswer}`);
  console.log(`Items with warnings: ${warningCount}`);
  console.log(`Review: ${relativeTo(root, path.join(outDir, "review.html"))}`);
  console.log(`Report: ${relativeTo(root, path.join(outDir, "ocr-report.md"))}`);
}

async function loadCorrections(filePath) {
  const raw = await readFile(filePath, "utf8").catch((error) => {
    if (error.code === "ENOENT") {
      return "";
    }
    throw error;
  });
  if (!raw.trim()) {
    return new Map();
  }

  const parsed = JSON.parse(stripBom(raw));
  const entries = Array.isArray(parsed) ? parsed : parsed.corrections ?? [];
  const corrections = new Map();
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const keys = [entry.id, entry.sourceRelativePath, entry.fileName].filter(Boolean);
    for (const key of keys) {
      corrections.set(String(key), entry);
    }
  }
  return corrections;
}

function applyCorrection(item, corrections) {
  const correction =
    corrections.get(item.id) ??
    corrections.get(item.sourceRelativePath) ??
    corrections.get(item.fileName);
  if (!correction) {
    return item;
  }

  const inferredType = correction.inferredType ?? item.inferredType;
  const answerRaw = correction.answerRaw ?? item.answerRaw;
  const warnings = new Set(item.warnings.filter((warning) => warning !== "missing-answer"));
  warnings.add("answer-corrected");

  return {
    ...item,
    inferredType,
    answerRaw,
    appAnswer: toAppAnswer(inferredType, answerRaw),
    warnings: [...warnings]
  };
}

async function runWindowsOcr(images) {
  const workDir = path.join(outDir, ".ocr-work");
  await mkdir(workDir, { recursive: true });

  const inputPath = path.join(workDir, "ocr-input.json");
  const outputPath = path.join(workDir, "ocr-output.json");
  const scriptPath = path.join(workDir, "ocr-winrt.ps1");

  const input = images.map((item, index) => ({
    index,
    id: item.id,
    path: path.resolve(root, item.relativePath)
  }));

  await writeJson(inputPath, input);
  await writeFile(scriptPath, makePowerShellOcrScript(), "utf8");

  console.log(`Launching Windows OCR (${language})...`);
  const result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath,
      inputPath,
      outputPath,
      language
    ],
    {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 50 * 1024 * 1024,
      timeout: Number(args.timeoutMs ?? 300000)
    }
  );

  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`Windows OCR failed with exit code ${result.status}`);
  }

  const output = JSON.parse(stripBom(await readFile(outputPath, "utf8")));
  return output.sort((a, b) => a.index - b.index);
}

function makePowerShellOcrScript() {
  return String.raw`
param(
  [Parameter(Mandatory = $true)][string]$InputJson,
  [Parameter(Mandatory = $true)][string]$OutputJson,
  [Parameter(Mandatory = $true)][string]$LanguageTag
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrResult, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime] | Out-Null

$script:AsTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() |
  Where-Object { $_.Name -eq "AsTask" -and $_.IsGenericMethodDefinition -and $_.GetParameters().Count -eq 1 } |
  Select-Object -First 1

function Await-WinRt($Operation, [Type]$ResultType) {
  $task = $script:AsTaskMethod.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  return $task.Result
}

$requests = Get-Content -LiteralPath $InputJson -Raw -Encoding UTF8 | ConvertFrom-Json
$lang = [Windows.Globalization.Language]::new($LanguageTag)
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if ($null -eq $engine) {
  throw "OcrEngine is not available for language $LanguageTag"
}

$results = New-Object System.Collections.Generic.List[object]
foreach ($request in $requests) {
  $entry = [ordered]@{
    index = [int]$request.index
    id = [string]$request.id
    path = [string]$request.path
    text = ""
    error = ""
  }

  try {
    if (-not (Test-Path -LiteralPath $request.path)) {
      $entry.error = "file-not-found"
    } else {
      $file = Await-WinRt ([Windows.Storage.StorageFile]::GetFileFromPathAsync([string]$request.path)) ([Windows.Storage.StorageFile])
      $stream = Await-WinRt ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
      try {
        $decoder = Await-WinRt ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $bitmap = Await-WinRt ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $ocrResult = Await-WinRt ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
        $entry.text = [string]$ocrResult.Text
      } finally {
        if ($stream -is [System.IDisposable]) {
          $stream.Dispose()
        }
      }
    }
  } catch {
    $entry.error = $_.Exception.Message
  }

  $results.Add([pscustomobject]$entry)
}

$json = ConvertTo-Json -InputObject $results -Depth 6
[System.IO.File]::WriteAllText($OutputJson, $json, [System.Text.Encoding]::UTF8)
`;
}

function processOcrResult(imageItem, ocrResult) {
  const ocrText = ocrResult.text ?? "";
  const normalizedRaw = ocrText.replace(/\s+/g, "");
  const normalizedText = applyOcrFixes(normalizedRaw);
  const warnings = [];

  if (ocrResult.error) {
    warnings.push("ocr-failed");
  }
  if (!ocrText.trim()) {
    warnings.push("empty-ocr");
  }

  const { type, warning: typeWarning } = inferType(normalizedText);
  if (typeWarning) {
    warnings.push(typeWarning);
  }

  const { answerRaw, warning: answerWarning } = detectAnswer(normalizedText, type);
  if (answerWarning) {
    warnings.push(answerWarning);
  }
  if (!answerRaw) {
    warnings.push("missing-answer");
  }

  const appAnswer = toAppAnswer(type, answerRaw);
  const remoteQuestionNo = inferQuestionNo(normalizedText, type);

  return {
    id: imageItem.id,
    sourceRelativePath: imageItem.relativePath,
    scanSourceRelativePath: imageItem.sourceRelativePath,
    fileName: imageItem.fileName,
    category: imageItem.category,
    batch: imageItem.batch,
    inferredType: type,
    remoteQuestionNo,
    answerRaw,
    appAnswer,
    ocrText,
    normalizedText,
    ocrError: ocrResult.error ?? "",
    warnings: [...new Set(warnings)]
  };
}

const OCR_FIXES = [
  ["囚", "A"],
  ["回", "B"],
  ["口", "C"],
  ["囤", "D"],
  ["因", "D"],
  ["（0", "（A"],
  ["(0", "(A"],
  ["。·", "："],
  ["•", "·"]
];

function applyOcrFixes(text) {
  let fixed = text;
  for (const [from, to] of OCR_FIXES) {
    fixed = fixed.split(from).join(to);
  }
  return fixed;
}

function inferType(text) {
  if (text.includes("单选题")) {
    return { type: "single", warning: "" };
  }
  if (text.includes("多选题")) {
    return { type: "multiple", warning: "" };
  }
  if (text.includes("判断题")) {
    return { type: "judge", warning: "" };
  }

  if (/A正确.*B错误|正确.*错误/.test(text)) {
    return { type: "judge", warning: "type-inferred-by-fallback" };
  }

  const strictAnswer = strictAnswerMatch(text);
  if (strictAnswer) {
    if (strictAnswer.length > 1) {
      return { type: "multiple", warning: "type-inferred-by-fallback" };
    }
    return { type: "single", warning: "type-inferred-by-fallback" };
  }

  return { type: "unknown", warning: "missing-type" };
}

function detectAnswer(text, type) {
  const strict = strictAnswerMatch(text);
  if (strict) {
    return { answerRaw: strict, warning: "" };
  }

  const afterReference = text.match(/参考答案(.{0,60})/);
  if (afterReference) {
    const loose = afterReference[1].match(/[：:。·、,，]*([ABCD]{1,4})(?=我的答案|平均|参考解析|反馈|错|非|5G|$)/);
    if (loose) {
      return { answerRaw: loose[1], warning: "answer-from-loose-match" };
    }
  }

  if (type === "judge") {
    const judgeNoisyMarker = text.match(/判断题.{0,140}[：:。·、,，]([AB])(?:\d|[5S])?[·.。]/);
    if (judgeNoisyMarker) {
      return { answerRaw: judgeNoisyMarker[1], warning: "answer-from-loose-match" };
    }

    const judgeLoose = text.match(/判断题.{0,120}[：:。·、,，]([AB])(?=非|5G|我的答案|平均|参考解析|反馈|错|$)/);
    if (judgeLoose) {
      return { answerRaw: judgeLoose[1], warning: "answer-from-loose-match" };
    }
  }

  return { answerRaw: "", warning: "" };
}

function strictAnswerMatch(text) {
  const match = text.match(/参考答案[：:。·、,，]*([ABCD]{1,4})/);
  return match?.[1] ?? "";
}

function toAppAnswer(type, answerRaw) {
  if (!answerRaw) {
    return [];
  }

  if (type === "judge") {
    if (answerRaw === "A") {
      return ["true"];
    }
    if (answerRaw === "B") {
      return ["false"];
    }
  }

  return [...answerRaw].filter((char) => /[ABCD]/.test(char));
}

function inferQuestionNo(text, type) {
  const typeLabel = type === "judge" ? "判断题" : type === "multiple" ? "多选题" : type === "single" ? "单选题" : "";
  if (typeLabel) {
    const typed = text.match(new RegExp(`${typeLabel}(\\d+)[.·、]`));
    if (typed) {
      return Number(typed[1]);
    }
  }

  const generic = text.match(/(?:^|[）)])(\d{1,4})[.·、]/) ?? text.match(/(\d{1,4})[.·、]/);
  if (!generic) {
    return null;
  }

  const value = Number(generic[1]);
  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}

function makeCsv(items) {
  const columns = [
    "id",
    "category",
    "batch",
    "sourceRelativePath",
    "inferredType",
    "remoteQuestionNo",
    "answerRaw",
    "appAnswer",
    "warnings",
    "ocrError",
    "ocrText",
    "normalizedText"
  ];

  return [
    columns.join(","),
    ...items.map((item) =>
      columns
        .map((column) => {
          const value = Array.isArray(item[column]) ? item[column].join("|") : item[column];
          return csvCell(value ?? "");
        })
        .join(",")
    )
  ].join("\n");
}

function makeReport(review, manifest) {
  const items = review.items;
  const byType = countBy(items, (item) => item.inferredType);
  const byBatch = countBy(items, (item) => `${item.category}/${item.batch || "(no batch)"}`);
  const warningItems = items.filter((item) => item.warnings.length);
  const missingAnswers = items.filter((item) => item.warnings.includes("missing-answer"));
  const failed = items.filter((item) => item.warnings.includes("ocr-failed"));

  return `# OCR question image report

- Generated at: ${review.generatedAt}
- Source manifest: \`${review.sourceManifest}\`
- OCR language: \`${review.ocrLanguage}\`
- Manifest images: ${manifest.totalImages ?? items.length}
- Processed images: ${items.length}
- OCR failed: ${failed.length}
- Missing answers: ${missingAnswers.length}
- Items with warnings: ${warningItems.length}

## By type

${makeMarkdownTable(byType, ["Type", "Count"])}

## By batch

${makeMarkdownTable(byBatch, ["Batch", "Count"])}

## Needs review

${warningItems.length ? warningItems.map((item) => `- \`${item.id}\` ${item.inferredType} ${item.answerRaw || "(no answer)"} ${item.warnings.join(", ")} — \`${item.sourceRelativePath}\``).join("\n") : "_No warning items._"}

## Output files

- \`ocr-review.json\`: structured OCR and inference results
- \`ocr-review.csv\`: spreadsheet-friendly review file
- \`ocr-report.md\`: this report
- \`review.html\`: visual review page with OCR text

This script does not modify \`src/data/sampleQuestions.ts\`, \`public/service-worker.js\`, git history, or deployment state.
`;
}

function makeReviewHtml(images, items) {
  const byId = new Map(items.map((item) => [item.id, item]));
  const cards = images
    .map((image) => {
      const item = byId.get(image.id);
      const imageUrl = toPosix(path.relative(outDir, path.join(root, image.relativePath)));
      const warnings = item?.warnings?.length ? item.warnings.join(", ") : "none";
      const appAnswer = item?.appAnswer?.length ? item.appAnswer.join(", ") : "";
      return `<article class="card ${item?.warnings?.length ? "warn-card" : ""}">
  <div class="image-wrap"><img loading="lazy" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(image.id)}"></div>
  <div class="meta">
    <h2>${escapeHtml(image.id)}</h2>
    <p><strong>${escapeHtml(item?.inferredType ?? "unknown")}</strong> · answer: <strong>${escapeHtml(item?.answerRaw ?? "")}</strong> · app: <strong>${escapeHtml(appAnswer)}</strong></p>
    <p class="path">${escapeHtml(image.relativePath)}</p>
    <p>warnings: <span class="${item?.warnings?.length ? "warn" : ""}">${escapeHtml(warnings)}</span></p>
    ${item?.ocrError ? `<p class="warn">OCR error: ${escapeHtml(item.ocrError)}</p>` : ""}
    <details open>
      <summary>OCR text</summary>
      <pre>${escapeHtml(item?.ocrText ?? "")}</pre>
    </details>
    <details>
      <summary>Normalized text</summary>
      <pre>${escapeHtml(item?.normalizedText ?? "")}</pre>
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
  <title>Question OCR Review</title>
  <style>
    :root { color-scheme: light; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f6f7f9; color: #17202a; }
    header { position: sticky; top: 0; z-index: 1; padding: 16px 20px; background: #fff; border-bottom: 1px solid #d9dee7; }
    h1 { margin: 0 0 4px; font-size: 20px; }
    header p { margin: 0; color: #596575; }
    main { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 14px; padding: 16px; }
    .card { overflow: hidden; background: #fff; border: 1px solid #d9dee7; border-radius: 8px; }
    .warn-card { border-color: #f59e0b; }
    .image-wrap { display: grid; place-items: center; min-height: 320px; background: #eef1f5; }
    img { display: block; max-width: 100%; max-height: 560px; object-fit: contain; }
    .meta { padding: 12px; }
    h2 { margin: 0 0 8px; font-size: 16px; }
    p { margin: 6px 0; font-size: 13px; line-height: 1.45; }
    .path { word-break: break-all; color: #596575; }
    .warn { color: #b45309; font-weight: 700; }
    summary { cursor: pointer; font-size: 13px; font-weight: 650; }
    pre { white-space: pre-wrap; overflow: auto; max-height: 280px; padding: 10px; background: #111827; color: #e5e7eb; border-radius: 6px; font-size: 12px; line-height: 1.45; }
  </style>
</head>
<body>
  <header>
    <h1>Question OCR Review</h1>
    <p>${items.length} images processed. This page is for review only; it does not import questions.</p>
  </header>
  <main>
${cards}
  </main>
</body>
</html>
`;
}

function countBy(items, keyFn) {
  return Object.fromEntries(
    [...items.reduce((acc, item) => {
      const key = keyFn(item) || "unknown";
      acc.set(key, (acc.get(key) ?? 0) + 1);
      return acc;
    }, new Map())].sort(([a], [b]) => String(a).localeCompare(String(b), "zh-Hans-CN", { numeric: true }))
  );
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

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseArgs(rawArgs) {
  const parsed = {};
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const next = rawArgs[index + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for ${arg}`);
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: npm run ocr:question-images -- [options]

Options:
  --manifest <file>    Scan manifest path. Default: tmp/question-image-scan/image-manifest.json
  --out <dir>          Output directory. Default: tmp/question-image-scan
  --lang <tag>         Windows OCR language. Default: zh-Hans-CN
  --corrections <file> Optional correction file under --out. Default: ocr-corrections.json
  --timeoutMs <ms>     PowerShell OCR timeout. Default: 300000
  --help               Show this help.

Outputs:
  ocr-review.json
  ocr-review.csv
  ocr-report.md
  review.html

This script only creates review artifacts. It never edits the question bank or git state.
`);
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

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

await main();
