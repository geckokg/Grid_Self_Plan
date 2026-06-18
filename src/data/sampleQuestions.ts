import type { Question, QuestionBankManifest } from "../types/domain";

export const SEED_VERSION = "comm-seed-1";
export const obsoleteSeedQuestionIds = [
  "seed-circuit-001",
  "seed-power-001",
  "seed-relay-001",
  "seed-hv-001",
  "seed-culture-001"
];

const now = new Date().toISOString();

export const sampleQuestions: Question[] = [
  {
    id: "comm-principle-001",
    type: "single",
    stem: "在数字通信系统中，信噪比提高通常会带来什么影响？",
    options: [
      { id: "A", text: "误码率降低" },
      { id: "B", text: "误码率升高" },
      { id: "C", text: "带宽一定变为 0" },
      { id: "D", text: "调制方式失效" }
    ],
    answer: ["A"],
    explanation: "在其他条件相同的情况下，信噪比提高通常会改善判决可靠性，使误码率降低。",
    category: "通信原理",
    difficulty: "easy",
    source: "本地原创示例题",
    tags: ["信噪比", "误码率"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "signal-system-001",
    type: "single",
    stem: "线性时不变系统的冲激响应为 h(t)，输入为 x(t)，输出通常可表示为？",
    options: [
      { id: "A", text: "x(t) 与 h(t) 的卷积" },
      { id: "B", text: "x(t) 与 h(t) 的普通加法" },
      { id: "C", text: "只等于 h(t)" },
      { id: "D", text: "只等于 x(t)" }
    ],
    answer: ["A"],
    explanation: "连续时间 LTI 系统的输出可表示为输入信号与系统冲激响应的卷积。",
    category: "信号与系统",
    difficulty: "medium",
    source: "本地原创示例题",
    tags: ["LTI", "卷积"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-comm-001",
    type: "judge",
    stem: "光纤通信通常具有传输容量大、损耗低、抗电磁干扰能力强等特点。",
    options: [
      { id: "true", text: "正确" },
      { id: "false", text: "错误" }
    ],
    answer: ["true"],
    explanation: "这是光纤通信相对传统电缆通信的典型优势。",
    category: "光纤通信",
    difficulty: "easy",
    source: "本地原创示例题",
    tags: ["光纤", "传输特性"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "mobile-comm-001",
    type: "multiple",
    stem: "移动通信网络中，影响无线链路质量的因素通常包括哪些？",
    options: [
      { id: "A", text: "路径损耗" },
      { id: "B", text: "多径衰落" },
      { id: "C", text: "同频或邻频干扰" },
      { id: "D", text: "题目编号字体大小" }
    ],
    answer: ["A", "B", "C"],
    explanation: "无线链路质量会受到传播损耗、衰落、干扰、噪声、移动速度等多种因素影响。",
    category: "移动通信",
    difficulty: "medium",
    source: "本地原创示例题",
    tags: ["无线链路", "干扰", "衰落"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "network-001",
    type: "single",
    stem: "TCP/IP 分层模型中，IP 协议主要工作在哪一层？",
    options: [
      { id: "A", text: "应用层" },
      { id: "B", text: "传输层" },
      { id: "C", text: "网络层" },
      { id: "D", text: "物理层" }
    ],
    answer: ["C"],
    explanation: "IP 协议负责寻址与路由，通常归入网络层。",
    category: "计算机网络",
    difficulty: "easy",
    source: "本地原创示例题",
    tags: ["TCP/IP", "网络层"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "power-telecom-001",
    type: "single",
    stem: "电力通信网中，承载调度数据、继电保护信息和生产管理信息时，通常最优先关注的是？",
    options: [
      { id: "A", text: "通信可靠性与安全性" },
      { id: "B", text: "界面颜色是否统一" },
      { id: "C", text: "是否完全不需要备份链路" },
      { id: "D", text: "是否只使用公网链路" }
    ],
    answer: ["A"],
    explanation: "电力通信承载生产控制和调度相关业务时，可靠性、安全性、可用性和时延都很关键。",
    category: "电力通信网",
    difficulty: "medium",
    source: "本地原创示例题",
    tags: ["电力通信", "可靠性"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "exam-culture-001",
    type: "short",
    stem: "请简要说明备考通信类岗位时，为什么要把错题、知识点和岗位要求放在同一个工具里管理。",
    options: [],
    answer: ["错题定位薄弱点，知识点形成复习结构，岗位要求帮助调整复习优先级。"],
    explanation: "主观题第一版不自动判分，可通过自评记录掌握情况。",
    category: "行测/公共基础/企业文化",
    difficulty: "easy",
    source: "本地原创示例题",
    tags: ["学习方法", "岗位匹配"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  }
];

export const seedManifest: QuestionBankManifest = {
  version: SEED_VERSION,
  updatedAt: now,
  totalQuestions: sampleQuestions.length,
  categories: Object.entries(
    sampleQuestions.reduce<Record<string, number>>((acc, question) => {
      acc[question.category] = (acc[question.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count, updatedAt: now }))
};
