import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const option = {
  select: {
    id: true,
    category: true,
    playerId: true,
    rank: true,
    subcategory: true,
    subcategoryOrder: true,
    player: {
      select: {
        id: true,
        name: true,
        season: true,
        imgId: true,
        ovr: true,
        position: true,
        pay: true,
        mainfoot: true,
        weakfoot: true,
        physical: true,
        weight: true,
        height: true,
        skillmove: true,
        bp1: true,
        bp3: true,
        bp5: true,
        bp8: true,
      },
    },
  },
};

export type TRecommend = Prisma.recommendGetPayload<typeof option>;

export type TGETRecommend = {
  positions: string[];
  recommendPositions: Record<string, TRecommend[]>;
  seasons: string[];
  recommendSeasons: Record<string, TRecommend[]>;
};

function recommendDivide(recommendList: TRecommend[]) {
  // 데이터
  const subcategoryPositionSet = new Set<string>();
  const subcategorySeasonSet = new Set<string>();
  const categoryRecommend = {
    position: {} as Record<string, TRecommend[]>,
    season: {} as Record<string, TRecommend[]>,
  };

  recommendList.map((recommend) => {
    recommend.category == "position"
      ? (subcategoryPositionSet.add(recommend.subcategory),
        categoryRecommend.position[recommend.subcategory]
          ? categoryRecommend.position[recommend.subcategory].push(recommend)
          : (categoryRecommend.position[recommend.subcategory] = [recommend]))
      : recommend.category == "season"
      ? (subcategorySeasonSet.add(recommend.subcategory),
        categoryRecommend.season[recommend.subcategory]
          ? categoryRecommend.season[recommend.subcategory].push(recommend)
          : (categoryRecommend.season[recommend.subcategory] = [recommend]))
      : null;
  });

  return {
    positions: [...subcategoryPositionSet],
    recommendPositions: categoryRecommend.position,
    seasons: [...subcategorySeasonSet],
    recommendSeasons: categoryRecommend.season,
  };
}

export async function GET() {
  const recommends = await prisma.recommend.findMany({
    ...option,
    orderBy: [
      {
        subcategoryOrder: "asc",
      },
      {
        rank: "asc",
      },
    ],
  });

  const responseJson = recommendDivide(recommends);

  return NextResponse.json(responseJson);
}
