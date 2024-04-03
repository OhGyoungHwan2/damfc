import { TGETPlayer } from "@/app/api/player/[spid]/route";
import Test from "@/components/templates/Test";

async function getPlayer(postId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/player/${postId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { spid: string } }) {
  const playerResponse = (await getPlayer(params.spid)) as TGETPlayer;
  return <Test playerResponse={playerResponse} />;
}
