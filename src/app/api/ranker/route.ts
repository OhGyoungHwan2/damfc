import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const option = {
  select: {
    id: true,
    controller: true,
    nickname: true,
    players: {
      select: {
        id: true,
        grade: true,
        playerId: true,
        position: true,
        player: {
          select: {
            id: true,
            name: true,
            season: true,
            imgId: true,
          },
        },
      },
    },
  },
};

export type TRanker = Prisma.rankerGetPayload<typeof option>;
export type TGETRanker = {
  rankers: Record<string, TRanker>;
  keyboardRankers: string[];
  gamepadRankers: string[];
  etcRankers: string[];
};

export async function GET() {
  const rankers = await prisma.ranker.findMany(option);
  const responseRanker = {
    rankers: {},
    keyboardRankers: [],
    gamepadRankers: [],
    etcRankers: [],
  } as TGETRanker;
  rankers.map((ranker) => {
    switch (ranker.controller) {
      case "keyboard":
        responseRanker["keyboardRankers"].push(ranker.nickname);
        break;
      case "gamepad":
        responseRanker["gamepadRankers"].push(ranker.nickname);
        break;
      case "etc":
        responseRanker["etcRankers"].push(ranker.nickname);
        break;
      default:
        break;
    }
    responseRanker["rankers"][ranker.nickname] = ranker;
  });
  return NextResponse.json(responseRanker);
}
