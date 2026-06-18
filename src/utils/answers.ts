import type { Question } from "../types/domain";

export function normalizeAnswer(answer: string[]): string[] {
  return [...answer].map((item) => item.trim()).filter(Boolean).sort();
}

export function isAnswerCorrect(question: Question, selectedAnswer: string[]): boolean {
  const expected = normalizeAnswer(question.answer);
  const actual = normalizeAnswer(selectedAnswer);
  return expected.length === actual.length && expected.every((value, index) => value === actual[index]);
}

export function difficultyLabel(value: Question["difficulty"]): string {
  return {
    easy: "基础",
    medium: "中等",
    hard: "较难"
  }[value];
}

export function typeLabel(value: Question["type"]): string {
  return {
    single: "单选",
    multiple: "多选",
    judge: "判断",
    short: "简答"
  }[value];
}
