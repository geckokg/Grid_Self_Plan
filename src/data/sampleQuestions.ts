import type { Question, QuestionBankManifest } from "../types/domain";

export const SEED_VERSION = "fiber-transmission-2026-06-23-clean";
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
  "exam-culture-001",
  "fiber-transmission-001",
  "fiber-transmission-002",
  "fiber-transmission-003",
  "fiber-transmission-004",
  "fiber-transmission-005",
  "fiber-transmission-006",
  "fiber-transmission-007",
  "fiber-transmission-008",
  "fiber-transmission-009",
  "fiber-transmission-010"
];

export const sampleQuestions: Question[] = [
  {
    "id": "fiber-transmission-001",
    "type": "single",
    "stem": "下列关于光纤通信的优势的说法，不正确的是（ ）",
    "options": [
      {
        "id": "A",
        "text": "损耗低，传输容量大"
      },
      {
        "id": "B",
        "text": "资源丰富，成本低廉"
      },
      {
        "id": "C",
        "text": "通信质量高"
      },
      {
        "id": "D",
        "text": "抗电磁，抗雷击，抗雨水，保密性好"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212153_457_44.jpg",
    "tags": [
      "第1章",
      "原题1"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-002",
    "type": "single",
    "stem": "光纤通信的原理是光的（ ）",
    "options": [
      {
        "id": "A",
        "text": "折射原理"
      },
      {
        "id": "B",
        "text": "全反射原理"
      },
      {
        "id": "C",
        "text": "透视原理"
      },
      {
        "id": "D",
        "text": "反射原理"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212154_458_44.jpg",
    "tags": [
      "第1章",
      "原题2"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-003",
    "type": "single",
    "stem": "多模光纤的波长使用范围是（ ）",
    "options": [
      {
        "id": "A",
        "text": "850nm、1550nm"
      },
      {
        "id": "B",
        "text": "1310nm、1550nm"
      },
      {
        "id": "C",
        "text": "800nm、1800nm"
      },
      {
        "id": "D",
        "text": "1310nm、1800nm"
      }
    ],
    "answer": [
      "A"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212155_459_44.jpg",
    "tags": [
      "第1章",
      "原题3"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-004",
    "type": "single",
    "stem": "（ ）是用来完成各种速率接口适配功能的信息结构单元。",
    "options": [
      {
        "id": "A",
        "text": "虚容器"
      },
      {
        "id": "B",
        "text": "容器"
      },
      {
        "id": "C",
        "text": "支路单元"
      },
      {
        "id": "D",
        "text": "管理单元"
      }
    ],
    "answer": [
      "A"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212156_460_44.jpg",
    "tags": [
      "第1章",
      "原题4"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-005",
    "type": "single",
    "stem": "光接收机的主要质量指标是灵敏度，影响灵敏度的主要因素是（ ）",
    "options": [
      {
        "id": "A",
        "text": "光接收机接收光信号的强弱"
      },
      {
        "id": "B",
        "text": "光接收机的放大器的倍数"
      },
      {
        "id": "C",
        "text": "光接收机的噪声"
      },
      {
        "id": "D",
        "text": "光信号的噪声"
      }
    ],
    "answer": [
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212159_461_44.jpg",
    "tags": [
      "第1章",
      "原题5"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-006",
    "type": "single",
    "stem": "下列说法正确的是（ ）",
    "options": [
      {
        "id": "A",
        "text": "单模光能在多模光纤中传输，多模光能在单模光纤中传输"
      },
      {
        "id": "B",
        "text": "单模光能在多模光纤中传输，但多模光不能在单模光纤中传输"
      },
      {
        "id": "C",
        "text": "单模光不能在多模光纤中传输，但多模光能在单模光纤中传输"
      },
      {
        "id": "D",
        "text": "单模光不能在多模光纤中传输，多模光不能在单模光纤中传输"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "单模光纤只能在指定波长下传输一种模式的光。",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212201_462_44.jpg",
    "tags": [
      "第1章",
      "原题6"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-007",
    "type": "single",
    "stem": "光隔离器的作用是（ ）",
    "options": [
      {
        "id": "A",
        "text": "调节光信号的功率大小"
      },
      {
        "id": "B",
        "text": "保证光信号只能正向传输"
      },
      {
        "id": "C",
        "text": "分离同向传输的各路光信号"
      },
      {
        "id": "D",
        "text": "将光纤中传输的监控信号隔离开"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212203_463_44.jpg",
    "tags": [
      "第1章",
      "原题7"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-008",
    "type": "single",
    "stem": "下列说法正确的是（ ）",
    "options": [
      {
        "id": "A",
        "text": "光纤的损耗决定光纤通信系统的通信容量"
      },
      {
        "id": "B",
        "text": "光纤的损耗决定光纤通信系统的传输速率"
      },
      {
        "id": "C",
        "text": "光纤的损耗决定光纤通信系统的传输距离"
      },
      {
        "id": "D",
        "text": "光纤的损耗决定光纤通信系统的传输模式"
      }
    ],
    "answer": [
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212205_464_44.jpg",
    "tags": [
      "第1章",
      "原题8"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-009",
    "type": "single",
    "stem": "下列不属于准同步数字复接体系的缺点是（ ）",
    "options": [
      {
        "id": "A",
        "text": "PDH为语音业务设计，不适用现代通信宽带化、智能化和个人化的发展趋势"
      },
      {
        "id": "B",
        "text": "具有强大的网络管理功能"
      },
      {
        "id": "C",
        "text": "标准不统一，目前世界上有三种不同地区性的标准，三者互不兼容"
      },
      {
        "id": "D",
        "text": "PDH传输线路主要是点对点连接，不适应现代通信网灵活的拓扑结构"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212207_465_44.jpg",
    "tags": [
      "第1章",
      "原题9"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-010",
    "type": "single",
    "stem": "光纤的色散特性是光纤线路的重要参数。在多模光纤中，（ ）是主要的色散成分。",
    "options": [
      {
        "id": "A",
        "text": "材料色散"
      },
      {
        "id": "B",
        "text": "模式色散"
      },
      {
        "id": "C",
        "text": "波导色散"
      },
      {
        "id": "D",
        "text": "极化色散"
      }
    ],
    "answer": [
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/1-10/微信图片_20260618212209_466_44.jpg",
    "tags": [
      "第1章",
      "原题10"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-011",
    "type": "judge",
    "stem": "光放大器可以代替再生中继器。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_001_IMG_2631.png",
    "tags": [
      "第1章",
      "原题10"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-012",
    "type": "judge",
    "stem": "最大接收角越大，即纤芯与包层的折射率之差越大，光纤捕捉光线的能力越弱，这种能力用数值孔径NA来表示。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_002_IMG_2630.png",
    "tags": [
      "第1章",
      "原题9"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-013",
    "type": "judge",
    "stem": "数字光纤传输系统中常采用的码型是3B4B码和插入码。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "光纤线路中传输的码型不是输入接口译码产生的NRZ码，而是要先进行码型变换。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_003_IMG_2629.png",
    "tags": [
      "第1章",
      "原题8"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-014",
    "type": "judge",
    "stem": "大家每天使用的电话与本地交换局间的连接属于线性总线型网络结构。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "电话与本地交换局间的连接属于星型结构。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_004_IMG_2628.png",
    "tags": [
      "第1章",
      "原题14"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-015",
    "type": "judge",
    "stem": "串口通信中8个bit也就是8个0或者1为1字节，可以表示成2个字符。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_005_IMG_2627.png",
    "tags": [
      "第1章",
      "原题6"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-016",
    "type": "judge",
    "stem": "滤波器属无源器件，故从严格意义上讲，可调谐滤波器属于无源器件。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_006_IMG_2626.png",
    "tags": [
      "第1章",
      "原题5"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-017",
    "type": "judge",
    "stem": "光纤的机械特性主要包括耐侧压力、抗拉强度、弯曲以及扭绞性能等，耐侧压力是目前使用者最关心的问题。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "使用者最关心的是抗拉强度。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_007_IMG_2625.png",
    "tags": [
      "第1章",
      "原题4"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-018",
    "type": "judge",
    "stem": "EDFA可以放大全波长的光。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_008_IMG_2624.png",
    "tags": [
      "第1章",
      "原题3"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-019",
    "type": "judge",
    "stem": "EDFA工作波长为1510nm，与光纤的低损耗波段一致。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_009_IMG_2623.png",
    "tags": [
      "第1章",
      "原题2"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-020",
    "type": "judge",
    "stem": "在OTN网络共定义了两种保护方式，即线性保护和子网连接保护。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_010_IMG_2622.png",
    "tags": [
      "第1章",
      "原题1"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-021",
    "type": "multiple",
    "stem": "光纤通信系统中，线性损耗主要包括（ ）",
    "options": [
      {
        "id": "A",
        "text": "瑞利散射"
      },
      {
        "id": "B",
        "text": "受激拉曼散射"
      },
      {
        "id": "C",
        "text": "受激布里渊散射"
      },
      {
        "id": "D",
        "text": "材料不均匀引起的散射"
      }
    ],
    "answer": [
      "A",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_011_IMG_2621.png",
    "tags": [
      "第1章",
      "原题30"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-022",
    "type": "multiple",
    "stem": "MMF按折射率分布进行分类时，有哪两种？",
    "options": [
      {
        "id": "A",
        "text": "渐变型"
      },
      {
        "id": "B",
        "text": "随机型"
      },
      {
        "id": "C",
        "text": "曲线型"
      },
      {
        "id": "D",
        "text": "阶跃型"
      }
    ],
    "answer": [
      "A",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_012_IMG_2620.png",
    "tags": [
      "第1章",
      "原题22"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-023",
    "type": "multiple",
    "stem": "光纤放大器又可分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "非线性光纤放大器"
      },
      {
        "id": "B",
        "text": "线性光纤放大器"
      },
      {
        "id": "C",
        "text": "掺铒光纤放大器"
      },
      {
        "id": "D",
        "text": "波分复用放大器"
      }
    ],
    "answer": [
      "A",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_013_IMG_2619.png",
    "tags": [
      "第1章",
      "原题28"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-024",
    "type": "multiple",
    "stem": "下列关于光纤通信特点的描述中错误的有（ ）",
    "options": [
      {
        "id": "A",
        "text": "光纤通信的传输频带宽，通信容量小，可以容纳很少的光信号"
      },
      {
        "id": "B",
        "text": "光纤通信的光中继器可以中继的距离较长，可以很长时间地补偿信号衰减和纠正信号失真"
      },
      {
        "id": "C",
        "text": "光纤通信的信道保密性能不好，信道串扰（同一系统内不同信道之间的干扰）大"
      },
      {
        "id": "D",
        "text": "光纤通信适应能力强，能快速应对突发情况"
      }
    ],
    "answer": [
      "A",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_014_IMG_2618.png",
    "tags": [
      "第1章",
      "原题24"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-025",
    "type": "multiple",
    "stem": "按目前通信所用的不同类型的光缆，光缆可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "设备内光缆"
      },
      {
        "id": "B",
        "text": "海底光缆"
      },
      {
        "id": "C",
        "text": "特种光缆"
      },
      {
        "id": "D",
        "text": "室内外光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_015_IMG_2617.png",
    "tags": [
      "第1章",
      "原题26"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-026",
    "type": "multiple",
    "stem": "激光器的参数主要有（ ）",
    "options": [
      {
        "id": "A",
        "text": "平均衰减系数"
      },
      {
        "id": "B",
        "text": "增益系数"
      },
      {
        "id": "C",
        "text": "阈值条件"
      },
      {
        "id": "D",
        "text": "谐振频率"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_016_IMG_2616.png",
    "tags": [
      "第1章",
      "原题25"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-027",
    "type": "multiple",
    "stem": "半导体激光器的特性有（ ）",
    "options": [
      {
        "id": "A",
        "text": "阈值特性"
      },
      {
        "id": "B",
        "text": "光谱特性"
      },
      {
        "id": "C",
        "text": "温度特性"
      },
      {
        "id": "D",
        "text": "转换效率"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_017_IMG_2615.png",
    "tags": [
      "第1章",
      "原题24"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-028",
    "type": "multiple",
    "stem": "SDH的复用单元主要由（ ）、虚容器、支路单元与支路单元组、管理单元与管理单元组、同步传输模块等模块组成。",
    "options": [
      {
        "id": "A",
        "text": "容器"
      },
      {
        "id": "B",
        "text": "虚容器"
      },
      {
        "id": "C",
        "text": "支路单元与支路单元组"
      },
      {
        "id": "D",
        "text": "管理单元与管理单元组"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_018_IMG_2614.png",
    "tags": [
      "第1章",
      "原题23"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-029",
    "type": "multiple",
    "stem": "SDH技术是一套完整的标准化数字信号同步技术，可以完成信息的（ ）",
    "options": [
      {
        "id": "A",
        "text": "同步"
      },
      {
        "id": "B",
        "text": "传输"
      },
      {
        "id": "C",
        "text": "复用"
      },
      {
        "id": "D",
        "text": "分插分叉连接"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_019_IMG_2613.png",
    "tags": [
      "第1章",
      "原题29"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-030",
    "type": "multiple",
    "stem": "发光二极管的工作特性包括（ ）",
    "options": [
      {
        "id": "A",
        "text": "光谱特性"
      },
      {
        "id": "B",
        "text": "输出光功率特性"
      },
      {
        "id": "C",
        "text": "温度特性"
      },
      {
        "id": "D",
        "text": "耦合效率特性"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_020_IMG_2612.png",
    "tags": [
      "第1章",
      "原题21"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-031",
    "type": "multiple",
    "stem": "光纤的机械特性主要包括（ ）",
    "options": [
      {
        "id": "A",
        "text": "耐侧压力"
      },
      {
        "id": "B",
        "text": "抗拉强度"
      },
      {
        "id": "C",
        "text": "弯曲"
      },
      {
        "id": "D",
        "text": "扭绞性能"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_021_IMG_2611.png",
    "tags": [
      "第1章",
      "原题20"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-032",
    "type": "multiple",
    "stem": "SDH网常见的网元主要有（ ）",
    "options": [
      {
        "id": "A",
        "text": "终端复用器"
      },
      {
        "id": "B",
        "text": "分插复用器"
      },
      {
        "id": "C",
        "text": "同步数字交叉连接设备"
      },
      {
        "id": "D",
        "text": "再生中继器"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "SDH网常见的网元主要有终端复用器（TM）、分插复用器（ADM）、同步数字交叉连接设备（SDXC）、再生中继器（REG）。",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_022_IMG_2610.png",
    "tags": [
      "第1章",
      "原题19"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-033",
    "type": "multiple",
    "stem": "光缆的典型结构有（ ）",
    "options": [
      {
        "id": "A",
        "text": "层绞式光缆"
      },
      {
        "id": "B",
        "text": "骨架式光缆"
      },
      {
        "id": "C",
        "text": "束管式光缆"
      },
      {
        "id": "D",
        "text": "带状光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_023_IMG_2609.png",
    "tags": [
      "第1章",
      "原题18"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-034",
    "type": "multiple",
    "stem": "SDH网络存在着一些问题，比如（ ）",
    "options": [
      {
        "id": "A",
        "text": "频带利用率低"
      },
      {
        "id": "B",
        "text": "抖动性能劣化"
      },
      {
        "id": "C",
        "text": "软件权限过大"
      },
      {
        "id": "D",
        "text": "定时信息传送困难"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_024_IMG_2608.png",
    "tags": [
      "第1章",
      "原题17"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-035",
    "type": "multiple",
    "stem": "光缆可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "市话光缆"
      },
      {
        "id": "B",
        "text": "长途光缆"
      },
      {
        "id": "C",
        "text": "海底光缆"
      },
      {
        "id": "D",
        "text": "用户光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_025_IMG_2607.png",
    "tags": [
      "第1章",
      "原题16"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-036",
    "type": "multiple",
    "stem": "按照光缆内光纤的套塑方法不同，光缆可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "紧套光缆"
      },
      {
        "id": "B",
        "text": "松套光缆"
      },
      {
        "id": "C",
        "text": "束管式光缆"
      },
      {
        "id": "D",
        "text": "带状多芯单元光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_026_IMG_2606.png",
    "tags": [
      "第1章",
      "原题15"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-037",
    "type": "multiple",
    "stem": "光纤由（ ）构成。",
    "options": [
      {
        "id": "A",
        "text": "纤芯"
      },
      {
        "id": "B",
        "text": "包层"
      },
      {
        "id": "C",
        "text": "涂覆层"
      },
      {
        "id": "D",
        "text": "外包层"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_027_IMG_2605.png",
    "tags": [
      "第1章",
      "原题14"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-038",
    "type": "multiple",
    "stem": "发光二极管的（ ），在光纤传输距离要求不高、码元速率要求不高的数字光纤通信系统中应用最为广泛。",
    "options": [
      {
        "id": "A",
        "text": "制造成本低廉"
      },
      {
        "id": "B",
        "text": "制造工艺简单"
      },
      {
        "id": "C",
        "text": "可靠性好"
      },
      {
        "id": "D",
        "text": "容量大"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_028_IMG_2604.png",
    "tags": [
      "第1章",
      "原题38"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-039",
    "type": "multiple",
    "stem": "激光器由（ ）构成。",
    "options": [
      {
        "id": "A",
        "text": "工作物质"
      },
      {
        "id": "B",
        "text": "激励源"
      },
      {
        "id": "C",
        "text": "光学谐振腔"
      },
      {
        "id": "D",
        "text": "接收源"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_029_IMG_2603.png",
    "tags": [
      "第1章",
      "原题12"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-040",
    "type": "multiple",
    "stem": "光发射机由（ ）组成。",
    "options": [
      {
        "id": "A",
        "text": "光源"
      },
      {
        "id": "B",
        "text": "驱动器"
      },
      {
        "id": "C",
        "text": "调制器"
      },
      {
        "id": "D",
        "text": "解调器"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_030_IMG_2602.png",
    "tags": [
      "第1章",
      "原题11"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-041",
    "type": "multiple",
    "stem": "按照光缆内护层材料性质不同，光缆可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "聚乙烯护层普通光缆"
      },
      {
        "id": "B",
        "text": "聚氯乙烯护层阻燃光缆"
      },
      {
        "id": "C",
        "text": "尼龙防蚁防鼠光缆"
      },
      {
        "id": "D",
        "text": "管道光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_031_IMG_2601.png",
    "tags": [
      "第1章",
      "原题10"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-042",
    "type": "multiple",
    "stem": "光纤按材料分类，可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "石英（玻璃）系列光纤"
      },
      {
        "id": "B",
        "text": "塑料光纤"
      },
      {
        "id": "C",
        "text": "液体（氟化物）光纤"
      },
      {
        "id": "D",
        "text": "铁质光纤"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_032_IMG_2600.png",
    "tags": [
      "第1章",
      "原题9"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-043",
    "type": "multiple",
    "stem": "F-P腔激光器从结构上划分，可分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "同质结半导体激光器"
      },
      {
        "id": "B",
        "text": "单异质结半导体激光器"
      },
      {
        "id": "C",
        "text": "双异质结半导体激光器"
      },
      {
        "id": "D",
        "text": "双质结半导体激光器"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_033_IMG_2599.png",
    "tags": [
      "第1章",
      "原题8"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-044",
    "type": "multiple",
    "stem": "按照光缆内光纤的芯数多少，光缆可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "单芯光缆"
      },
      {
        "id": "B",
        "text": "双芯光缆"
      },
      {
        "id": "C",
        "text": "四芯光缆"
      },
      {
        "id": "D",
        "text": "十芯光缆"
      }
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_034_IMG_2598.png",
    "tags": [
      "第1章",
      "原题44"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-045",
    "type": "multiple",
    "stem": "光开关按其功能分类，可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "机械式光开关"
      },
      {
        "id": "B",
        "text": "电子式开关"
      },
      {
        "id": "C",
        "text": "手动式开关"
      },
      {
        "id": "D",
        "text": "自动式开关"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_035_IMG_2597.png",
    "tags": [
      "第1章",
      "原题6"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-046",
    "type": "multiple",
    "stem": "色度色散包括（ ）",
    "options": [
      {
        "id": "A",
        "text": "材料色散"
      },
      {
        "id": "B",
        "text": "波导色散"
      },
      {
        "id": "C",
        "text": "模式色散"
      },
      {
        "id": "D",
        "text": "偏振模色散"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_036_IMG_2596.png",
    "tags": [
      "第1章",
      "原题5"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-047",
    "type": "multiple",
    "stem": "光纤按传输波长分类，可以分为（ ）",
    "options": [
      {
        "id": "A",
        "text": "短波长光纤"
      },
      {
        "id": "B",
        "text": "长波长光纤"
      },
      {
        "id": "C",
        "text": "紧套光纤"
      },
      {
        "id": "D",
        "text": "松套光纤"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "光纤按传输波长分类，可分为短波长光纤、长波长光纤两大类。",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_037_IMG_2595.png",
    "tags": [
      "第1章",
      "原题4"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-048",
    "type": "multiple",
    "stem": "光纤传输，即以光导纤维为介质进行的（ ）传输。",
    "options": [
      {
        "id": "A",
        "text": "数据"
      },
      {
        "id": "B",
        "text": "信号"
      },
      {
        "id": "C",
        "text": "数字信号"
      },
      {
        "id": "D",
        "text": "模拟信号"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_038_IMG_2594.png",
    "tags": [
      "第1章",
      "原题3"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-049",
    "type": "multiple",
    "stem": "多模光纤的纤芯直径为（ ）。",
    "options": [
      {
        "id": "A",
        "text": "50μm"
      },
      {
        "id": "B",
        "text": "62.5μm"
      },
      {
        "id": "C",
        "text": "60.5μm"
      },
      {
        "id": "D",
        "text": "52.5μm"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_039_IMG_2593.png",
    "tags": [
      "第1章",
      "原题2"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-050",
    "type": "multiple",
    "stem": "半导体激光器在（ ）数字光纤通信系统中应用最为广泛。",
    "options": [
      {
        "id": "A",
        "text": "高速率"
      },
      {
        "id": "B",
        "text": "大容量"
      },
      {
        "id": "C",
        "text": "可靠性"
      },
      {
        "id": "D",
        "text": "小容量"
      }
    ],
    "answer": [
      "A",
      "B"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "medium",
    "source": "图片导入：quest_pic/光纤传输技术/11-50/20260623094732_040_IMG_2592.png",
    "tags": [
      "第1章",
      "原题1"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-051",
    "type": "judge",
    "stem": "电话网是开放电话业务为广大用户服务的通信网",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_001_IMG_2689.png",
    "tags": [
      "第1章",
      "原题67"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-052",
    "type": "judge",
    "stem": "在多模光纤中，模式色散是其主要的色散因素。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_002_IMG_2690.png",
    "tags": [
      "第1章",
      "原题68"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-053",
    "type": "judge",
    "stem": "CWDM可采用不带冷却器的半导体激光器。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_003_IMG_2687.png",
    "tags": [
      "第1章",
      "原题53"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-054",
    "type": "judge",
    "stem": "PIN光检测器反向偏压可以取较小的值，D为其耗尽区厚度基本上是由《区的宽度决定的。（曰",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_004_IMG_2686.png",
    "tags": [
      "第1章",
      "原题64"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-055",
    "type": "judge",
    "stem": "半导体激光器可分为F一P腔激光器和分布反馈型激光器。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_005_IMG_2688.png",
    "tags": [
      "第1章",
      "原题66"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-056",
    "type": "judge",
    "stem": "光发射机是实现电/光转换的光端机。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_006_IMG_2684.png",
    "tags": [
      "第1章",
      "原题62"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-057",
    "type": "judge",
    "stem": "光纤通信系统最适合的掺杂光纤放大器是工作在1550nm的掺铒光纤放大器和工作在1300nm的掺镨光纤放大器。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_007_IMG_2683.png",
    "tags": [
      "第1章",
      "原题61"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-058",
    "type": "judge",
    "stem": "电光效应、热光效应等是利用材料的折射率随电压和温度的变化而变化的特性，从而实现光开关器件。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_008_IMG_2682.png",
    "tags": [
      "第1章",
      "原题60"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-059",
    "type": "judge",
    "stem": "半导体光放大器与光纤的耦合损耗大，由于增益与偏振态、温度等因素有关，D此稳定性差；在高速光信号的放大方面，仍存在问题；输出功率小，噪声系统较大。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_009_IMG_2681.png",
    "tags": [
      "第1章",
      "原题59"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-060",
    "type": "judge",
    "stem": "OTN与SDH传送网的主要差异在于复用技术不同，但在很多方面又很相似。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_010_IMG_2680.png",
    "tags": [
      "第1章",
      "原题58"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-061",
    "type": "judge",
    "stem": "激光器的横模决定了激光光束的空间分布，它直接影响到器件和光纤的耦合效率。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_011_IMG_2679.png",
    "tags": [
      "第1章",
      "原题57"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-062",
    "type": "judge",
    "stem": "半导体激光器指的是用半导体材料作为激活物质的激光器。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_012_IMG_2685.png",
    "tags": [
      "第1章",
      "原题63"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-063",
    "type": "judge",
    "stem": "光纤有着不同的结构形式。通信用的光纤绝大多数是用石英材料做成的横截面很小的双层同心圆柱体，外层对光的折射率比内层对光的折射率低。（曰",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_013_IMG_2678.png",
    "tags": [
      "第1章",
      "原题56"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-064",
    "type": "judge",
    "stem": "光纤通信的传输频带宽，通信容量大，可以容纳众多光信号。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_014_IMG_2677.png",
    "tags": [
      "第1章",
      "原题55"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-065",
    "type": "judge",
    "stem": "段开销分为SOH和LOH，前者占前3行，后者占5、9行。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_015_IMG_2676.png",
    "tags": [
      "第1章",
      "原题54"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-066",
    "type": "judge",
    "stem": "SDH的复用单元主要由容器℃）、虚容器（\\/C）、支路单元与支路单元组、管理单元与管理单元组、同步传输模块等模块组成。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_016_IMG_2675.png",
    "tags": [
      "第1章",
      "原题53"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-067",
    "type": "judge",
    "stem": "OTUk电交叉设备可完成ODUk级别的电路交叉功厶匕目匕。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_017_IMG_2674.png",
    "tags": [
      "第1章",
      "原题52"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-068",
    "type": "judge",
    "stem": "光中继器主要有两个作用：一是用于补偿光信号在光纤中传输时受到的衰减；另一个作用是对波形失真的脉冲进行整形。（曰",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_018_IMG_2673.png",
    "tags": [
      "第1章",
      "原题51"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-069",
    "type": "judge",
    "stem": "电话网从设备上讲是由交换机、传输电路佣户线和局间中继电路）和用户终端设备（电话机）三分部组成的。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_019_IMG_2672.png",
    "tags": [
      "第1章",
      "原题50"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-070",
    "type": "judge",
    "stem": "激光器通常指的是能够产生激光的自激振荡器。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_020_IMG_2671.png",
    "tags": [
      "第1章",
      "原题49"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-071",
    "type": "judge",
    "stem": "TDM技术可以克服WDM技术中的一些固有限制，如光放大器级联导致的增益谱不平坦、信道串扰问题，非线性效应的影响以及对光源波长稳定性的要",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_021_IMG_2670.png",
    "tags": [
      "第1章",
      "原题48"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-072",
    "type": "judge",
    "stem": "光通道层所接收的信号来自电通道层，它是OTN的主要功能的载体，由光通道净荷单元、光通道数据单元、光通道传送单元三个电域子层和光域的光信道组",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_022_IMG_2669.png",
    "tags": [
      "第1章",
      "原题47"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-073",
    "type": "judge",
    "stem": "光纤光缆体积小、重量轻，施工和维护简单。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_023_IMG_2668.png",
    "tags": [
      "第1章",
      "原题46"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-074",
    "type": "judge",
    "stem": "光中继器由光检测器、光源和判决再生电路组成。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_024_IMG_2667.png",
    "tags": [
      "第1章",
      "原题45"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-075",
    "type": "judge",
    "stem": "光缆的典型结构有层绞式光缆、骨架式光缆、束管式光缆、带状光缆、单芯光缆、特殊光缆等。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_025_IMG_2666.png",
    "tags": [
      "第1章",
      "原题44"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-076",
    "type": "judge",
    "stem": "光纤中的孤子是光纤色散与非线性相互作用的产物。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_026_IMG_2665.png",
    "tags": [
      "第1章",
      "原题43"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-077",
    "type": "judge",
    "stem": "光纤的色散可分为模式色散、色度色散、振模色",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_027_IMG_2664.png",
    "tags": [
      "第1章",
      "原题42"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-078",
    "type": "judge",
    "stem": "模拟信号转换为数字信号后会有精度的衰减，这是由于量化过程造成的。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_028_IMG_2663.png",
    "tags": [
      "第1章",
      "原题41"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-079",
    "type": "judge",
    "stem": "光纤传输一般使用光缆进行，单根光导纤维的数据传输速率能达几Gbps，在不使用中继器的情况下，传输距离能达几十公里。（正确0错误",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_029_IMG_2662.png",
    "tags": [
      "第1章",
      "原题40"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-080",
    "type": "judge",
    "stem": "散粒噪声属于白噪声，为了降低它的影响，通常在判决电路之前使用低通滤波器，使得信道的带宽变窄。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_030_IMG_2661.png",
    "tags": [
      "第1章",
      "原题39"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-081",
    "type": "judge",
    "stem": "SDH环形网的一个突出优点是具有自愈能力。正确0错误",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "true"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_031_IMG_2660.png",
    "tags": [
      "第1章",
      "原题38"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-082",
    "type": "judge",
    "stem": "光复用段层网络应完成光通道适配、光通道终端、光通道交叉连接和对光连接的监控功能。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_032_IMG_2659.png",
    "tags": [
      "第1章",
      "原题37"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-083",
    "type": "judge",
    "stem": "SDH的第一级传输速率为155.52Mbit/s，在北美地区常常采用SDH。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "SDH的第一级传输速率为155.52Mbit/s。在北美以外的其他国家和地区常常采用SDH。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_034_IMG_2657.png",
    "tags": [
      "第1章",
      "原题36"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-084",
    "type": "judge",
    "stem": "激光振荡的相位条件为谐振腔的长度是激光波长的整数倍。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_035_IMG_2656.png",
    "tags": [
      "第1章",
      "原题35"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-085",
    "type": "judge",
    "stem": "SDH环型网的一个缺点是没有自愈能力。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_036_IMG_2655.png",
    "tags": [
      "第1章",
      "原题34"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-086",
    "type": "judge",
    "stem": "光传送网分为光通道层、光复用段层两个独立的层网络。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_037_IMG_2654.png",
    "tags": [
      "第1章",
      "原题33"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-087",
    "type": "judge",
    "stem": "SDH环形网的某节点发生故障或光缆中断时，不能维持通信能力。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_038_IMG_2653.png",
    "tags": [
      "第1章",
      "原题32"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-088",
    "type": "judge",
    "stem": "光纤通信系统一般由光发射机、光纤光缆、光纤中继器、光接收机四部分构成。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_039_IMG_2652.png",
    "tags": [
      "第1章",
      "原题31"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-089",
    "type": "judge",
    "stem": "30℃WDM是密集波分复用。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_040_IMG_2651.png",
    "tags": [
      "第1章",
      "原题89"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-090",
    "type": "judge",
    "stem": "光纤的温度特性，主要是指温度的高低对光纤损耗的影响。通常温度越高，光纤的损耗越大；温度越低，光纤的损耗越小。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_041_IMG_2650.png",
    "tags": [
      "第1章",
      "原题29"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-091",
    "type": "judge",
    "stem": "光隔离器的作用是使光转换效率更高。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "光隔离器允许单向光通过。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_042_IMG_2649.png",
    "tags": [
      "第1章",
      "原题28"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-092",
    "type": "judge",
    "stem": "在没有到达阈值电流时，LD发的光也是激光。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_043_IMG_2648.png",
    "tags": [
      "第1章",
      "原题27"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-093",
    "type": "judge",
    "stem": "固体光开关的优点是插入损耗小，串扰小，适合各种光纤，技术成熟；缺点是开关速度慢。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_044_IMG_2647.png",
    "tags": [
      "第1章",
      "原题26"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-094",
    "type": "judge",
    "stem": "前置放大器置于光发射机前面，放大非常微弱的光信号，以改善灵敏度。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_045_IMG_2646.png",
    "tags": [
      "第1章",
      "原题25"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-095",
    "type": "judge",
    "stem": "表示光纤色散程度的物理量是速度差。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "表示光纤色散程度的物理量是时延差。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_046_IMG_2645.png",
    "tags": [
      "第1章",
      "原题24"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-096",
    "type": "judge",
    "stem": "帧结构是由段开销和有效信息载荷组成的。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_047_IMG_2644.png",
    "tags": [
      "第1章",
      "原题23"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-097",
    "type": "judge",
    "stem": "光中继器是在短距离的光纤通信系统中补偿光缆线路光信号的损耗和消除信号畸变及噪声影响的设备。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_048_IMG_2643.png",
    "tags": [
      "第1章",
      "原题22"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-098",
    "type": "judge",
    "stem": "延时差指的是传输同样的距离时，相同频率的信号成分所需的时间之差。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_049_IMG_2642.png",
    "tags": [
      "第1章",
      "原题21"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-099",
    "type": "judge",
    "stem": "光放大器是基于自发辐射或光子吸收原理来实现对微弱入射光进行光放大的，其机制与激光器类似。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_050_IMG_2641.png",
    "tags": [
      "第1章",
      "原题20"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-100",
    "type": "judge",
    "stem": "自脉冲现象是某些激光器在某些注入电流下发生的一种持续振荡，实际工作中常遇到这种器件，属正常现象，无须更换。（ ）",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_051_IMG_2640.png",
    "tags": [
      "第1章",
      "原题19"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-101",
    "type": "judge",
    "stem": "发光二极管的结构和激光器的结构相似，大多是采用单异质芯片。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "发光二极管的结构和激光器的结构相似，大多是采用双异质芯片。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_052_IMG_2639.png",
    "tags": [
      "第1章",
      "原题18"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-102",
    "type": "judge",
    "stem": "光电检测器应具有单波长检测能力。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_053_IMG_2638.png",
    "tags": [
      "第1章",
      "原题17"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-103",
    "type": "judge",
    "stem": "根据理论分析，只有当输出的光脉冲为严格的双曲正割脉冲时，光孤子才能稳定地传输。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_054_IMG_2637.png",
    "tags": [
      "第1章",
      "原题16"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-104",
    "type": "judge",
    "stem": "自发辐射光是一种相干荧光，即是单一频率、相位和偏振方向相同的光。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_055_IMG_2636.png",
    "tags": [
      "第1章",
      "原题15"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-105",
    "type": "judge",
    "stem": "发光二极管的工作原理与激光器相同。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_056_IMG_2635.png",
    "tags": [
      "第1章",
      "原题14"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-106",
    "type": "judge",
    "stem": "随着激光器温度的上升，其输出光功率会增大。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "规律变化。",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_057_IMG_2634.png",
    "tags": [
      "第1章",
      "原题13"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-107",
    "type": "judge",
    "stem": "发光二极管（LED）是相干光源，是无阈值器件，它的基本工作原理是自发辐射。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_058_IMG_2633.png",
    "tags": [
      "第1章",
      "原题12"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  },
  {
    "id": "fiber-transmission-108",
    "type": "judge",
    "stem": "光放大器是一种不需要经过光/电/光变换而直接对光信号进行放大的无源器件。",
    "options": [
      {
        "id": "true",
        "text": "正确"
      },
      {
        "id": "false",
        "text": "错误"
      }
    ],
    "answer": [
      "false"
    ],
    "explanation": "",
    "category": "光纤传输技术",
    "difficulty": "easy",
    "source": "图片导入：quest_pic/光纤传输技术/51-108/20260623105033_059_IMG_2632.png",
    "tags": [
      "第1章",
      "原题108"
    ],
    "version": "fiber-transmission-2026-06-23-clean",
    "updatedAt": "2026-06-23T00:00:00.000Z",
    "favorite": false,
    "wrong": false,
    "mastered": false,
    "practiceCount": 0
  }
];

export const seedManifest: QuestionBankManifest = {
  version: SEED_VERSION,
  updatedAt: "2026-06-23T00:00:00.000Z",
  totalQuestions: sampleQuestions.length,
  categories: Object.entries(
    sampleQuestions.reduce<Record<string, number>>((acc, question) => {
      acc[question.category] = (acc[question.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count, updatedAt: "2026-06-23T00:00:00.000Z" }))
};
