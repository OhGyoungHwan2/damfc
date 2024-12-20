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
    "participation": [100.0, 104.0, 113.0, 139.0, 216.0, 361.0, 484.0, 803.72] ,
"score": [0.0, 0.0, 0.0, 0.1, 0.4, 0.8, 0.9, 1.1] ,
"assistance": [0.0, 0.0, 0.0, 0.2, 0.4, 0.4, 0.5, 0.6] ,
"effectiveShooting": [0.0, 0.0, 0.0, 0.4, 0.7, 1.5, 1.7, 2.0] ,
"shooting": [0.0, 0.0, 0.0, 0.1, 0.2, 0.4, 0.5, 0.6] ,
"passRate": [84.2, 86.8, 89.1, 91.0, 92.4, 93.6, 94.1, 94.9] ,
"dribbleRate": [76.6, 81.0, 84.8, 91.3, 93.0, 94.5, 97.59, 100.0] ,
"aerialBallRate": [0.0, 2.5, 6.6, 9.9, 13.3, 16.7, 19.1, 32.81] ,
"interception": [0.0, 0.1, 0.2, 0.5, 0.8, 1.2, 1.3, 1.4] ,
"tackleRate": [0.0, 39.0, 44.4, 51.55, 57.27, 61.7, 65.09, 100.0] ,
"blockRate": [0.0, 0.0, 1.1, 4.1, 7.4, 11.8, 13.09, 15.16] ,
"defenseRate": [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 3.2, 3.56] ,
"grade": [6.0, 6.1, 6.3, 6.9, 7.2, 7.7, 7.8, 8.0] ,
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
