import type { Attempt, JobApplication, Note, Question, QuestionBankManifest, Settings } from "../types/domain";

export interface HealthResult {
  ok: boolean;
  version?: string;
}

function baseUrl(settings: Settings): string {
  const value = settings.apiBaseUrl.trim().replace(/\/+$/, "");
  if (value) {
    return value;
  }

  return window.location.origin;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function checkHealth(settings: Settings): Promise<HealthResult> {
  return fetchJson<HealthResult>(`${baseUrl(settings)}/health`, { cache: "no-store" });
}

export async function fetchQuestionBankManifest(settings: Settings): Promise<QuestionBankManifest> {
  return fetchJson<QuestionBankManifest>(`${baseUrl(settings)}/question-bank/manifest`, { cache: "no-store" });
}

export async function fetchQuestionsSince(settings: Settings, since: string): Promise<Question[]> {
  const query = encodeURIComponent(since);
  return fetchJson<Question[]>(`${baseUrl(settings)}/question-bank/questions?since=${query}`, { cache: "no-store" });
}

export async function postAttempts(settings: Settings, attempts: Attempt[]): Promise<void> {
  await fetchJson(`${baseUrl(settings)}/sync/attempts`, { method: "POST", body: JSON.stringify({ attempts }) });
}

export async function postNotes(settings: Settings, notes: Note[]): Promise<void> {
  await fetchJson(`${baseUrl(settings)}/sync/notes`, { method: "POST", body: JSON.stringify({ notes }) });
}

export async function postFavorites(settings: Settings, favorites: unknown[]): Promise<void> {
  await fetchJson(`${baseUrl(settings)}/sync/favorites`, { method: "POST", body: JSON.stringify({ favorites }) });
}

export async function postWrongQuestions(settings: Settings, wrongQuestions: unknown[]): Promise<void> {
  await fetchJson(`${baseUrl(settings)}/sync/wrong-questions`, {
    method: "POST",
    body: JSON.stringify({ wrongQuestions })
  });
}

export async function postJobs(settings: Settings, jobs: JobApplication[]): Promise<void> {
  await fetchJson(`${baseUrl(settings)}/jobs`, { method: "POST", body: JSON.stringify({ jobs }) });
}
