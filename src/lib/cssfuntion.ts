import { info2kr } from "./const";

const BPUNITS = ["만", "억", "조", "경"];

export function bp2string(number?: number | null) {
  let idx = 0;
  let bp = number || 0;

  if (bp / 1000 >= 1) {
    bp /= 1000;
    idx++;
  }
  while (bp / 10000 >= 1) {
    bp /= 10000;
    idx++;
  }
  return `${bp.toFixed(1)} ${BPUNITS[idx]}`;
}

export function position2color(position: string) {
  switch (true) {
    case ["ST", "LW", "RW", "CF", "LS", "RS", "LF", "RF"].includes(position):
      return "text-[#f6425f]";
    case [
      "CAM",
      "LM",
      "RM",
      "CM",
      "CDM",
      "LAM",
      "RAM",
      "LCM",
      "RCM",
      "LDM",
      "RDM",
    ].includes(position):
      return "text-[#03cd7a]";
    case ["CB", "LB", "RB", "LWB", "RWB", "SW", "LCB", "RCB"].includes(
      position
    ):
      return "text-[#1476ff]";
    case ["GK"].includes(position):
      return "text-[#e9a216]";
    default:
      return "";
  }
}

export function point2color(point: number) {
  switch (true) {
    case point < 70:
      return "text-[#606972]";
    case point < 80:
      return "text-[#8f96a0]";
    case point < 90:
      return "text-[#2194d6]";
    case point < 100:
      return "text-[#175dde]";
    case point < 110:
      return "text-[#6e3bff]";
    case point < 120:
      return "text-[#b33bff]";
    case point < 130:
      return "text-[#cf13c0]";
    case point < 140:
      return "text-[#dc0000]";
    case point < 150:
      return "text-[#c99b00]";
    case point < 160:
      return "text-[#ffa800]";
    case point < 170:
      return "text-[#11caaa]";
    default:
      return " text-muted-foreground";
  }
}

export function info2color(category: keyof typeof info2kr, point: number = 0) {
  const infoPanel = {
    participation: [
      140.25, 199.0, 289.0, 423.0, 608.25, 928.0, 1717.75, 37792.0,
    ],
    score: [0.0, 0.0, 0.0, 0.2, 0.2, 0.3, 0.3, 0.8],
    assistance: [0.0, 0.0, 0.1, 0.2, 0.2, 0.2, 0.3, 0.4],
    effectiveShooting: [0.0, 0.0, 0.1, 0.4, 0.6, 0.7, 0.8, 1.5],
    shooting: [0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.2, 0.4],
    passRate: [78.125, 82.3, 84.5, 86.5, 88.1, 89.8, 92.6, 95.2],
    dribbleRate: [85.7, 87.0, 88.8, 90.0, 91.0, 93.5, 95.2, 100.0],
    aerialBallRate: [2.4, 3.5, 4.1, 4.6, 5.1, 5.8, 7.0, 100.0],
    interception: [0.3, 0.4, 0.4, 0.5, 0.6, 0.7, 0.7, 1.0],
    tackleRate: [56.6, 61.25, 63.3, 65.0, 66.3, 67.6, 69.3, 300.0],
    blockRate: [0.0, 1.3, 2.1, 2.9, 3.9, 5.4, 10.6, 17.4],
    defenseRate: [0.1, 0.2, 0.2, 0.3, 0.7, 0.9, 1.2, 4.5],
    grade: [6.4, 6.5, 6.5, 6.6, 6.6, 6.7, 6.8, 7.4],
  };

  switch (true) {
    case point < infoPanel[category][0]:
      return "text-[#606972]";
    case point < infoPanel[category][1]:
      return "text-[#8f96a0]";
    case point < infoPanel[category][2]:
      return "text-[#2194d6]";
    case point < infoPanel[category][3]:
      return "text-[#175dde]";
    case point < infoPanel[category][4]:
      return "text-[#6e3bff]";
    case point < infoPanel[category][5]:
      return "text-[#b33bff]";
    case point < infoPanel[category][6]:
      return "text-[#cf13c0]";
    case point < infoPanel[category][7]:
      return "text-[#dc0000]";
    default:
      return " text-[#c99b00]";
  }
}
