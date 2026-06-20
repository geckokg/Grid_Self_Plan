import type { Question, QuestionBankManifest } from "../types/domain";

export const SEED_VERSION = "comm-seed-3";
export const obsoleteSeedQuestionIds = [
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
  "exam-culture-001"
];

const now = new Date().toISOString();

export const sampleQuestions: Question[] = [
  {
    id: "fiber-transmission-001",
    type: "single",
    stem: "下列关于光纤通信的优势的说法，不正确的是（ ）。",
    options: [
      { id: "A", text: "损耗低，传输容量大" },
      { id: "B", text: "资源丰富，成本低廉" },
      { id: "C", text: "通信质量高" },
      { id: "D", text: "抗电磁，抗雷击，抗雨水，保密性好" }
    ],
    answer: ["B"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "光纤通信优势"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-002",
    type: "single",
    stem: "光纤通信的原理是光的（ ）。",
    options: [
      { id: "A", text: "折射原理" },
      { id: "B", text: "全反射原理" },
      { id: "C", text: "透视原理" },
      { id: "D", text: "反射原理" }
    ],
    answer: ["B"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "easy",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "全反射"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-003",
    type: "single",
    stem: "多模光纤的波长使用范围是（ ）。",
    options: [
      { id: "A", text: "850nm~1550nm" },
      { id: "B", text: "1310nm~1550nm" },
      { id: "C", text: "800nm~1800nm" },
      { id: "D", text: "1310nm~1800nm" }
    ],
    answer: ["A"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "多模光纤", "波长"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-004",
    type: "single",
    stem: "（ ）是用来完成各种速率接口适配功能的信息结构单元。",
    options: [
      { id: "A", text: "虚容器" },
      { id: "B", text: "容器" },
      { id: "C", text: "支路单元" },
      { id: "D", text: "管理单元" }
    ],
    answer: ["A"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "SDH", "虚容器"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-005",
    type: "single",
    stem: "光接收机的主要质量指标是灵敏度，影响灵敏度的主要因素是（ ）。",
    options: [
      { id: "A", text: "光接收机接收光信号的强弱" },
      { id: "B", text: "光接收机的放大器的倍数" },
      { id: "C", text: "光接收机的噪声" },
      { id: "D", text: "光信号的噪声" }
    ],
    answer: ["C"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "光接收机", "灵敏度"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-006",
    type: "single",
    stem: "下列说法正确的是（ ）。",
    options: [
      { id: "A", text: "单模光能在多模光纤中传输，多模光能在单模光纤中传输" },
      { id: "B", text: "单模光能在多模光纤中传输，但多模光不能在单模光纤中传输" },
      { id: "C", text: "单模光不能在多模光纤中传输，但多模光能在单模光纤中传输" },
      { id: "D", text: "单模光不能在多模光纤中传输，多模光不能在单模光纤中传输" }
    ],
    answer: ["B"],
    explanation: "单模光纤是只能在指定波长下传输一种模式的光。",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "单模光纤", "多模光纤"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-007",
    type: "single",
    stem: "光隔离器的作用是（ ）。",
    options: [
      { id: "A", text: "调节光信号的功率大小" },
      { id: "B", text: "保证光信号只能正向传输" },
      { id: "C", text: "分离同向传输的各路光信号" },
      { id: "D", text: "将光纤中传输的监控信号隔离开" }
    ],
    answer: ["B"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "光隔离器"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-008",
    type: "single",
    stem: "下列说法正确的是（ ）。",
    options: [
      { id: "A", text: "光纤的损耗决定光纤通信系统的通信容量" },
      { id: "B", text: "光纤的损耗决定光纤通信系统的传输速率" },
      { id: "C", text: "光纤的损耗决定光纤通信系统的传输距离" },
      { id: "D", text: "光纤的损耗决定光纤通信系统的传输模式" }
    ],
    answer: ["C"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "光纤损耗", "传输距离"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-009",
    type: "single",
    stem: "下列不属于准同步数字复接体系的缺点是（ ）。",
    options: [
      { id: "A", text: "PDH为语音业务设计，不适用现代通信宽带化、智能化和个人化的发展趋势" },
      { id: "B", text: "具有强大的网络管理功能" },
      { id: "C", text: "标准不统一，目前世界上有三种不同地区性的标准，三者互不兼容" },
      { id: "D", text: "PDH传输线路主要是点对点连接，不适应现代通信网灵活的拓扑接头" }
    ],
    answer: ["B"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "PDH", "准同步数字复接体系"],
    version: SEED_VERSION,
    updatedAt: now,
    favorite: false,
    wrong: false,
    mastered: false,
    practiceCount: 0
  },
  {
    id: "fiber-transmission-010",
    type: "single",
    stem: "光纤的色散特性是光纤线路的重要参数。在多模光纤中，（ ）是主要的色散成分。",
    options: [
      { id: "A", text: "材料色散" },
      { id: "B", text: "模式色散" },
      { id: "C", text: "波导色散" },
      { id: "D", text: "极化色散" }
    ],
    answer: ["B"],
    explanation: "",
    category: "光纤传输技术",
    difficulty: "medium",
    source: "图片导入：quest_pic/光纤传输技术/1-10",
    tags: ["第1章", "多模光纤", "色散"],
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
