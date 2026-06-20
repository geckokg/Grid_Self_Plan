import http from "node:http";
import { createReadStream } from "node:fs";
import { appendFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const dataDir = path.join(root, "server-data");
const questPicDir = path.join(root, "quest_pic");
const syncLogPath = path.join(dataDir, "sync-log.jsonl");
const uploadLogPath = path.join(dataDir, "upload-log.jsonl");
const port = Number(process.env.PORT ?? 4173);
const maxUploadBytes = Number(process.env.UPLOAD_MAX_BYTES ?? 512 * 1024 * 1024);
const uploadToken = process.env.UPLOAD_TOKEN?.trim() ?? "";

const { sampleQuestions, seedManifest } = await loadSeedQuestionBank();
const manifest = seedManifest;

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".webmanifest", "application/manifest+json; charset=utf-8"]
]);

const imageMimeExtensions = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/bmp", ".bmp"],
  ["image/tiff", ".tif"]
]);
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"]);

await mkdir(dataDir, { recursive: true });

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    setCommonHeaders(res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (await handleApi(req, res, url)) {
      return;
    }

    await serveStatic(req, res, url);
  } catch (error) {
    writeJson(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Grid Self Plan local server listening on http://127.0.0.1:${port}`);
  console.log(`Phone upload page: http://127.0.0.1:${port}${uploadPathWithToken()}`);
});

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/upload") {
    writeHtml(
      res,
      200,
      renderUploadPage({
        requiresToken: Boolean(uploadToken),
        initialToken: url.searchParams.get("token") ?? ""
      })
    );
    return true;
  }

  if (req.method === "POST" && url.pathname === "/upload/images") {
    await handleImageUpload(req, res);
    return true;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    writeJson(res, 200, {
      ok: true,
      version: "local-api-0.1.0",
      time: new Date().toISOString()
    });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/question-bank/manifest") {
    writeJson(res, 200, manifest);
    return true;
  }

  if (req.method === "GET" && url.pathname === "/question-bank/questions") {
    writeJson(res, 200, sampleQuestions);
    return true;
  }

  const syncRoutes = new Set([
    "/sync/attempts",
    "/sync/notes",
    "/sync/favorites",
    "/sync/wrong-questions",
    "/jobs"
  ]);

  if (req.method === "POST" && syncRoutes.has(url.pathname)) {
    const payload = await readJsonBody(req);
    await appendFile(
      syncLogPath,
      `${JSON.stringify({ route: url.pathname, receivedAt: new Date().toISOString(), payload })}\n`,
      "utf8"
    );
    writeJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/backup/export") {
    const lines = await readFile(syncLogPath, "utf8").catch(() => "");
    writeJson(res, 200, {
      exportedAt: new Date().toISOString(),
      entries: lines
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    });
    return true;
  }

  return false;
}

async function handleImageUpload(req, res) {
  const contentType = String(req.headers["content-type"] ?? "");
  const boundary = getMultipartBoundary(contentType);
  if (!boundary) {
    writeJson(res, 400, { ok: false, error: "Expected multipart/form-data upload" });
    return;
  }

  const body = await readRawBody(req, maxUploadBytes);
  const { fields, files } = parseMultipartFormData(body, boundary);
  if (!isUploadAuthorized(fields)) {
    writeJson(res, 403, { ok: false, error: "Upload token is missing or incorrect" });
    return;
  }

  const category = sanitizePathSegment(firstField(fields, "category") || "未分类");
  const batch = sanitizePathSegment(firstField(fields, "batch") || makeTodayBatchName());
  const images = files.filter((file) => file.fieldName === "images" && file.data.length > 0);

  if (!images.length) {
    writeJson(res, 400, { ok: false, error: "No image files were uploaded" });
    return;
  }

  const targetDir = safeJoin(questPicDir, category, batch);
  await mkdir(targetDir, { recursive: true });

  const uploadedAt = new Date();
  const stamp = makeFileTimestamp(uploadedAt);
  const saved = [];
  const rejected = [];

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const originalName = sanitizeFileName(image.filename || `image-${index + 1}`);
    const contentType = String(image.headers["content-type"] ?? "").toLowerCase();
    const inferredExt = imageMimeExtensions.get(contentType) ?? "";
    const originalExt = path.extname(originalName).toLowerCase();
    const ext = imageExtensions.has(originalExt) ? originalExt : inferredExt;

    if (!ext || !imageExtensions.has(ext)) {
      rejected.push({
        fileName: originalName,
        contentType,
        reason: "Unsupported image type"
      });
      continue;
    }

    const baseName = path.basename(originalName, path.extname(originalName)) || `image-${index + 1}`;
    const outputName = `${stamp}_${String(index + 1).padStart(3, "0")}_${baseName}${ext}`;
    const filePath = await makeUniquePath(targetDir, outputName);
    await writeFile(filePath, image.data);

    saved.push({
      originalName,
      fileName: path.basename(filePath),
      relativePath: toPosix(path.relative(root, filePath)),
      sizeBytes: image.data.length,
      contentType
    });
  }

  const logEntry = {
    route: "/upload/images",
    receivedAt: uploadedAt.toISOString(),
    category,
    batch,
    savedCount: saved.length,
    rejectedCount: rejected.length,
    saved,
    rejected
  };
  await appendFile(uploadLogPath, `${JSON.stringify(logEntry)}\n`, "utf8");

  writeJson(res, saved.length ? 200 : 400, {
    ok: saved.length > 0,
    category,
    batch,
    targetDir: toPosix(path.relative(root, targetDir)),
    saved,
    rejected,
    nextCommand: "npm.cmd run scan:question-images"
  });
}

async function serveStatic(req, res, url) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    writeJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  const decodedPath = decodeURIComponent(url.pathname);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(distDir)) {
    writeJson(res, 403, { ok: false, error: "Forbidden" });
    return;
  }

  const fileExists = await stat(filePath).then((item) => item.isFile()).catch(() => false);
  if (!fileExists) {
    filePath = path.join(distDir, "index.html");
  }

  const ext = path.extname(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes.get(ext) ?? "application/octet-stream"
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
}

function setCommonHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function writeHtml(res, statusCode, html) {
  res.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(html);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function readRawBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        req.destroy();
        reject(new Error(`Upload body too large. Limit is ${Math.round(limitBytes / 1024 / 1024)} MB.`));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function getMultipartBoundary(contentType) {
  const match = contentType.match(/(?:^|;)\s*boundary=(?:"([^"]+)"|([^;]+))/i);
  return match?.[1] ?? match?.[2] ?? "";
}

function parseMultipartFormData(body, boundary) {
  const delimiter = Buffer.from(`--${boundary}`);
  const fields = new Map();
  const files = [];
  let cursor = body.indexOf(delimiter);

  while (cursor !== -1) {
    let partStart = cursor + delimiter.length;
    if (body.slice(partStart, partStart + 2).toString("ascii") === "--") {
      break;
    }
    if (body.slice(partStart, partStart + 2).toString("ascii") === "\r\n") {
      partStart += 2;
    }

    const next = body.indexOf(delimiter, partStart);
    if (next === -1) {
      break;
    }

    let partEnd = next;
    if (body[partEnd - 2] === 13 && body[partEnd - 1] === 10) {
      partEnd -= 2;
    }

    const part = body.slice(partStart, partEnd);
    const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));
    if (headerEnd !== -1) {
      const headerText = part.slice(0, headerEnd).toString("utf8");
      const data = part.slice(headerEnd + 4);
      const headers = parsePartHeaders(headerText);
      const disposition = parseContentDisposition(headers["content-disposition"] ?? "");

      if (disposition.name) {
        if (disposition.filename !== undefined) {
          files.push({
            fieldName: disposition.name,
            filename: disposition.filename,
            headers,
            data
          });
        } else {
          const existing = fields.get(disposition.name) ?? [];
          existing.push(data.toString("utf8"));
          fields.set(disposition.name, existing);
        }
      }
    }

    cursor = next;
  }

  return { fields, files };
}

function parsePartHeaders(headerText) {
  return Object.fromEntries(
    headerText
      .split(/\r?\n/)
      .map((line) => {
        const index = line.indexOf(":");
        if (index === -1) {
          return null;
        }
        return [line.slice(0, index).trim().toLowerCase(), line.slice(index + 1).trim()];
      })
      .filter(Boolean)
  );
}

function parseContentDisposition(value) {
  const result = {};
  const parts = value.split(";").map((part) => part.trim());

  for (const part of parts.slice(1)) {
    const index = part.indexOf("=");
    if (index === -1) {
      continue;
    }

    const key = part.slice(0, index).trim().toLowerCase();
    let rawValue = part.slice(index + 1).trim();
    if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      rawValue = rawValue.slice(1, -1).replace(/\\"/g, '"');
    }

    if (key === "filename*" && rawValue.toLowerCase().startsWith("utf-8''")) {
      result.filename = decodeURIComponent(rawValue.slice(7));
    } else if (key === "filename" && result.filename === undefined) {
      result.filename = rawValue;
    } else if (key === "name") {
      result.name = rawValue;
    }
  }

  return result;
}

function firstField(fields, name) {
  return fields.get(name)?.[0]?.trim() ?? "";
}

function sanitizePathSegment(value) {
  const cleaned = String(value)
    .normalize("NFKC")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+|\.+$/g, "");

  return cleaned || "未命名";
}

function sanitizeFileName(value) {
  const cleaned = path
    .basename(String(value).normalize("NFKC"))
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+|\.+$/g, "");

  return cleaned || "image";
}

function safeJoin(base, ...segments) {
  const target = path.resolve(base, ...segments);
  const baseWithSep = path.resolve(base) + path.sep;
  if (target !== path.resolve(base) && !target.startsWith(baseWithSep)) {
    throw new Error("Resolved upload path is outside quest_pic");
  }
  return target;
}

async function makeUniquePath(dir, fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  let candidate = path.join(dir, fileName);
  let suffix = 2;

  while (await stat(candidate).then((item) => item.isFile()).catch(() => false)) {
    candidate = path.join(dir, `${base}-${suffix}${ext}`);
    suffix += 1;
  }

  return candidate;
}

function makeTodayBatchName() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function makeFileTimestamp(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    String(date.getSeconds()).padStart(2, "0")
  ].join("");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function uploadPathWithToken() {
  return uploadToken ? `/upload?token=${encodeURIComponent(uploadToken)}` : "/upload";
}

function isUploadAuthorized(fields) {
  return !uploadToken || firstField(fields, "uploadToken") === uploadToken;
}

function renderUploadPage({ requiresToken, initialToken }) {
  const tokenField = requiresToken
    ? `<label>
        上传口令
        <input name="uploadToken" type="password" value="${escapeHtml(initialToken)}" autocomplete="off" required>
      </label>`
    : "";

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>题图上传</title>
  <style>
    :root {
      color-scheme: light;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f5f7fb;
      color: #1f2933;
    }
    * { box-sizing: border-box; }
    body { margin: 0; }
    main {
      width: min(100%, 760px);
      margin: 0 auto;
      padding: 20px 14px 28px;
    }
    header {
      padding: 8px 2px 18px;
    }
    h1 {
      margin: 0 0 6px;
      font-size: 24px;
      line-height: 1.2;
    }
    header p {
      margin: 0;
      color: #5f6b7a;
      line-height: 1.5;
    }
    form, .result {
      background: #fff;
      border: 1px solid #dbe2ea;
      border-radius: 8px;
      padding: 16px;
    }
    label {
      display: grid;
      gap: 6px;
      margin-bottom: 14px;
      font-size: 14px;
      font-weight: 650;
    }
    input, button {
      width: 100%;
      min-height: 46px;
      border-radius: 7px;
      font: inherit;
    }
    input {
      border: 1px solid #ccd5df;
      padding: 10px 12px;
      background: #fff;
    }
    input[type="file"] {
      min-height: auto;
      padding: 12px;
    }
    .row {
      display: grid;
      gap: 12px;
      grid-template-columns: 1fr 1fr;
    }
    button {
      border: 0;
      background: #1565c0;
      color: #fff;
      font-weight: 750;
    }
    button:disabled {
      opacity: .6;
    }
    .hint {
      margin: -4px 0 14px;
      color: #64748b;
      font-size: 13px;
      line-height: 1.45;
    }
    progress {
      display: none;
      width: 100%;
      height: 12px;
      margin-top: 14px;
    }
    .result {
      display: none;
      margin-top: 14px;
      line-height: 1.5;
    }
    .result.show, progress.show { display: block; }
    .ok { color: #0f7a35; }
    .bad { color: #b42318; }
    ul {
      padding-left: 18px;
      word-break: break-all;
    }
    code {
      padding: 2px 5px;
      border-radius: 5px;
      background: #eef2f7;
    }
    @media (max-width: 560px) {
      .row { grid-template-columns: 1fr; }
      main { padding-top: 14px; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>题图上传</h1>
      <p>手机直接把截图传到电脑项目的 <code>quest_pic</code> 目录。建议每批 50 到 100 张。</p>
    </header>

    <form id="upload-form">
      <div class="row">
        <label>
          科目/分类
          <input name="category" value="光纤传输技术" autocomplete="off" required>
        </label>
        <label>
          批次/范围
          <input name="batch" placeholder="例如 11-50" autocomplete="off" required>
        </label>
      </div>
      <label>
        截图
        <input name="images" type="file" accept="image/*" multiple required>
      </label>
      <p class="hint">保存位置会是 <code>quest_pic/科目/批次/</code>。同名文件会自动加后缀，不会覆盖旧图。</p>
      ${tokenField}
      <button type="submit">上传到电脑</button>
      <progress id="progress" max="100" value="0"></progress>
    </form>

    <section id="result" class="result" aria-live="polite"></section>
  </main>

  <script>
    const form = document.querySelector("#upload-form");
    const progress = document.querySelector("#progress");
    const result = document.querySelector("#result");
    const button = form.querySelector("button");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const files = form.elements.images.files;

      if (!files.length) {
        showResult(false, "<p class='bad'>请选择图片。</p>");
        return;
      }

      const request = new XMLHttpRequest();
      request.open("POST", "/upload/images");
      request.responseType = "json";

      request.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          progress.value = Math.round((event.loaded / event.total) * 100);
        }
      });

      request.addEventListener("load", () => {
        button.disabled = false;
        progress.classList.remove("show");
        const payload = request.response || {};
        if (request.status >= 200 && request.status < 300 && payload.ok) {
          const savedItems = (payload.saved || [])
            .map((item) => "<li>" + escapeHtml(item.relativePath) + "</li>")
            .join("");
          const rejected = (payload.rejected || []).length
            ? "<p class='bad'>有 " + payload.rejected.length + " 个文件被跳过。</p>"
            : "";
          showResult(true, [
            "<p class='ok'>已保存 " + payload.saved.length + " 张。</p>",
            "<p>目录：<code>" + escapeHtml(payload.targetDir) + "</code></p>",
            rejected,
            "<ul>" + savedItems + "</ul>",
            "<p>下一步在电脑运行：<code>npm.cmd run scan:question-images</code></p>"
          ].join(""));
        } else {
          showResult(false, "<p class='bad'>" + escapeHtml(payload.error || "上传失败") + "</p>");
        }
      });

      request.addEventListener("error", () => {
        button.disabled = false;
        progress.classList.remove("show");
        showResult(false, "<p class='bad'>网络中断，上传没有完成。</p>");
      });

      button.disabled = true;
      progress.value = 0;
      progress.classList.add("show");
      showResult(true, "<p>正在上传...</p>");
      request.send(data);
    });

    function showResult(ok, html) {
      result.className = "result show " + (ok ? "ok-box" : "bad-box");
      result.innerHTML = html;
    }

    function escapeHtml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
  </script>
</body>
</html>`;
}

async function loadSeedQuestionBank() {
  const sourcePath = path.join(root, "src", "data", "sampleQuestions.ts");
  const source = await readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler
    }
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString("base64")}`;
  return import(moduleUrl);
}
