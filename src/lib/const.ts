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

export const positions = [
  "ST",
  "CF",
  "LW",
  "RW",
  "CM",
  "CAM",
  "CDM",
  "LM",
  "RM",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "GK",
] as const;

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
  "1": { all: 0 },
  "2": { all: 1 },
  "3": { all: 2 },
  "4": { all: 4 },
  "5": { all: 6 },
  "6": { all: 8 },
  "7": { all: 11 },
  "8": { all: 15 },
  "9": { all: 19 },
  "10": { all: 24 },
} as const;

export const adaptability = {
  "1": { all: 0 },
  "2": { all: 1 },
  "3": { all: 2 },
  "4": { all: 3 },
  "5": { all: 4 },
} as const;

export const enhanceTeamcolor = {
  "동빛 물결 LV.1": { all: 1 },
  "은빛 물결 LV.1": { all: 1 },
  "은빛 물결 LV.2": { all: 2 },
  "금빛 물결 LV.1": { all: 2 },
  "금빛 물결 LV.2": { all: 4 },
};

export const traitKey2kr = {
  trait0: "선호 포지션 고집",
  trait1: "장거리 스로인",
  trait3: "파울 유도 선호",
  trait4: "유리몸",
  trait5: "강철몸",
  trait6: "주발 선호",
  trait7: "슬라이딩 태클 선호",
  trait9: "개인 플레이 선호",
  trait11: "트러블 메이커",
  trait12: "얼리 크로스 선호",
  trait13: "예리한 감아차기",
  trait14: "화려한 개인기",
  trait15: "긴 패스 선호",
  trait16: "중거리 슛 선호",
  trait17: "스피드 드리블러",
  trait18: "플레이 메이커",
  trait19: "GK 공격 가담",
  trait20: "GK 능숙한 펀치",
  trait21: "GK 멀리 던지기",
  trait22: "파워 헤더",
  trait23: "GK 침착한 1:1 수비",
  trait24: "초 장거리 스로인",
  trait25: "아웃사이드 슈팅",
  trait27: "패스 마스터",
  trait28: "승부욕",
  trait29: "화려한 걷어내기",
  trait41: "칩슛 선호",
  trait42: "테크니컬 드리블러",
  trait43: "스위퍼 키퍼",
  trait48: "GK 소극적 크로스 수비",
  trait49: "GK 적극적 크로스 수비",
} as const;

export const info2kr = {
  participation: "출전",
  score: "득점",
  assistance: "도움",
  effectiveShooting: "유효 슈팅",
  shooting: "일반 슈팅",
  passRate: "패스 성공률",
  dribbleRate: "드리블 성공률",
  aerialBallRate: "공중볼 경합 성공률",
  interception: "가로채기",
  tackleRate: "태클 성공률",
  blockRate: "차단 성공률",
  defenseRate: "선방 (골차단)",
  grade: "평점",
} as const;

export const info2krTest = {
  participation: "출전",
  score: "득점",
  assistance: "도움",
  effectiveShooting: "유효슛",
  shooting: "슈팅",
  passRate: "패스",
  dribbleRate: "드리블",
  aerialBallRate: "공중볼",
  interception: "가로채기",
  tackleRate: "태클",
  blockRate: "차단",
  defenseRate: "선방",
  grade: "평점",
} as const;

export type TAllStatus = keyof typeof status | keyof typeof statusGK | "all";
export type TAddStatus = Partial<Record<TAllStatus, number>>;
export type TAddStatusSelectCategory =
  | "enhance"
  | "adaptability"
  | "enhanceTeamcolor"
  | "feature"
  | "affiliation"
  | "defaultTeamcolor";
export type TSelectAddStatus = Partial<
  Record<TAddStatusSelectCategory, TAddStatus>
>;
