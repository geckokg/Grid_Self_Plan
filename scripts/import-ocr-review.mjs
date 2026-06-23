#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const reviewPath = path.resolve(root, args.review ?? "tmp/question-image-scan/ocr-review.json");
const outPath = path.resolve(root, args.out ?? "src/data/sampleQuestions.ts");
const seedVersion = args.seedVersion ?? "fiber-transmission-2026-06-23";
const updatedAt = args.updatedAt ?? "2026-06-23T00:00:00.000Z";
const categoryName = "\u5149\u7ea4\u4f20\u8f93\u6280\u672f";

const review = JSON.parse(stripBom(await readFile(reviewPath, "utf8")));
const questions = review.items.map((item, index) => makeQuestion(item, index));

await writeFile(outPath, makeSampleQuestionsSource(questions), "utf8");

console.log(`Imported ${questions.length} question(s) from ${relativeTo(root, reviewPath)}`);
console.log(`Wrote ${relativeTo(root, outPath)}`);

function makeQuestion(item, index) {
  const normalizedText = cleanOcrMarkers(item.normalizedText || item.ocrText || "");
  const type = item.inferredType;
  const answer =
    Array.isArray(item.appAnswer) && item.appAnswer.length
      ? item.appAnswer
      : toAppAnswer(type, item.answerRaw ?? "");
  const sourcePath = item.sourceRelativePath || item.scanSourceRelativePath || item.sourceRelativePath;
  const originalNo = inferOriginalNo(normalizedText, type) ?? index + 1;

  return {
    id: `fiber-transmission-${String(index + 1).padStart(3, "0")}`,
    type,
    stem: extractStem(normalizedText, type),
    options: extractOptions(normalizedText, type),
    answer,
    explanation: extractExplanation(normalizedText),
    category: categoryName,
    difficulty: type === "judge" ? "easy" : "medium",
    source: `\u56fe\u7247\u5bfc\u5165\uff1a${sourcePath}`,
    tags: ["\u7b2c1\u7ae0", `\u539f\u9898${originalNo}`],
    version: seedVersion,
    updatedAt,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  };
}

function cleanOcrMarkers(text) {
  return String(text ?? "")
    .replace(/\s+/g, "")
    .replace(/\u56da/g, "A")
    .replace(/\u56de/g, "B")
    .replace(/\u53e3/g, "C")
    .replace(/\u56e4/g, "D")
    .replace(/\u6b63\u786e\u95f4\u9519\u8bef/g, "\u6b63\u786e\u9519\u8bef")
    .replace(/\u53c2\u8003\u7b54\u6848\u3002/g, "\u53c2\u8003\u7b54\u6848\uff1a")
    .trim();
}

function inferOriginalNo(text, type) {
  const label = typeLabel(type);
  let match = label ? text.match(new RegExp(`${label}(?:\\d+\\/108)?(\\d{1,3})[·.、]`)) : null;
  if (match) {
    return Number(match[1]);
  }

  match = text.match(/(?:^|[^\d])(\d{1,3})[·.、]/);
  return match ? Number(match[1]) : null;
}

function extractStem(text, type) {
  let value = sliceQuestionText(text, type);
  const cutPatterns =
    type === "judge"
      ? [/A正确/, /正确错误/, /参考答案/]
      : [/参考答案/, /@/];
  let end = value.length;
  for (const pattern of cutPatterns) {
    const match = value.match(pattern);
    if (match && match.index > 6) {
      end = Math.min(end, match.index);
    }
  }

  const stem = value
    .slice(0, end)
    .replace(/^\/108\d{1,3}[·.、]/, "")
    .replace(/^\d+\/108\d{1,3}[·.、]/, "")
    .replace(/[（(][·.、]?[AB][）)]?$/g, "\uff08")
    .replace(/[（(]\s*[）)]/g, "\uff08 \uff09")
    .replace(/\uff08[ABCD]\uff09/g, "\uff08 \uff09")
    .trim();
  return stem || text.slice(0, 120);
}

function extractOptions(text, type) {
  if (type === "judge") {
    return [
      { id: "true", text: "\u6b63\u786e" },
      { id: "false", text: "\u9519\u8bef" }
    ];
  }

  const optionText = parseOptionText(text);
  return ["A", "B", "C", "D"].map((id) => ({
    id,
    text: optionText[id] || `\u9009\u9879 ${id}`
  }));
}

function parseOptionText(text) {
  const beforeAnswer = sliceQuestionText(text).split("\u53c2\u8003\u7b54\u6848")[0] ?? text;
  const atIndex = beforeAnswer.indexOf("@");
  if (atIndex < 0) {
    return {};
  }

  const optionArea = beforeAnswer.slice(atIndex + 1);
  const zeroParts = optionArea
    .split(/[0O]+/)
    .map((part) => part.replace(/^[.、]/, "").trim())
    .filter(Boolean);
  const ids = ["A", "B", "C", "D"];
  const result = {};
  zeroParts.slice(0, 4).forEach((value, index) => {
    if (value.length >= 1 && value.length <= 100) {
      result[ids[index]] = value;
    }
  });

  return result;
}

function sliceQuestionText(text, type = "") {
  const label = typeLabel(type);
  const labelIndex = label ? text.indexOf(label) : -1;
  const firstQuestionMarker = findQuestionMarker(text);
  if (labelIndex >= 0 && (firstQuestionMarker < 0 || labelIndex < firstQuestionMarker)) {
    return text
      .slice(labelIndex + label.length)
      .replace(/^(?:\d+\/108)?\d{1,3}[·.、]/, "")
      .replace(/^\d+\/108/, "")
      .replace(/^\d{1,3}[·.、]/, "");
  }

  if (firstQuestionMarker >= 0) {
    return text.slice(firstQuestionMarker).replace(/^\d{1,3}[·.、]/, "");
  }

  if (label && text.includes(label)) {
    return text
      .slice(text.indexOf(label) + label.length)
      .replace(/^(?:\d+\/108)?\d{1,3}[·.、]/, "")
      .replace(/^\d+\/108/, "")
      .replace(/^\d{1,3}[·.、]/, "");
  }

  return text;
}

function findQuestionMarker(text) {
  const matches = [...text.matchAll(/(?:^|[^\d/])(\d{1,3})[·.、]/g)];
  if (!matches.length) {
    return -1;
  }
  const match = matches.find((entry) => entry.index > 0 || Number(entry[1]) <= 108) ?? matches[0];
  return match.index + match[0].indexOf(match[1]);
}

function extractExplanation(text) {
  const match = text.match(/参考解析[:：。]?(.*?)(?:刷题笔记|反馈纠错|错误次数|答题卡|收藏|$)/);
  return match?.[1]?.trim() ?? "";
}

function toAppAnswer(type, answerRaw) {
  if (!answerRaw) {
    return [];
  }
  if (type === "judge") {
    return answerRaw === "A" ? ["true"] : answerRaw === "B" ? ["false"] : [];
  }
  return [...answerRaw].filter((char) => /[ABCD]/.test(char));
}

function typeLabel(type) {
  if (type === "single") {
    return "\u5355\u9009\u9898";
  }
  if (type === "multiple") {
    return "\u591a\u9009\u9898";
  }
  if (type === "judge") {
    return "\u5224\u65ad\u9898";
  }
  return "";
}

function makeSampleQuestionsSource(items) {
  const obsoleteIds = [
    "seed-circuit-001",
    "seed-power-001",
    "seed-relay-001",
    "seed-hv-001",
    "seed-culture-001",
    "comm-principle-001",
    "signal-system-001",
    "fiber-comm-001",
    "mobile-comm-001",
    "network-001",
    "power-telecom-001",
    "exam-culture-001",
    ...Array.from({ length: 10 }, (_, index) => `fiber-transmission-${String(index + 1).padStart(3, "0")}`)
  ];

  return `import type { Question, QuestionBankManifest } from "../types/domain";

export const SEED_VERSION = ${JSON.stringify(seedVersion)};
export const obsoleteSeedQuestionIds = ${JSON.stringify(obsoleteIds, null, 2)};

export const sampleQuestions: Question[] = ${JSON.stringify(items, null, 2)};

export const seedManifest: QuestionBankManifest = {
  version: SEED_VERSION,
  updatedAt: ${JSON.stringify(updatedAt)},
  totalQuestions: sampleQuestions.length,
  categories: Object.entries(
    sampleQuestions.reduce<Record<string, number>>((acc, question) => {
      acc[question.category] = (acc[question.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count, updatedAt: ${JSON.stringify(updatedAt)} }))
};
`;
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
  console.log(`Usage: node scripts/import-ocr-review.mjs [options]

Options:
  --review <file>       OCR review JSON. Default: tmp/question-image-scan/ocr-review.json
  --out <file>          Output TS file. Default: src/data/sampleQuestions.ts
  --seedVersion <text>  Seed version for IndexedDB refresh.
  --updatedAt <iso>     Updated timestamp for questions.
`);
}

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function relativeTo(base, target) {
  return path.relative(base, target).split(path.sep).join("/");
}
