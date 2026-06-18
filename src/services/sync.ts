import {
  failQueueItem,
  getManifest,
  getPendingQueue,
  mergeQuestionsFromServer,
  removeQueueItem,
  saveManifest,
  saveSettings
} from "./db";
import {
  checkHealth,
  fetchQuestionBankManifest,
  fetchQuestionsSince,
  postAttempts,
  postFavorites,
  postJobs,
  postNotes,
  postWrongQuestions
} from "./api";
import type { Attempt, ConnectionState, JobApplication, Note, Settings, SyncQueueItem } from "../types/domain";

export async function getConnectionState(settings: Settings): Promise<ConnectionState> {
  if (!navigator.onLine) {
    return "offline";
  }

  try {
    const result = await checkHealth(settings);
    return result.ok ? "connected" : "online-unreachable";
  } catch {
    return "online-unreachable";
  }
}

export interface SyncResult {
  uploaded: number;
  downloaded: number;
  manifestChanged: boolean;
}

export async function syncNow(settings: Settings): Promise<SyncResult> {
  await checkHealth(settings);

  const uploaded = await uploadQueue(settings);
  const currentManifest = await getManifest();
  const remoteManifest = await fetchQuestionBankManifest(settings);
  let downloaded = 0;

  if (remoteManifest.version !== currentManifest.version) {
    const questions = await fetchQuestionsSince(settings, currentManifest.updatedAt);
    await mergeQuestionsFromServer(questions);
    await saveManifest(remoteManifest);
    downloaded = questions.length;
  }

  await saveSettings({ ...settings, lastSyncAt: new Date().toISOString() });

  return {
    uploaded,
    downloaded,
    manifestChanged: downloaded > 0
  };
}

async function uploadQueue(settings: Settings): Promise<number> {
  const queue = await getPendingQueue();
  const groups = groupQueue(queue);
  let uploaded = 0;

  uploaded += await uploadGroup(groups.attempt, (items) => postAttempts(settings, items.map((item) => item.payload as Attempt)));
  uploaded += await uploadGroup(groups.note, (items) => postNotes(settings, items.map((item) => item.payload as Note)));
  uploaded += await uploadGroup(groups.favorite, (items) => postFavorites(settings, items.map((item) => item.payload)));
  uploaded += await uploadGroup(groups["wrong-question"], (items) => postWrongQuestions(settings, items.map((item) => item.payload)));
  uploaded += await uploadGroup(groups.job, (items) => postJobs(settings, items.map((item) => item.payload as JobApplication)));

  return uploaded;
}

function groupQueue(queue: SyncQueueItem[]): Record<SyncQueueItem["entity"], SyncQueueItem[]> {
  return queue.reduce<Record<SyncQueueItem["entity"], SyncQueueItem[]>>(
    (acc, item) => {
      acc[item.entity].push(item);
      return acc;
    },
    {
      attempt: [],
      note: [],
      favorite: [],
      "wrong-question": [],
      job: []
    }
  );
}

async function uploadGroup(items: SyncQueueItem[], uploader: (items: SyncQueueItem[]) => Promise<void>): Promise<number> {
  if (items.length === 0) {
    return 0;
  }

  try {
    await uploader(items);
    await Promise.all(items.map((item) => removeQueueItem(item.id)));
    return items.length;
  } catch (error) {
    const message = error instanceof Error ? error.message : "同步失败";
    await Promise.all(items.map((item) => failQueueItem(item, message)));
    throw error;
  }
}
