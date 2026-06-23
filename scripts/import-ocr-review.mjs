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
const seedVersion = args.seedVersion ?? "fiber-transmission-2026-06-23-clean";
const updatedAt = args.updatedAt ?? "2026-06-23T00:00:00.000Z";
const categoryName = "\u5149\u7ea4\u4f20\u8f93\u6280\u672f";
const manualQuestionFixes = {
  "fiber-transmission-001": {
    stem: "下列关于光纤通信的优势的说法，不正确的是（ ）",
    options: [
      { id: "A", text: "损耗低，传输容量大" },
      { id: "B", text: "资源丰富，成本低廉" },
      { id: "C", text: "通信质量高" },
      { id: "D", text: "抗电磁，抗雷击，抗雨水，保密性好" }
    ],
    explanation: ""
  },
  "fiber-transmission-002": {
    stem: "光纤通信的原理是光的（ ）",
    options: [
      { id: "A", text: "折射原理" },
      { id: "B", text: "全反射原理" },
      { id: "C", text: "透视原理" },
      { id: "D", text: "反射原理" }
    ],
    explanation: ""
  },
  "fiber-transmission-003": {
    stem: "多模光纤的波长使用范围是（ ）",
    options: [
      { id: "A", text: "850nm、1550nm" },
      { id: "B", text: "1310nm、1550nm" },
      { id: "C", text: "800nm、1800nm" },
      { id: "D", text: "1310nm、1800nm" }
    ],
    explanation: ""
  },
  "fiber-transmission-004": {
    stem: "（ ）是用来完成各种速率接口适配功能的信息结构单元。",
    options: [
      { id: "A", text: "虚容器" },
      { id: "B", text: "容器" },
      { id: "C", text: "支路单元" },
      { id: "D", text: "管理单元" }
    ],
    explanation: ""
  },
  "fiber-transmission-005": {
    stem: "光接收机的主要质量指标是灵敏度，影响灵敏度的主要因素是（ ）",
    options: [
      { id: "A", text: "光接收机接收光信号的强弱" },
      { id: "B", text: "光接收机的放大器的倍数" },
      { id: "C", text: "光接收机的噪声" },
      { id: "D", text: "光信号的噪声" }
    ],
    explanation: ""
  },
  "fiber-transmission-006": {
    stem: "下列说法正确的是（ ）",
    options: [
      { id: "A", text: "单模光能在多模光纤中传输，多模光能在单模光纤中传输" },
      { id: "B", text: "单模光能在多模光纤中传输，但多模光不能在单模光纤中传输" },
      { id: "C", text: "单模光不能在多模光纤中传输，但多模光能在单模光纤中传输" },
      { id: "D", text: "单模光不能在多模光纤中传输，多模光不能在单模光纤中传输" }
    ],
    explanation: "单模光纤只能在指定波长下传输一种模式的光。"
  },
  "fiber-transmission-007": {
    stem: "光隔离器的作用是（ ）",
    options: [
      { id: "A", text: "调节光信号的功率大小" },
      { id: "B", text: "保证光信号只能正向传输" },
      { id: "C", text: "分离同向传输的各路光信号" },
      { id: "D", text: "将光纤中传输的监控信号隔离开" }
    ],
    explanation: ""
  },
  "fiber-transmission-008": {
    stem: "下列说法正确的是（ ）",
    options: [
      { id: "A", text: "光纤的损耗决定光纤通信系统的通信容量" },
      { id: "B", text: "光纤的损耗决定光纤通信系统的传输速率" },
      { id: "C", text: "光纤的损耗决定光纤通信系统的传输距离" },
      { id: "D", text: "光纤的损耗决定光纤通信系统的传输模式" }
    ],
    explanation: ""
  },
  "fiber-transmission-009": {
    stem: "下列不属于准同步数字复接体系的缺点是（ ）",
    options: [
      { id: "A", text: "PDH为语音业务设计，不适用现代通信宽带化、智能化和个人化的发展趋势" },
      { id: "B", text: "具有强大的网络管理功能" },
      { id: "C", text: "标准不统一，目前世界上有三种不同地区性的标准，三者互不兼容" },
      { id: "D", text: "PDH传输线路主要是点对点连接，不适应现代通信网灵活的拓扑结构" }
    ],
    explanation: ""
  },
  "fiber-transmission-010": {
    stem: "光纤的色散特性是光纤线路的重要参数。在多模光纤中，（ ）是主要的色散成分。",
    options: [
      { id: "A", text: "材料色散" },
      { id: "B", text: "模式色散" },
      { id: "C", text: "波导色散" },
      { id: "D", text: "极化色散" }
    ],
    explanation: ""
  },
  "fiber-transmission-011": { stem: "光放大器可以代替再生中继器。", explanation: "" },
  "fiber-transmission-012": { stem: "最大接收角越大，即纤芯与包层的折射率之差越大，光纤捕捉光线的能力越弱，这种能力用数值孔径NA来表示。", explanation: "" },
  "fiber-transmission-013": { stem: "数字光纤传输系统中常采用的码型是3B4B码和插入码。", explanation: "光纤线路中传输的码型不是输入接口译码产生的NRZ码，而是要先进行码型变换。" },
  "fiber-transmission-014": { stem: "大家每天使用的电话与本地交换局间的连接属于线性总线型网络结构。", explanation: "电话与本地交换局间的连接属于星型结构。" },
  "fiber-transmission-015": { stem: "串口通信中8个bit也就是8个0或者1为1字节，可以表示成2个字符。", explanation: "" },
  "fiber-transmission-016": { stem: "滤波器属无源器件，故从严格意义上讲，可调谐滤波器属于无源器件。", explanation: "" },
  "fiber-transmission-017": { stem: "光纤的机械特性主要包括耐侧压力、抗拉强度、弯曲以及扭绞性能等，耐侧压力是目前使用者最关心的问题。", explanation: "使用者最关心的是抗拉强度。" },
  "fiber-transmission-018": { stem: "EDFA可以放大全波长的光。", explanation: "" },
  "fiber-transmission-019": { stem: "EDFA工作波长为1510nm，与光纤的低损耗波段一致。", explanation: "" },
  "fiber-transmission-020": { stem: "在OTN网络共定义了两种保护方式，即线性保护和子网连接保护。", explanation: "" },
  "fiber-transmission-021": {
    stem: "光纤通信系统中，线性损耗主要包括（ ）",
    options: [
      { id: "A", text: "瑞利散射" },
      { id: "B", text: "受激拉曼散射" },
      { id: "C", text: "受激布里渊散射" },
      { id: "D", text: "材料不均匀引起的散射" }
    ],
    explanation: ""
  },
  "fiber-transmission-022": {
    stem: "MMF按折射率分布进行分类时，有哪两种？",
    options: [
      { id: "A", text: "渐变型" },
      { id: "B", text: "随机型" },
      { id: "C", text: "曲线型" },
      { id: "D", text: "阶跃型" }
    ],
    explanation: ""
  },
  "fiber-transmission-023": {
    stem: "光纤放大器又可分为（ ）",
    options: [
      { id: "A", text: "非线性光纤放大器" },
      { id: "B", text: "线性光纤放大器" },
      { id: "C", text: "掺铒光纤放大器" },
      { id: "D", text: "波分复用放大器" }
    ],
    explanation: ""
  },
  "fiber-transmission-024": {
    stem: "下列关于光纤通信特点的描述中错误的有（ ）",
    options: [
      { id: "A", text: "光纤通信的传输频带宽，通信容量小，可以容纳很少的光信号" },
      { id: "B", text: "光纤通信的光中继器可以中继的距离较长，可以很长时间地补偿信号衰减和纠正信号失真" },
      { id: "C", text: "光纤通信的信道保密性能不好，信道串扰（同一系统内不同信道之间的干扰）大" },
      { id: "D", text: "光纤通信适应能力强，能快速应对突发情况" }
    ],
    explanation: ""
  },
  "fiber-transmission-025": {
    stem: "按目前通信所用的不同类型的光缆，光缆可以分为（ ）",
    options: [
      { id: "A", text: "设备内光缆" },
      { id: "B", text: "海底光缆" },
      { id: "C", text: "特种光缆" },
      { id: "D", text: "室内外光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-026": {
    stem: "激光器的参数主要有（ ）",
    options: [
      { id: "A", text: "平均衰减系数" },
      { id: "B", text: "增益系数" },
      { id: "C", text: "阈值条件" },
      { id: "D", text: "谐振频率" }
    ],
    explanation: ""
  },
  "fiber-transmission-027": {
    stem: "半导体激光器的特性有（ ）",
    options: [
      { id: "A", text: "阈值特性" },
      { id: "B", text: "光谱特性" },
      { id: "C", text: "温度特性" },
      { id: "D", text: "转换效率" }
    ],
    explanation: ""
  },
  "fiber-transmission-028": {
    stem: "SDH的复用单元主要由（ ）、虚容器、支路单元与支路单元组、管理单元与管理单元组、同步传输模块等模块组成。",
    options: [
      { id: "A", text: "容器" },
      { id: "B", text: "虚容器" },
      { id: "C", text: "支路单元与支路单元组" },
      { id: "D", text: "管理单元与管理单元组" }
    ],
    explanation: ""
  },
  "fiber-transmission-029": {
    stem: "SDH技术是一套完整的标准化数字信号同步技术，可以完成信息的（ ）",
    options: [
      { id: "A", text: "同步" },
      { id: "B", text: "传输" },
      { id: "C", text: "复用" },
      { id: "D", text: "分插分叉连接" }
    ],
    explanation: ""
  },
  "fiber-transmission-030": {
    stem: "发光二极管的工作特性包括（ ）",
    options: [
      { id: "A", text: "光谱特性" },
      { id: "B", text: "输出光功率特性" },
      { id: "C", text: "温度特性" },
      { id: "D", text: "耦合效率特性" }
    ],
    explanation: ""
  },
  "fiber-transmission-031": {
    stem: "光纤的机械特性主要包括（ ）",
    options: [
      { id: "A", text: "耐侧压力" },
      { id: "B", text: "抗拉强度" },
      { id: "C", text: "弯曲" },
      { id: "D", text: "扭绞性能" }
    ],
    explanation: ""
  },
  "fiber-transmission-032": {
    stem: "SDH网常见的网元主要有（ ）",
    options: [
      { id: "A", text: "终端复用器" },
      { id: "B", text: "分插复用器" },
      { id: "C", text: "同步数字交叉连接设备" },
      { id: "D", text: "再生中继器" }
    ],
    explanation: "SDH网常见的网元主要有终端复用器（TM）、分插复用器（ADM）、同步数字交叉连接设备（SDXC）、再生中继器（REG）。"
  },
  "fiber-transmission-033": {
    stem: "光缆的典型结构有（ ）",
    options: [
      { id: "A", text: "层绞式光缆" },
      { id: "B", text: "骨架式光缆" },
      { id: "C", text: "束管式光缆" },
      { id: "D", text: "带状光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-034": {
    stem: "SDH网络存在着一些问题，比如（ ）",
    options: [
      { id: "A", text: "频带利用率低" },
      { id: "B", text: "抖动性能劣化" },
      { id: "C", text: "软件权限过大" },
      { id: "D", text: "定时信息传送困难" }
    ],
    explanation: ""
  },
  "fiber-transmission-035": {
    stem: "光缆可以分为（ ）",
    options: [
      { id: "A", text: "市话光缆" },
      { id: "B", text: "长途光缆" },
      { id: "C", text: "海底光缆" },
      { id: "D", text: "用户光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-036": {
    stem: "按照光缆内光纤的套塑方法不同，光缆可以分为（ ）",
    options: [
      { id: "A", text: "紧套光缆" },
      { id: "B", text: "松套光缆" },
      { id: "C", text: "束管式光缆" },
      { id: "D", text: "带状多芯单元光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-037": {
    stem: "光纤由（ ）构成。",
    options: [
      { id: "A", text: "纤芯" },
      { id: "B", text: "包层" },
      { id: "C", text: "涂覆层" },
      { id: "D", text: "外包层" }
    ],
    explanation: ""
  },
  "fiber-transmission-038": {
    stem: "发光二极管的（ ），在光纤传输距离要求不高、码元速率要求不高的数字光纤通信系统中应用最为广泛。",
    options: [
      { id: "A", text: "制造成本低廉" },
      { id: "B", text: "制造工艺简单" },
      { id: "C", text: "可靠性好" },
      { id: "D", text: "容量大" }
    ],
    explanation: ""
  },
  "fiber-transmission-039": {
    stem: "激光器由（ ）构成。",
    options: [
      { id: "A", text: "工作物质" },
      { id: "B", text: "激励源" },
      { id: "C", text: "光学谐振腔" },
      { id: "D", text: "接收源" }
    ],
    explanation: ""
  },
  "fiber-transmission-040": {
    stem: "光发射机由（ ）组成。",
    options: [
      { id: "A", text: "光源" },
      { id: "B", text: "驱动器" },
      { id: "C", text: "调制器" },
      { id: "D", text: "解调器" }
    ],
    explanation: ""
  },
  "fiber-transmission-041": {
    stem: "按照光缆内护层材料性质不同，光缆可以分为（ ）",
    options: [
      { id: "A", text: "聚乙烯护层普通光缆" },
      { id: "B", text: "聚氯乙烯护层阻燃光缆" },
      { id: "C", text: "尼龙防蚁防鼠光缆" },
      { id: "D", text: "管道光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-042": {
    stem: "光纤按材料分类，可以分为（ ）",
    options: [
      { id: "A", text: "石英（玻璃）系列光纤" },
      { id: "B", text: "塑料光纤" },
      { id: "C", text: "液体（氟化物）光纤" },
      { id: "D", text: "铁质光纤" }
    ],
    explanation: ""
  },
  "fiber-transmission-043": {
    stem: "F-P腔激光器从结构上划分，可分为（ ）",
    options: [
      { id: "A", text: "同质结半导体激光器" },
      { id: "B", text: "单异质结半导体激光器" },
      { id: "C", text: "双异质结半导体激光器" },
      { id: "D", text: "双质结半导体激光器" }
    ],
    explanation: ""
  },
  "fiber-transmission-044": {
    stem: "按照光缆内光纤的芯数多少，光缆可以分为（ ）",
    options: [
      { id: "A", text: "单芯光缆" },
      { id: "B", text: "双芯光缆" },
      { id: "C", text: "四芯光缆" },
      { id: "D", text: "十芯光缆" }
    ],
    explanation: ""
  },
  "fiber-transmission-045": {
    stem: "光开关按其功能分类，可以分为（ ）",
    options: [
      { id: "A", text: "机械式光开关" },
      { id: "B", text: "电子式开关" },
      { id: "C", text: "手动式开关" },
      { id: "D", text: "自动式开关" }
    ],
    explanation: ""
  },
  "fiber-transmission-046": {
    stem: "色度色散包括（ ）",
    options: [
      { id: "A", text: "材料色散" },
      { id: "B", text: "波导色散" },
      { id: "C", text: "模式色散" },
      { id: "D", text: "偏振模色散" }
    ],
    explanation: ""
  },
  "fiber-transmission-047": {
    stem: "光纤按传输波长分类，可以分为（ ）",
    options: [
      { id: "A", text: "短波长光纤" },
      { id: "B", text: "长波长光纤" },
      { id: "C", text: "紧套光纤" },
      { id: "D", text: "松套光纤" }
    ],
    explanation: "光纤按传输波长分类，可分为短波长光纤、长波长光纤两大类。"
  },
  "fiber-transmission-048": {
    stem: "光纤传输，即以光导纤维为介质进行的（ ）传输。",
    options: [
      { id: "A", text: "数据" },
      { id: "B", text: "信号" },
      { id: "C", text: "数字信号" },
      { id: "D", text: "模拟信号" }
    ],
    explanation: ""
  },
  "fiber-transmission-049": {
    stem: "多模光纤的纤芯直径为（ ）。",
    options: [
      { id: "A", text: "50μm" },
      { id: "B", text: "62.5μm" },
      { id: "C", text: "60.5μm" },
      { id: "D", text: "52.5μm" }
    ],
    explanation: ""
  },
  "fiber-transmission-050": {
    stem: "半导体激光器在（ ）数字光纤通信系统中应用最为广泛。",
    options: [
      { id: "A", text: "高速率" },
      { id: "B", text: "大容量" },
      { id: "C", text: "可靠性" },
      { id: "D", text: "小容量" }
    ],
    explanation: ""
  },
  "fiber-transmission-052": {
    stem: "在多模光纤中，模式色散是其主要的色散因素。",
    explanation: ""
  },
  "fiber-transmission-053": {
    stem: "CWDM可采用不带冷却器的半导体激光器。",
    explanation: ""
  },
  "fiber-transmission-083": {
    stem: "SDH的第一级传输速率为155.52Mbit/s，在北美地区常常采用SDH。",
    explanation: "SDH的第一级传输速率为155.52Mbit/s。在北美以外的其他国家和地区常常采用SDH。"
  },
  "fiber-transmission-096": {
    stem: "帧结构是由段开销和有效信息载荷组成的。",
    explanation: ""
  }
};

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

  return applyManualFix({
    id: `fiber-transmission-${String(index + 1).padStart(3, "0")}`,
    type,
    stem: cleanupStem(extractStem(normalizedText, type)),
    options: extractOptions(normalizedText, type),
    answer,
    explanation: cleanupExplanation(extractExplanation(normalizedText)),
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
  });
}

function applyManualFix(question) {
  const fix = manualQuestionFixes[question.id];
  if (!fix) {
    return cleanupQuestion(question);
  }
  return cleanupQuestion({
    ...question,
    ...fix,
    options: fix.options ?? question.options,
    answer: fix.answer ?? question.answer,
    explanation: fix.explanation ?? question.explanation
  });
}

function cleanupQuestion(question) {
  return {
    ...question,
    stem: cleanupStem(question.stem),
    explanation: cleanupExplanation(question.explanation)
  };
}

function cleanupStem(value) {
  return String(value ?? "")
    .replace(/D素/g, "因素")
    .replace(/囗/g, "口")
    .replace(/(\d)·(\d)/g, "$1.$2")
    .replace(/\d+\/108$/g, "")
    .replace(/94\d+\/108$/g, "")
    .replace(/[（(]\s*$/g, "")
    .replace(/0$/g, "")
    .trim();
}

function cleanupExplanation(value) {
  const cleaned = String(value ?? "")
    .replace(/^我做过的次数\d*/g, "")
    .replace(/^\/108$/g, "")
    .replace(/\d+\/108/g, "")
    .replace(/反馈纠错.*$/g, "")
    .trim();
  return /^(刷题笔记|分享|反纠错|错误次数|答题卡|收藏)?$/.test(cleaned) ? "" : cleaned;
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
