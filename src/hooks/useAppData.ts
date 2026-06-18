import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addAttempt,
  getAttempts,
  getJobs,
  getManifest,
  getNotes,
  getPendingQueue,
  getQuestions,
  getSettings,
  initializeDatabase,
  markQuestionMastered,
  newId,
  saveJob,
  saveNote,
  saveSettings,
  toggleFavorite
} from "../services/db";
import { getConnectionState, syncNow } from "../services/sync";
import type {
  Attempt,
  ConnectionState,
  DashboardStats,
  JobApplication,
  Note,
  PracticeMode,
  Question,
  QuestionBankManifest,
  Settings,
  SyncQueueItem
} from "../types/domain";
import { isAnswerCorrect } from "../utils/answers";

export function useAppData() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [settings, setSettings] = useState<Settings>({ apiBaseUrl: "", autoDetectSync: true });
  const [manifest, setManifest] = useState<QuestionBankManifest | undefined>();
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [connection, setConnection] = useState<ConnectionState>(navigator.onLine ? "online-unreachable" : "offline");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    const [nextQuestions, nextAttempts, nextNotes, nextJobs, nextSettings, nextManifest, nextQueue] = await Promise.all([
      getQuestions(),
      getAttempts(),
      getNotes(),
      getJobs(),
      getSettings(),
      getManifest(),
      getPendingQueue()
    ]);

    setQuestions(nextQuestions);
    setAttempts(nextAttempts);
    setNotes(nextNotes);
    setJobs(nextJobs);
    setSettings(nextSettings);
    setManifest(nextManifest);
    setQueue(nextQueue);
    return nextSettings;
  }, []);

  useEffect(() => {
    initializeDatabase()
      .then(refresh)
      .then((nextSettings) => getConnectionState(nextSettings).then(setConnection))
      .finally(() => setLoading(false));
  }, [refresh]);

  useEffect(() => {
    const updateNetwork = () => {
      getConnectionState(settings).then(setConnection);
    };

    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);

    return () => {
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  }, [settings]);

  const stats = useMemo<DashboardStats>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayAttempts = attempts.filter((attempt) => attempt.createdAt.startsWith(today));
    const correctCount = todayAttempts.filter((attempt) => attempt.isCorrect).length;
    return {
      todayAttempts: todayAttempts.length,
      todayCorrectRate: todayAttempts.length ? Math.round((correctCount / todayAttempts.length) * 100) : 0,
      wrongToReview: questions.filter((question) => question.wrong && !question.mastered).length,
      streakDays: computeStreak(attempts),
      pendingSync: queue.length
    };
  }, [attempts, questions, queue]);

  const categories = useMemo(() => {
    return [...new Set(questions.map((question) => question.category))].sort((a, b) => a.localeCompare(b));
  }, [questions]);

  const submitAnswer = useCallback(
    async (question: Question, selectedAnswer: string[], mode: PracticeMode, selfRating?: Attempt["selfRating"]) => {
      const isCorrect = question.type === "short" ? selfRating === "mastered" : isAnswerCorrect(question, selectedAnswer);
      const attempt: Attempt = {
        id: newId("attempt"),
        questionId: question.id,
        mode,
        selectedAnswer,
        isCorrect,
        selfRating,
        createdAt: new Date().toISOString()
      };

      await addAttempt(attempt, question);
      await refresh();
      return isCorrect;
    },
    [refresh]
  );

  const toggleQuestionFavorite = useCallback(
    async (question: Question) => {
      await toggleFavorite(question);
      await refresh();
    },
    [refresh]
  );

  const masterQuestion = useCallback(
    async (question: Question) => {
      await markQuestionMastered(question);
      await refresh();
    },
    [refresh]
  );

  const upsertNote = useCallback(
    async (note: Omit<Note, "id" | "updatedAt"> & { id?: string }) => {
      await saveNote({
        ...note,
        id: note.id ?? newId("note"),
        updatedAt: new Date().toISOString()
      });
      await refresh();
    },
    [refresh]
  );

  const upsertJob = useCallback(
    async (job: Omit<JobApplication, "id" | "updatedAt"> & { id?: string }) => {
      await saveJob({
        ...job,
        id: job.id ?? newId("job"),
        updatedAt: new Date().toISOString()
      });
      await refresh();
    },
    [refresh]
  );

  const updateSettings = useCallback(
    async (nextSettings: Settings) => {
      await saveSettings(nextSettings);
      await refresh();
      setConnection(await getConnectionState(nextSettings));
    },
    [refresh]
  );

  const detectConnection = useCallback(async () => {
    const nextState = await getConnectionState(settings);
    setConnection(nextState);
    return nextState;
  }, [settings]);

  const runSync = useCallback(async () => {
    setNotice("正在同步...");
    try {
      const result = await syncNow(settings);
      await refresh();
      setConnection("connected");
      setNotice(`同步完成：上传 ${result.uploaded} 条，下载 ${result.downloaded} 道题。`);
    } catch (error) {
      setConnection(navigator.onLine ? "online-unreachable" : "offline");
      setNotice(error instanceof Error ? `同步失败：${error.message}` : "同步失败");
    }
  }, [refresh, settings]);

  return {
    questions,
    attempts,
    notes,
    jobs,
    settings,
    manifest,
    queue,
    connection,
    loading,
    notice,
    stats,
    categories,
    refresh,
    submitAnswer,
    toggleQuestionFavorite,
    masterQuestion,
    upsertNote,
    upsertJob,
    updateSettings,
    detectConnection,
    runSync,
    setNotice
  };
}

function computeStreak(attempts: Attempt[]): number {
  const days = new Set(attempts.map((attempt) => attempt.createdAt.slice(0, 10)));
  let streak = 0;
  const cursor = new Date();

  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
