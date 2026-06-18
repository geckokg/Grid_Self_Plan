export type QuestionType = "single" | "multiple" | "judge" | "short";
export type Difficulty = "easy" | "medium" | "hard";
export type PracticeMode = "sequence" | "random" | "wrong" | "favorite" | "category";
export type ConnectionState = "offline" | "online-unreachable" | "connected";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  stem: string;
  options: Option[];
  answer: string[];
  explanation: string;
  category: string;
  difficulty: Difficulty;
  source?: string;
  tags: string[];
  version: string;
  updatedAt: string;
  favorite: boolean;
  wrong: boolean;
  mastered: boolean;
  lastPracticedAt?: string;
  practiceCount: number;
}

export interface Attempt {
  id: string;
  questionId: string;
  mode: PracticeMode;
  selectedAnswer: string[];
  isCorrect: boolean;
  createdAt: string;
  durationMs?: number;
  selfRating?: "mastered" | "unclear" | "wrong";
}

export interface Note {
  id: string;
  scope: "question" | "knowledge" | "job";
  title: string;
  content: string;
  category?: string;
  targetId?: string;
  updatedAt: string;
  conflictOf?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  city?: string;
  signupDate?: string;
  examDate?: string;
  status: "planned" | "applied" | "written" | "interview" | "offer" | "rejected";
  requirements?: string;
  notes?: string;
  updatedAt: string;
}

export interface SyncQueueItem {
  id: string;
  entity: "attempt" | "note" | "favorite" | "wrong-question" | "job";
  op: "upsert" | "delete";
  payload: unknown;
  status: "pending" | "sent" | "failed";
  attempts: number;
  createdAt: string;
  lastError?: string;
}

export interface CategorySummary {
  name: string;
  count: number;
  updatedAt?: string;
}

export interface QuestionBankManifest {
  version: string;
  updatedAt: string;
  totalQuestions: number;
  categories: CategorySummary[];
}

export interface Settings {
  apiBaseUrl: string;
  autoDetectSync: boolean;
  lastSyncAt?: string;
}

export interface DashboardStats {
  todayAttempts: number;
  todayCorrectRate: number;
  wrongToReview: number;
  streakDays: number;
  pendingSync: number;
}
