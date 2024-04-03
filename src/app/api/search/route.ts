import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type TPlayer = Prisma.playerGetPayload<object> & { teamcolors: number[] };
type TTeam = Prisma.teamcolorGetPayload<object>;

export interface IGETSearch {
  players: TPlayer[];
  teamcolors: Record<number, TTeam[]>;
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") as string;
  const players = await prisma.player.findMany({
    take: 100,
    where: {
      name: {
        contains: name,
      },
    },
    include: {
      teamcolors: {
        include: { team: true },
      },
    },
    orderBy: [
      {
        ovr: "desc",
      },
    ],
  });
  if (players) {
    const teamcolors = {} as Record<number, TTeam>;
    const responseJson = {
      players: players.map((player) => {
        const playerTeamcolor = player.teamcolors.map((teamcolor) => {
          teamcolors[teamcolor.team.id]
            ? null
            : (teamcolors[teamcolor.team.id] = teamcolor.team);
          return teamcolor.team.id;
        });
        return { ...player, teamcolors: playerTeamcolor };
      }),
      teamcolors: teamcolors,
    };
    return NextResponse.json(responseJson);
  } else {
    return NextResponse.json(null);
  }
}
