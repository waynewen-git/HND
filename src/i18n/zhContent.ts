import type { ProductCategory } from "@/types";

const guitarTaglines = [
  "经典单缺角",
  "现代双缺角",
  "超级斯特拉特",
  "偏移舞台型",
  "Explorer 金属型",
  "V 型速弹",
];

const guitarBodies = [
  "桃花心木 SET 颈",
  "桤木 bolt-on",
  "桤木枫木贴面",
  "桤木偏移琴身",
  "桃花心木激进切削",
  "轻量化桤木 V 型",
];

const guitarStrings = [
  "9–42 轻",
  "10–46 标准",
  "10–46 标准",
  "11–48 重",
  "11–48 重",
  "12–54 超重",
];

const guitarDesc =
  "为重型摇滚打造的精密电吉他。人体工学琴身、高输出拾音器与速弹琴颈，适合激进 riff 与高把位 solo。";

function guitarProduct(index: number) {
  return {
    tagline: guitarTaglines[index],
    description: guitarDesc,
    highlights: [
      "高输出 humbucker， crushing 增益",
      "速弹 C 型琴颈，适合技术型演奏",
      "舞台级硬件与电路",
    ],
    specValues: {
      Body: guitarBodies[index],
      Neck: "枫木 bolt-on",
      Fingerboard: "乌木，24 品",
      Pickups: "HND Humbucker 套装",
      Bridge: "固定式，穿体弦",
      "Scale Length": '25.5"',
      Strings: guitarStrings[index],
      Weight: "3.8 kg",
    },
  };
}

function ampProduct(index: number) {
  const n = index + 1;
  const power = 50 + index * 10;
  const weight = 18 + index;
  return {
    tagline: `专业音箱头 0${n}`,
    description:
      "专业电子管音箱头，提供巨大增益与清晰的 clean 音色。优质元件，巡演与录音室皆宜。",
    highlights: [
      "全电子管电路，真实音色",
      "可切换音色，现代与复古兼备",
      "巡演级机箱与元件",
    ],
    specValues: {
      Power: `${power}W`,
      Channels: "2（Clean / Lead）",
      Tubes: "4x EL34, 3x 12AX7",
      Impedance: "4 / 8 / 16 Ω",
      "Effects Loop": "串联，可 footswitch",
      Weight: `${weight} kg`,
    },
  };
}

export const zhContent = {
  categories: {
    guitars: {
      name: "电吉他",
      description:
        "六款为重型摇滚打造的精密电吉他。激进音色、冷金属美学、舞台级表现。",
    },
    amps: {
      name: "音箱头",
      description:
        "七款专业音箱头， crushing 增益与 pristine 清晰度。为录音室与舞台而生。",
    },
    speakers: {
      name: "蓝牙音箱",
      description:
        "二极管驱动蓝牙音频，录音室级清晰度。一款产品，两种配色，不妥协的声音。",
    },
    lifestyle: {
      name: "生活方式",
      description: "舞台级服饰与配件。让摇滚更贴近生活。",
    },
  } satisfies Record<ProductCategory, { name?: string; description?: string }>,

  products: {
    "guitar-01": guitarProduct(0),
    "guitar-02": guitarProduct(1),
    "guitar-03": guitarProduct(2),
    "guitar-04": guitarProduct(3),
    "guitar-05": guitarProduct(4),
    "guitar-06": guitarProduct(5),
    "amp-01": ampProduct(0),
    "amp-02": ampProduct(1),
    "amp-03": ampProduct(2),
    "amp-04": ampProduct(3),
    "amp-05": ampProduct(4),
    "amp-06": ampProduct(5),
    "speaker-01": {
      tagline: "二极管蓝牙音箱",
      description:
        "旗舰二极管驱动蓝牙音箱，紧凑体积呈现录音室级清晰度。精准还原，深沉可控的低频。",
      highlights: ["二极管放大架构，低失真", "24 小时续航", "IPX5 防水"],
      specValues: {
        Driver: '6.5" 低音 + 1" 高音',
        Power: "120W RMS",
        Bluetooth: "5.3，aptX HD",
        Battery: "最长 24 小时",
        Inputs: "蓝牙、3.5mm、USB-C",
        Weight: "2.4 kg",
      },
    },
    "live-01": {
      tagline: "音箱图案 T 恤",
      description:
        "重磅棉 T 恤，HND 音箱系列图案。排练室、巡演车与深夜皆宜。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
    "live-02": {
      tagline: "舞台高帮鞋",
      description: "帆布高帮，HND 标志细节。从街头到舞台，步伐不停。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
    "live-03": {
      tagline: "拨片收纳站",
      description: "紧凑拨片站，HND branding。无论夜晚带你去哪，拨片随时就绪。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
    "live-04": {
      tagline: "舞台低帮鞋",
      description: "低帮帆布运动鞋，HND 细节。街头简洁线条，舞台抓地力。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
    "live-05": {
      tagline: "Amplified 徽章",
      description: "HND Amplified 徽章，吉他音箱图案。别上、贴上，拥有标志。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
    "live-06": {
      tagline: "Amplified 钥匙扣",
      description: "金属钥匙扣，HND Amplified 吉他音箱浮雕。把舞台带在身边。",
      highlights: ["官方 HND 生活方式系列", "与舞台美学一致的设计", "日常穿着"],
      specValues: { Collection: "生活方式" },
    },
  } as Record<
    string,
    {
      tagline?: string;
      description?: string;
      highlights?: string[];
      specValues?: Record<string, string>;
    }
  >,

  faqs: [
    {
      question: "HND 的保修政策是什么？",
      answer:
        "所有 HND 产品含 2 年有限保修，涵盖制造缺陷。购买时可选购延长保修。",
    },
    {
      question: "是否支持国际配送？",
      answer:
        "支持。我们向全球大多数国家/地区发货。运费与送达时间因目的地而异，结账时计算。",
    },
    {
      question: "可以定制吉他吗？",
      answer:
        "定制选项（颜色、拾音器、琴颈材质等）将在配置器（第二阶段）中提供。",
    },
    {
      question: "如何联系支持？",
      answer:
        "通过联系页面或邮件 support@hndmusic.com 联系我们。工作日 24 小时内回复。",
    },
    {
      question: "退货政策是什么？",
      answer:
        "未拆封产品 30 天内可全额退款。已拆封产品 14 天内可退，可能收取 restocking 费用。",
    },
  ],

  stores: {
    "store-1": {
      name: "HND 体验中心 — 洛杉矶",
      city: "洛杉矶",
      country: "美国",
      hours: "周一至周六 10:00–19:00，周日 12:00–17:00",
    },
    "store-2": {
      name: "HND 体验中心 — 纽约",
      city: "纽约",
      country: "美国",
      hours: "周一至周六 10:00–20:00，周日 12:00–18:00",
    },
    "store-3": {
      name: "HND 体验中心 — 伦敦",
      city: "伦敦",
      country: "英国",
      hours: "周一至周六 10:00–18:00，周日休息",
    },
    "store-4": {
      name: "HND 体验中心 — 东京",
      city: "东京",
      country: "日本",
      hours: "每日 11:00–20:00",
    },
  },

  news: {
    "hnd-g-series-launch": {
      title: "HND-G 电吉他系列发布",
      excerpt:
        "六款为重型摇滚打造的新电吉他，配备高输出 humbucker 与速弹琴颈。",
      content:
        "今日发布六款全新电吉他——HND-G 系列。每把琴为重型摇滚而造，高输出 humbucker、速弹 C 型琴颈与舞台级硬件。四色可选：黑、白、红、蓝。价格 $699 至 $899。",
    },
    "diode-speaker-technology": {
      title: "深入 HND 二极管放大技术",
      excerpt: "二极管驱动放大架构如何在便携蓝牙音箱中实现录音室级清晰度。",
      content:
        "HND-S01 蓝牙音箱采用 proprietary 二极管放大架构，超低失真、录音室级清晰度。120W RMS、aptX HD 蓝牙 5.3、24 小时续航，树立便携音频新标准。",
    },
    "experience-centers-opening": {
      title: "HND 体验中心正式开放",
      excerpt: "洛杉矶、纽约、伦敦、东京新址开放，欢迎体验完整 HND 产品线。",
      content:
        "HND 体验中心在洛杉矶、纽约、伦敦、东京正式开放。欢迎试弹完整产品线、获取专家建议，亲身体验 HND 的不同。",
    },
  },

  configure: {
    body: {
      "Classic S-Style": {
        value: "经典 S 型",
        description: "平衡双缺角， versatile 舞台几何。",
      },
      "Faceted Custom": {
        value: "切面定制",
        description: "棱角平面，激进现代轮廓。",
      },
      Superstrat: {
        value: "超级斯特拉特",
        description: "Humbucker 就绪琴身，舞台缺角 access。",
      },
      "V-Wing": {
        value: "V 翼型",
        description: "不对称 V 缺角，最大高把位 access。",
      },
    },
    neck: {
      "1": { value: "枫木 6 弦一字头" },
      "2": { value: "鲨鳍尖头" },
    },
    upcoming: {
      Fingerboard: "指板",
      Pickups: "拾音器",
      Bridge: "琴桥",
      "Scale Length": "有效弦长",
      Strings: "琴弦",
      Others: "其他",
    },
  },

  homeDemos: {
    "HND-G01": {
      role: "节奏吉他 · Iron Circuit",
      instrument: "电吉他",
      tagline: "经典单缺角",
      quote:
        "温暖的桃花心 punch 仍能穿透 dense mix。为 holding 整组 set 的 riff 而造。",
    },
    "HND-G02": {
      role: "主音吉他 · Static Room",
      instrument: "电吉他",
      tagline: "现代双缺角",
      quote: "速弹琴颈、 tight attack，gain 全开仍清晰 articulate。",
    },
    "HND-G03": {
      role: "主音吉他 · Night Circuit",
      instrument: "电吉他",
      tagline: "超级斯特拉特 Pro",
      quote: " tight 低频、 cutting mids，舞台上零 fluff。房间变 loud 时跟得上。",
    },
    "HND Stage": {
      role: "舞台 Session",
      instrument: "电吉他",
      tagline: "为摇滚而造",
      quote:
        "第一个音落下，房间就 tight 起来。为舞台而建， tuned 给坐不住的摇滚。",
    },
  },
};
