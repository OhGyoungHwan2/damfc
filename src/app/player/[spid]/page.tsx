import { TGETPlayer } from "@/app/api/player/[spid]/route";
import PlayerSpid from "@/components/templates/PlayerSpid";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "DamFC",
  description:
    "유사 선수 분석완료, 최고의 선수 분석으로 최강의 스쿼드를 만들어 보세요",
};

async function getPlayer(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/player/${postId}`, {
    next: { revalidate: 604800 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { spid: string } }) {
  const playerResponse = (await getPlayer(params.spid)) as TGETPlayer;
  return <PlayerSpid playerResponse={playerResponse} />;
}
