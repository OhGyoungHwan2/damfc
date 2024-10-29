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
    participation: [118.0, 138.5, 164.0, 202.0, 259.25, 326.5, 471.0, 1364.0],
    score: [0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.6, 1.2],
    assistance: [0.0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6],
    effectiveShooting: [0.0, 0.0, 0.1, 0.3, 0.5, 0.7, 1.2, 2.5],
    shooting: [0.0, 0.0, 0.1, 0.1, 0.2, 0.2, 0.3, 0.6],
    passRate: [87.5, 89.3, 90.3, 91.1, 91.8, 92.6, 93.5, 96.1],
    dribbleRate: [83.3, 86.0, 90.07, 91.6, 92.3, 93.0, 94.0, 100.0],
    aerialBallRate: [4.525, 6.7, 8.375, 9.7, 11.0, 12.6, 14.9, 100.0],
    interception: [0.2, 0.2, 0.3, 0.6, 0.7, 0.8, 1.2, 1.6],
    tackleRate: [40.95, 45.25, 49.0, 51.8, 54.8, 57.0, 60.2, 125.0],
    blockRate: [0.0, 2.05, 3.575, 4.8, 6.1, 7.95, 12.0, 17.1],
    defenseRate: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 3.9],
    grade: [6.1, 6.3, 6.5, 6.8, 7.0, 7.1, 7.5, 8.1],
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
