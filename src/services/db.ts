import { obsoleteSeedQuestionIds, sampleQuestions, seedManifest, SEED_VERSION } from "../data/sampleQuestions";
import type {
  Attempt,
  JobApplication,
  Note,
  Question,
  QuestionBankManifest,
  Settings,
  SyncQueueItem
} from "../types/domain";

const DB_NAME = "sgcc-job-pwa";
const DB_VERSION = 1;

type StoreName = "questions" | "attempts" | "notes" | "jobs" | "syncQueue" | "settings" | "meta";
type StoreValue = Question | Attempt | Note | JobApplication | SyncQueueItem | { key: string; value: unknown };

let dbPromise: Promise<IDBDatabase> | undefined;

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("questions")) {
        const store = db.createObjectStore("questions", { keyPath: "id" });
        store.createIndex("category", "category");
        store.createIndex("updatedAt", "updatedAt");
      }

      if (!db.objectStoreNames.contains("attempts")) {
        const store = db.createObjectStore("attempts", { keyPath: "id" });
        store.createIndex("questionId", "questionId");
        store.createIndex("createdAt", "createdAt");
      }

      if (!db.objectStoreNames.contains("notes")) {
        const store = db.createObjectStore("notes", { keyPath: "id" });
        store.createIndex("scope", "scope");
        store.createIndex("targetId", "targetId");
        store.createIndex("updatedAt", "updatedAt");
      }

      if (!db.objectStoreNames.contains("jobs")) {
        const store = db.createObjectStore("jobs", { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt");
        store.createIndex("status", "status");
      }

      if (!db.objectStoreNames.contains("syncQueue")) {
        const store = db.createObjectStore("syncQueue", { keyPath: "id" });
        store.createIndex("status", "status");
        store.createIndex("createdAt", "createdAt");
      }

      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "key" });
      }

      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

async function getAll<T>(storeName: StoreName): Promise<T[]> {
  const db = await openDb();
  const tx = db.transaction(storeName, "readonly");
  return requestToPromise<T[]>(tx.objectStore(storeName).getAll());
}

async function put(storeName: StoreName, value: StoreValue): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).put(value);
  await txDone(tx);
}

async function remove(storeName: StoreName, key: IDBValidKey): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).delete(key);
  await txDone(tx);
}

async function getMeta<T>(key: string, fallback: T): Promise<T> {
  const db = await openDb();
  const tx = db.transaction("meta", "readonly");
  const row = await requestToPromise<{ key: string; value: T } | undefined>(tx.objectStore("meta").get(key));
  return row?.value ?? fallback;
}

async function setMeta<T>(key: string, value: T): Promise<void> {
  await put("meta", { key, value });
}

export function newId(prefix: string): string {
  const uuid = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${uuid}`;
}

export async function initializeDatabase(): Promise<void> {
  const seedVersion = await getMeta("seedVersion", "");
  if (seedVersion === SEED_VERSION) {
    return;
  }

  const db = await openDb();
  const tx = db.transaction(["questions", "settings", "meta"], "readwrite");
  const questionStore = tx.objectStore("questions");
  obsoleteSeedQuestionIds.forEach((id) => questionStore.delete(id));
  sampleQuestions.forEach((question) => questionStore.put(question));
  if (!seedVersion) {
    tx.objectStore("settings").put({
      key: "settings",
      value: {
        apiBaseUrl: "",
        autoDetectSync: true
      } satisfies Settings
    });
  }
  tx.objectStore("meta").put({ key: "manifest", value: seedManifest });
  tx.objectStore("meta").put({ key: "seeded", value: true });
  tx.objectStore("meta").put({ key: "seedVersion", value: SEED_VERSION });
  await txDone(tx);
}

export async function getQuestions(): Promise<Question[]> {
  return (await getAll<Question>("questions")).sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id));
}

export async function saveQuestion(question: Question): Promise<void> {
  await put("questions", question);
}

export async function mergeQuestionsFromServer(serverQuestions: Question[]): Promise<void> {
  const localById = new Map((await getQuestions()).map((question) => [question.id, question]));
  const db = await openDb();
  const tx = db.transaction("questions", "readwrite");
  const store = tx.objectStore("questions");

  serverQuestions.forEach((serverQuestion) => {
    const local = localById.get(serverQuestion.id);
    store.put({
      ...serverQuestion,
      favorite: local?.favorite ?? serverQuestion.favorite ?? false,
      wrong: local?.wrong ?? serverQuestion.wrong ?? false,
      mastered: local?.mastered ?? serverQuestion.mastered ?? false,
      lastPracticedAt: local?.lastPracticedAt ?? serverQuestion.lastPracticedAt,
      practiceCount: local?.practiceCount ?? serverQuestion.practiceCount ?? 0
    });
  });

  await txDone(tx);
}

export async function getAttempts(): Promise<Attempt[]> {
  return (await getAll<Attempt>("attempts")).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addAttempt(attempt: Attempt, question: Question): Promise<void> {
  const now = attempt.createdAt;
  const updatedQuestion: Question = {
    ...question,
    practiceCount: question.practiceCount + 1,
    lastPracticedAt: now,
    wrong: attempt.isCorrect ? question.wrong : true,
    mastered: attempt.isCorrect ? question.mastered : false
  };

  const db = await openDb();
  const tx = db.transaction(["attempts", "questions", "syncQueue"], "readwrite");
  tx.objectStore("attempts").put(attempt);
  tx.objectStore("questions").put(updatedQuestion);
  tx.objectStore("syncQueue").put(makeQueueItem("attempt", "upsert", attempt));
  if (!attempt.isCorrect) {
    tx.objectStore("syncQueue").put(makeQueueItem("wrong-question", "upsert", { questionId: question.id, wrong: true, updatedAt: now }));
  }
  await txDone(tx);
}

export async function toggleFavorite(question: Question): Promise<void> {
  const updated = { ...question, favorite: !question.favorite };
  const db = await openDb();
  const tx = db.transaction(["questions", "syncQueue"], "readwrite");
  tx.objectStore("questions").put(updated);
  tx.objectStore("syncQueue").put(
    makeQueueItem("favorite", "upsert", {
      questionId: question.id,
      favorite: updated.favorite,
      updatedAt: new Date().toISOString()
    })
  );
  await txDone(tx);
}

export async function markQuestionMastered(question: Question): Promise<void> {
  const updated = { ...question, wrong: false, mastered: true };
  const db = await openDb();
  const tx = db.transaction(["questions", "syncQueue"], "readwrite");
  tx.objectStore("questions").put(updated);
  tx.objectStore("syncQueue").put(
    makeQueueItem("wrong-question", "upsert", {
      questionId: question.id,
      wrong: false,
      mastered: true,
      updatedAt: new Date().toISOString()
    })
  );
  await txDone(tx);
}

export async function getNotes(): Promise<Note[]> {
  return (await getAll<Note>("notes")).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveNote(note: Note): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(["notes", "syncQueue"], "readwrite");
  tx.objectStore("notes").put(note);
  tx.objectStore("syncQueue").put(makeQueueItem("note", "upsert", note));
  await txDone(tx);
}

export async function getJobs(): Promise<JobApplication[]> {
  return (await getAll<JobApplication>("jobs")).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveJob(job: JobApplication): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(["jobs", "syncQueue"], "readwrite");
  tx.objectStore("jobs").put(job);
  tx.objectStore("syncQueue").put(makeQueueItem("job", "upsert", job));
  await txDone(tx);
}

export async function getSettings(): Promise<Settings> {
  const db = await openDb();
  const tx = db.transaction("settings", "readonly");
  const row = await requestToPromise<{ key: string; value: Settings } | undefined>(tx.objectStore("settings").get("settings"));
  return row?.value ?? { apiBaseUrl: "", autoDetectSync: true };
}

export async function saveSettings(settings: Settings): Promise<void> {
  await put("settings", { key: "settings", value: settings });
}

export async function getManifest(): Promise<QuestionBankManifest> {
  return getMeta<QuestionBankManifest>("manifest", seedManifest);
}

export async function saveManifest(manifest: QuestionBankManifest): Promise<void> {
  await setMeta("manifest", manifest);
}

export async function getPendingQueue(): Promise<SyncQueueItem[]> {
  return (await getAll<SyncQueueItem>("syncQueue"))
    .filter((item) => item.status !== "sent")
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function removeQueueItem(id: string): Promise<void> {
  await remove("syncQueue", id);
}

export async function failQueueItem(item: SyncQueueItem, error: string): Promise<void> {
  await put("syncQueue", {
    ...item,
    attempts: item.attempts + 1,
    status: "failed",
    lastError: error
  });
}

function makeQueueItem(entity: SyncQueueItem["entity"], op: SyncQueueItem["op"], payload: unknown): SyncQueueItem {
  return {
    id: newId("sync"),
    entity,
    op,
    payload,
    status: "pending",
    attempts: 0,
    createdAt: new Date().toISOString()
  };
}
