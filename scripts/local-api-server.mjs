import http from "node:http";
import { createReadStream } from "node:fs";
import { appendFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const dataDir = path.join(root, "server-data");
const syncLogPath = path.join(dataDir, "sync-log.jsonl");
const port = Number(process.env.PORT ?? 4173);

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
});

async function handleApi(req, res, url) {
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
