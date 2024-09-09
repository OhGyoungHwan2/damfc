import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type TPlayer = Prisma.playerGetPayload<object>;
type TTeam = Prisma.teamcolorGetPayload<object>;

type simPlayer = TPlayer & {
  teamcolors: {
    affiliation: number[];
    feature: number[];
  };
};

export type TGETPlayer = {
  player: TPlayer & {
    teamcolors: {
      affiliation: number[];
      feature: number[];
    };
    info?: Record<string, number>;
  };
  simPlayers: simPlayer[];
  teamcolors: {
    affiliation: Record<number, TTeam>;
    feature: Record<number, TTeam>;
    info?: Record<string, number>;
  };
};

function teamcolor2divide(
  teamcolors: { team: TTeam }[],
  tempTeamcolors: {
    affiliation: Record<number, TTeam>;
    feature: Record<number, TTeam>;
  }
) {
  const teamcolorDivide = {
    affiliation: [] as number[],
    feature: [] as number[],
  };

  teamcolors.map((teamcolor) => {
    if (teamcolor.team.category == "affiliation") {
      tempTeamcolors["affiliation"][teamcolor.team.id]
        ? teamcolorDivide["affiliation"].push(teamcolor.team.id)
        : ((tempTeamcolors["affiliation"][teamcolor.team.id] = teamcolor.team),
          teamcolorDivide["affiliation"].push(teamcolor.team.id));
    } else {
      tempTeamcolors["feature"][teamcolor.team.id]
        ? teamcolorDivide["feature"].push(teamcolor.team.id)
        : ((tempTeamcolors["feature"][teamcolor.team.id] = teamcolor.team),
          teamcolorDivide["feature"].push(teamcolor.team.id));
    }
  });
  return teamcolorDivide;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { spid: string } }
) {
  const players = await prisma.player.findFirst({
    where: {
      id: parseInt(params.spid),
    },
    include: {
      playerSimilarityPlayer: {
        include: {
          simPlayers: {
            include: {
              teamcolors: {
                include: { team: true },
              },
              info: true,
            },
          },
        },
      },
      teamcolors: {
        include: { team: true },
      },
      info: true,
    },
  });

  if (players) {
    const { playerSimilarityPlayer, ...player } = players;
    const teamcolors = {
      affiliation: {} as Record<number, TTeam>,
      feature: {} as Record<number, TTeam>,
    };
    const responseJson = {
      player: {
        ...player,
        teamcolors: teamcolor2divide(player.teamcolors, teamcolors),
      },
      simPlayers: playerSimilarityPlayer.map((simPlayer) => {
        return {
          ...simPlayer.simPlayers,
          teamcolors: teamcolor2divide(
            simPlayer.simPlayers.teamcolors,
            teamcolors
          ),
        };
      }),
      teamcolors: teamcolors,
    };
    return NextResponse.json(responseJson);
  } else {
    return NextResponse.json(null);
  }
}
