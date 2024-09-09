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
    participation: [148.0, 232.0, 346.5, 520.0, 791.5, 1228.0, 2259.0, 46461.0],
    score: [0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.3, 1.1],
    assistance: [0.0, 0.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.5],
    effectiveShooting: [0.0, 0.0, 0.1, 0.4, 0.5, 0.6, 0.8, 1.7],
    shooting: [0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.2, 0.4],
    passRate: [80.3, 83.7, 85.4, 86.9, 88.5, 90.2, 93.2, 96.7],
    dribbleRate: [86.0, 87.2, 88.7, 90.1, 91.1, 93.6, 95.3, 100.0],
    aerialBallRate: [2.6, 3.6, 4.2, 4.8, 5.3, 6.0, 7.3, 100.0],
    interception: [0.3, 0.4, 0.4, 0.5, 0.6, 0.6, 0.7, 1.2],
    tackleRate: [56.6, 61.0, 63.2, 64.8, 66.3, 67.6, 69.2, 200.0],
    blockRate: [0.0, 1.2, 2.0, 2.7, 3.8, 5.6, 10.7, 19.0],
    defenseRate: [0.1, 0.1, 0.2, 0.3, 0.6, 0.8, 1.1, 4.3],
    grade: [6.4, 6.5, 6.5, 6.6, 6.6, 6.7, 6.8, 7.9],
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
