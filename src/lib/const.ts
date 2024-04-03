export const spPosition2Position = {
  0: "gk",
  1: "sw",
  2: "rwb",
  3: "rb",
  4: "rcb",
  5: "cb",
  6: "lcb",
  7: "lb",
  8: "lwb",
  9: "rdm",
  10: "cdm",
  11: "ldm",
  12: "rm",
  13: "rcm",
  14: "cm",
  15: "lcm",
  16: "lm",
  17: "ram",
  18: "cam",
  19: "lam",
  20: "rf",
  21: "cf",
  22: "lf",
  23: "rw",
  24: "rs",
  25: "st",
  26: "ls",
  27: "lw",
} as Record<number, string>;

export const status = {
  sprintspeed: "속력",
  acceleration: "가속력",
  finishing: "골 결정력",
  shotpower: "슛 파워",
  longshots: "중거리 슛",
  positioning: "위치 선정",
  volleys: "발리슛",
  penalties: "페널티 킥",
  shortpassing: "짧은 패스",
  vision: "시야",
  crossing: "크로스",
  longpassing: "긴 패스",
  freekickaccuracy: "프리킥",
  curve: "커브",
  dribbling: "드리블",
  ballcontrol: "볼 컨트롤",
  agility: "민첩성",
  balance: "밸런스",
  reactions: "반응 속도",
  marking: "대인 수비",
  standingtackle: "태클",
  interceptions: "가로채기",
  headingaccuracy: "헤더",
  slidingtackle: "슬라이딩 태클",
  strength: "몸싸움",
  stamina: "스태미너",
  aggression: "적극성",
  jumping: "점프",
  composure: "침착성",
} as const;

export const statusGK = {
  jumping: "점프",
  agility: "민첩성",
  reactions: "반응 속도",
  gkdiving: "GK 다이빙",
  gkhandling: "GK 핸들링",
  gkkicking: "GK 킥",
  gkreflexes: "GK 반응속도",
  gkpositioning: "GK 위치 선정",
} as const;

export const statusPhysical = {
  height: "키",
  weight: "몸무게",
  weakfoot: "약발",
  mainfoot: "주발",
  physical: "체형",
} as const;

export const statusOrder = [
  "sprintspeed",
  "acceleration",
  "finishing",
  "shotpower",
  "longshots",
  "positioning",
  "volleys",
  "penalties",
  "shortpassing",
  "vision",
  "crossing",
  "longpassing",
  "freekickaccuracy",
  "curve",
  "dribbling",
  "ballcontrol",
  "agility",
  "balance",
  "reactions",
  "marking",
  "standingtackle",
  "interceptions",
  "headingaccuracy",
  "slidingtackle",
  "strength",
  "stamina",
  "aggression",
  "jumping",
  "composure",
  "gkdiving",
  "gkhandling",
  "gkkicking",
  "gkreflexes",
  "gkpositioning",
] as const;

export const number2physical = {
  0: "마름",
  1: "마름(고유)",
  2: "보통",
  3: "보통(고유)",
  4: "건장",
  5: "건장(고유)",
} as const;

export const enhance = {
  1: { all: 0 },
  2: { all: 1 },
  3: { all: 2 },
  4: { all: 4 },
  5: { all: 6 },
  6: { all: 8 },
  7: { all: 11 },
  8: { all: 15 },
  9: { all: 19 },
  10: { all: 24 },
} as const;

export const adaptability = {
  1: { all: 0 },
  2: { all: 1 },
  3: { all: 2 },
  4: { all: 3 },
  5: { all: 4 },
} as const;

export const enhanceTeamcolor = {
  "동빛 물결 LV.1": { all: 1 },
  "은빛 물결 LV.1": { all: 1 },
  "은빛 물결 LV.2": { all: 2 },
  "금빛 물결 LV.1": { all: 2 },
  "금빛 물결 LV.2": { all: 3 },
};

export const traitKeys = [
  "trait0",
  "trait1",
  "trait3",
  "trait4",
  "trait5",
  "trait6",
  "trait7",
  "trait9",
  "trait11",
  "trait12",
  "trait13",
  "trait14",
  "trait15",
  "trait16",
  "trait17",
  "trait18",
  "trait19",
  "trait20",
  "trait21",
  "trait22",
  "trait23",
  "trait24",
  "trait25",
  "trait27",
  "trait28",
  "trait29",
  "trait41",
  "trait42",
  "trait43",
  "trait48",
  "trait49",
] as const;

export type TAllStatus = keyof typeof status | keyof typeof statusGK | "all";
export type TAddStatus = Partial<Record<TAllStatus, number>>;
export type TAddStatusSelectCategory =
  | "enhance"
  | "adaptability"
  | "enhanceTeamcolor"
  | "feature"
  | "affiliation";
export type TSelectAddStatus = Partial<
  Record<TAddStatusSelectCategory, TAddStatus>
>;
