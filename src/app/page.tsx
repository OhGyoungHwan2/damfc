import Home from "../components/templates/Home";
import { TGETRanker } from "./api/ranker/route";
import { TGETRecommend } from "./api/recommend/route";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DamFC",
  description:
    "FC온라인 최고의 선수찾기는 DamFC! 유사도 분석을 통한 최고의 선수 및 스쿼드를 확인해보세요",
};

async function getRecommend() {
  const res = await fetch(`${process.env.BASE_URL}/api/recommend`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getRanker() {
  const res = await fetch(`${process.env.BASE_URL}/api/ranker`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  // 데이터
  const responseRecommend = (await getRecommend()) as TGETRecommend;
  const responseRanker = (await getRanker()) as TGETRanker;

  return (
    <Home
      responseRecommend={responseRecommend}
      responseRanker={responseRanker}
    />
  );
}
