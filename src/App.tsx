import { FormEvent, useMemo, useState } from "react";
import { useAppData } from "./hooks/useAppData";
import type { Attempt, JobApplication, PracticeMode, Question } from "./types/domain";
import { difficultyLabel, typeLabel } from "./utils/answers";

type Tab = "home" | "practice" | "wrong" | "notes" | "jobs" | "settings";

const navItems: { id: Tab; label: string }[] = [
  { id: "home", label: "首页" },
  { id: "practice", label: "刷题" },
  { id: "wrong", label: "错题" },
  { id: "notes", label: "笔记" },
  { id: "jobs", label: "岗位" },
  { id: "settings", label: "设置" }
];

export default function App() {
  const app = useAppData();
  const [tab, setTab] = useState<Tab>("home");

  if (app.loading) {
    return (
      <main className="app loading-screen">
        <div className="brand-mark">电</div>
        <p>正在打开本地题库...</p>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">离线优先 PWA</p>
          <h1>电网通信备考助手</h1>
        </div>
        <ConnectionBadge state={app.connection} pending={app.stats.pendingSync} />
      </header>

      {app.notice && (
        <button className="notice" type="button" onClick={() => app.setNotice("")}>
          {app.notice}
        </button>
      )}

      <main className="content">
        {tab === "home" && (
          <HomePage
            manifestVersion={app.manifest?.version ?? "未知"}
            stats={app.stats}
            connection={app.connection}
            categories={app.categories}
            questions={app.questions}
            onSync={app.runSync}
            onPractice={() => setTab("practice")}
          />
        )}
        {tab === "practice" && (
          <PracticePage
            questions={app.questions}
            categories={app.categories}
            onSubmit={app.submitAnswer}
            onToggleFavorite={app.toggleQuestionFavorite}
            onSaveQuestionNote={(question, content) =>
              app.upsertNote({
                scope: "question",
                title: question.stem.slice(0, 26),
                content,
                category: question.category,
                targetId: question.id
              })
            }
          />
        )}
        {tab === "wrong" && (
          <WrongPage questions={app.questions} onMaster={app.masterQuestion} onToggleFavorite={app.toggleQuestionFavorite} />
        )}
        {tab === "notes" && <NotesPage notes={app.notes} categories={app.categories} onSave={app.upsertNote} />}
        {tab === "jobs" && <JobsPage jobs={app.jobs} onSave={app.upsertJob} />}
        {tab === "settings" && (
          <SettingsPage
            settings={app.settings}
            manifestVersion={app.manifest?.version ?? "未知"}
            manifestUpdatedAt={app.manifest?.updatedAt}
            pendingCount={app.queue.length}
            connection={app.connection}
            onDetect={app.detectConnection}
            onSave={app.updateSettings}
            onSync={app.runSync}
          />
        )}
      </main>

      <nav className="bottom-nav" aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={item.id === tab ? "active" : ""}
            type="button"
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function ConnectionBadge({ state, pending }: { state: string; pending: number }) {
  const label =
    state === "connected" ? "已连接电脑服务" : state === "offline" ? "离线可用" : "电脑服务未连接";
  return (
    <div className={`connection ${state}`}>
      <span>{label}</span>
      {pending > 0 && <strong>{pending} 待同步</strong>}
    </div>
  );
}

function HomePage({
  manifestVersion,
  stats,
  connection,
  categories,
  questions,
  onSync,
  onPractice
}: {
  manifestVersion: string;
  stats: ReturnType<typeof useAppData>["stats"];
  connection: string;
  categories: string[];
  questions: Question[];
  onSync: () => void;
  onPractice: () => void;
}) {
  const mastery = categories.map((category) => {
    const list = questions.filter((question) => question.category === category);
    const practiced = list.filter((question) => question.practiceCount > 0 && !question.wrong).length;
    return { category, value: list.length ? Math.round((practiced / list.length) * 100) : 0 };
  });

  return (
    <section className="stack">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">今天</p>
          <h2>{stats.todayAttempts} 题</h2>
          <p>正确率 {stats.todayCorrectRate}% · 连续 {stats.streakDays} 天</p>
        </div>
        <button className="primary" type="button" onClick={onPractice}>
          开始刷题
        </button>
      </div>

      <div className="metric-grid">
        <Metric title="待复习错题" value={`${stats.wrongToReview}`} />
        <Metric title="题库版本" value={manifestVersion} />
        <Metric title="电脑服务" value={connection === "connected" ? "已连接" : "未连接"} />
        <Metric title="待同步" value={`${stats.pendingSync}`} />
      </div>

      <section className="panel">
        <div className="section-title">
          <h2>分类掌握情况</h2>
          <button type="button" onClick={onSync}>
            手动同步
          </button>
        </div>
        <div className="progress-list">
          {mastery.map((item) => (
            <div key={item.category} className="progress-row">
              <span>{item.category}</span>
              <div className="progress-track">
                <i style={{ width: `${item.value}%` }} />
              </div>
              <strong>{item.value}%</strong>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function PracticePage({
  questions,
  categories,
  onSubmit,
  onToggleFavorite,
  onSaveQuestionNote
}: {
  questions: Question[];
  categories: string[];
  onSubmit: (question: Question, selected: string[], mode: PracticeMode, rating?: Attempt["selfRating"]) => Promise<boolean>;
  onToggleFavorite: (question: Question) => void;
  onSaveQuestionNote: (question: Question, content: string) => void;
}) {
  const [mode, setMode] = useState<PracticeMode>("sequence");
  const [category, setCategory] = useState("全部");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<string>("");
  const [note, setNote] = useState("");

  const queue = useMemo(() => {
    let list = [...questions];
    if (category !== "全部") {
      list = list.filter((question) => question.category === category);
    }
    if (mode === "wrong") {
      list = list.filter((question) => question.wrong && !question.mastered);
    }
    if (mode === "favorite") {
      list = list.filter((question) => question.favorite);
    }
    if (mode === "random") {
      return [...list].sort(() => Math.random() - 0.5);
    }
    return list;
  }, [category, mode, questions]);

  const question = queue[index % Math.max(queue.length, 1)];
  const questionNumber = question ? (index % queue.length) + 1 : 0;

  function toggleOption(optionId: string) {
    if (!question || revealed) {
      return;
    }
    if (question.type === "multiple") {
      setSelected((prev) => (prev.includes(optionId) ? prev.filter((item) => item !== optionId) : [...prev, optionId]));
      return;
    }
    setSelected([optionId]);
  }

  async function submit(rating?: Attempt["selfRating"]) {
    if (!question) {
      return;
    }
    const correct = await onSubmit(question, selected, mode, rating);
    setRevealed(true);
    setResult(correct ? "答对了" : "需要复习");
  }

  function nextQuestion() {
    setIndex((value) => value + 1);
    setSelected([]);
    setRevealed(false);
    setResult("");
    setNote("");
  }

  function previousQuestion() {
    setIndex((value) => Math.max(value - 1, 0));
    setSelected([]);
    setRevealed(false);
    setResult("");
    setNote("");
  }

  return (
    <section className="stack">
      <div className="control-row">
        <select value={mode} onChange={(event) => setMode(event.target.value as PracticeMode)}>
          <option value="sequence">顺序练习</option>
          <option value="random">随机练习</option>
          <option value="wrong">只练错题</option>
          <option value="favorite">只练收藏</option>
          <option value="category">按分类练习</option>
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="全部">全部分类</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {!question ? (
        <EmptyState title="没有可练习的题目" text="可以先切换分类，或等电脑端同步新的题库。" />
      ) : (
        <article className="question-card">
          <div className="question-counter">
            第 {questionNumber} / {queue.length} 题
          </div>
          <div className="question-meta">
            <span>{typeLabel(question.type)}</span>
            <span>{question.category}</span>
            <span>{difficultyLabel(question.difficulty)}</span>
            <button type="button" onClick={() => onToggleFavorite(question)}>
              {question.favorite ? "已收藏" : "收藏"}
            </button>
          </div>
          <h2>{question.stem}</h2>

          {question.type === "short" ? (
            <textarea
              className="answer-box"
              placeholder="主观题第一版先自评：可以写下你的答题要点。"
              value={selected[0] ?? ""}
              onChange={(event) => setSelected([event.target.value])}
            />
          ) : (
            <div className="option-list">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  className={selected.includes(option.id) ? "selected" : ""}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                >
                  <strong>{option.id}</strong>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          )}

          <div className="action-row">
            <button type="button" disabled={index === 0} onClick={previousQuestion}>
              上一题
            </button>
            {question.type === "short" ? (
              <>
                <button className="primary" type="button" onClick={() => submit("mastered")}>
                  自评掌握
                </button>
                <button type="button" onClick={() => submit("unclear")}>
                  还不熟
                </button>
              </>
            ) : (
              <button className="primary" type="button" disabled={selected.length === 0} onClick={() => submit()}>
                提交答案
              </button>
            )}
            <button type="button" onClick={nextQuestion}>
              下一题
            </button>
          </div>

          {revealed && (
            <div className="explanation">
              <strong>{result}</strong>
              <p>正确答案：{question.answer.join("、")}</p>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className="inline-note">
            <textarea placeholder="给这道题写备注，会离线保存并加入待同步队列。" value={note} onChange={(event) => setNote(event.target.value)} />
            <button
              type="button"
              disabled={!note.trim()}
              onClick={() => {
                onSaveQuestionNote(question, note);
                setNote("");
              }}
            >
              保存题目笔记
            </button>
          </div>
        </article>
      )}
    </section>
  );
}

function WrongPage({
  questions,
  onMaster,
  onToggleFavorite
}: {
  questions: Question[];
  onMaster: (question: Question) => void;
  onToggleFavorite: (question: Question) => void;
}) {
  const wrongQuestions = questions.filter((question) => question.wrong && !question.mastered);

  if (wrongQuestions.length === 0) {
    return <EmptyState title="错题本是空的" text="做错的题会自动进入这里，也可以在刷题页继续练习。" />;
  }

  return (
    <section className="stack">
      {wrongQuestions.map((question, itemIndex) => (
        <article className="list-card" key={question.id}>
          <div className="question-meta">
            <span>错题 {itemIndex + 1} / {wrongQuestions.length}</span>
            <span>{question.category}</span>
            <span>{typeLabel(question.type)}</span>
          </div>
          <h2>{question.stem}</h2>
          <p>{question.explanation}</p>
          <div className="action-row">
            <button type="button" onClick={() => onMaster(question)}>
              标记已掌握
            </button>
            <button type="button" onClick={() => onToggleFavorite(question)}>
              {question.favorite ? "取消收藏" : "收藏"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

function NotesPage({
  notes,
  categories,
  onSave
}: {
  notes: ReturnType<typeof useAppData>["notes"];
  categories: string[];
  onSave: ReturnType<typeof useAppData>["upsertNote"];
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "自定义");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }
    onSave({ scope: "knowledge", title, content, category });
    setTitle("");
    setContent("");
  }

  return (
    <section className="stack">
      <form className="panel form" onSubmit={submit}>
        <h2>知识点笔记</h2>
        <input placeholder="标题，例如：暂态稳定判据" value={title} onChange={(event) => setTitle(event.target.value)} />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {[...categories, "自定义"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <textarea placeholder="写下自己的理解、公式、易错点。" value={content} onChange={(event) => setContent(event.target.value)} />
        <button className="primary" type="submit">
          保存笔记
        </button>
      </form>

      {notes.map((note) => (
        <article className="list-card" key={note.id}>
          <div className="question-meta">
            <span>{note.scope === "question" ? "题目笔记" : "知识点"}</span>
            {note.category && <span>{note.category}</span>}
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </article>
      ))}
    </section>
  );
}

function JobsPage({ jobs, onSave }: { jobs: JobApplication[]; onSave: ReturnType<typeof useAppData>["upsertJob"] }) {
  const [form, setForm] = useState({
    company: "国家电网",
    role: "",
    city: "",
    signupDate: "",
    examDate: "",
    status: "planned" as JobApplication["status"],
    requirements: "",
    notes: ""
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.role.trim()) {
      return;
    }
    onSave(form);
    setForm((prev) => ({ ...prev, role: "", requirements: "", notes: "" }));
  }

  return (
    <section className="stack">
      <form className="panel form" onSubmit={submit}>
        <h2>岗位投递记录</h2>
        <input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
        <input placeholder="岗位名称" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
        <input placeholder="城市/地区" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
        <label>
          报名时间
          <input type="date" value={form.signupDate} onChange={(event) => setForm({ ...form, signupDate: event.target.value })} />
        </label>
        <label>
          考试时间
          <input type="date" value={form.examDate} onChange={(event) => setForm({ ...form, examDate: event.target.value })} />
        </label>
        <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as JobApplication["status"] })}>
          <option value="planned">准备投递</option>
          <option value="applied">已报名</option>
          <option value="written">笔试阶段</option>
          <option value="interview">面试阶段</option>
          <option value="offer">录用/Offer</option>
          <option value="rejected">未通过</option>
        </select>
        <textarea placeholder="岗位要求" value={form.requirements} onChange={(event) => setForm({ ...form, requirements: event.target.value })} />
        <textarea placeholder="备注" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        <button className="primary" type="submit">
          保存岗位
        </button>
      </form>

      {jobs.map((job) => (
        <article className="list-card" key={job.id}>
          <div className="question-meta">
            <span>{job.company}</span>
            <span>{job.status}</span>
          </div>
          <h2>{job.role}</h2>
          <p>{job.city || "未填写地区"} · 报名 {job.signupDate || "待定"} · 考试 {job.examDate || "待定"}</p>
          {job.requirements && <p>{job.requirements}</p>}
          {job.notes && <p>{job.notes}</p>}
        </article>
      ))}
    </section>
  );
}

function SettingsPage({
  settings,
  manifestVersion,
  manifestUpdatedAt,
  pendingCount,
  connection,
  onDetect,
  onSave,
  onSync
}: {
  settings: ReturnType<typeof useAppData>["settings"];
  manifestVersion: string;
  manifestUpdatedAt?: string;
  pendingCount: number;
  connection: string;
  onDetect: () => Promise<string>;
  onSave: ReturnType<typeof useAppData>["updateSettings"];
  onSync: () => void;
}) {
  const [apiBaseUrl, setApiBaseUrl] = useState(settings.apiBaseUrl);
  const [autoDetectSync, setAutoDetectSync] = useState(settings.autoDetectSync);
  const uploadUrl = makeUploadUrl(apiBaseUrl);

  return (
    <section className="stack">
      <form
        className="panel form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave({ ...settings, apiBaseUrl, autoDetectSync });
        }}
      >
        <h2>电脑服务</h2>
        <input value={apiBaseUrl} onChange={(event) => setApiBaseUrl(event.target.value)} placeholder="http://192.168.1.x:4173" />
        <label className="check-row">
          <input type="checkbox" checked={autoDetectSync} onChange={(event) => setAutoDetectSync(event.target.checked)} />
          自动检测电脑服务
        </label>
        <div className="action-row">
          <button className="primary" type="submit">
            保存设置
          </button>
          <button type="button" onClick={onDetect}>
            检测连接
          </button>
          <button type="button" onClick={onSync}>
            同步题库
          </button>
        </div>
      </form>

      <section className="panel form">
        <h2>手机上传题图</h2>
        <p>
          电脑先运行 <code>npm.cmd run upload</code>。手机和电脑同网时，打开电脑服务的上传页，把截图直接保存进
          <code>quest_pic/科目/批次/</code>。
        </p>
        <div className="action-row">
          <button className="primary" type="button" onClick={() => window.open(uploadUrl, "_blank", "noopener,noreferrer")}>
            打开上传页
          </button>
        </div>
        <p className="help-text">
          当前上传地址：<code>{uploadUrl}</code>
        </p>
      </section>

      <section className="panel">
        <h2>本地状态</h2>
        <p>连接状态：{connection === "connected" ? "已连接电脑服务" : connection === "offline" ? "离线可用" : "已联网但电脑服务不可达"}</p>
        <p>当前题库版本：{manifestVersion}</p>
        <p>题库更新时间：{manifestUpdatedAt ? new Date(manifestUpdatedAt).toLocaleString() : "未知"}</p>
        <p>待同步数据：{pendingCount} 条</p>
      </section>
    </section>
  );
}

function makeUploadUrl(apiBaseUrl: string): string {
  const baseUrl = apiBaseUrl.trim().replace(/\/+$/, "");
  if (baseUrl) {
    return `${baseUrl}/upload`;
  }

  return `${window.location.origin}/upload`;
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <section className="empty">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
