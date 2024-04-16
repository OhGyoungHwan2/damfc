import { cn } from "@/lib/utils";
import { IGETSearch } from "../api/search/route";
import Search from "@/components/templates/Search";
import type { Metadata } from "next";

type TProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: TProps): Promise<Metadata> {
  const searchWard = searchParams.name;
  return {
    title: `${searchWard}검색`,
    description: `${searchWard}검색완료 원하시는 선수의 분석을 확인해보세요`,
  };
}

async function getPlayer(name: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/search?name=${name}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page(props: TProps) {
  const searchResponse = (await getPlayer(
    cn(props.searchParams.name)
  )) as IGETSearch;
  return <Search searchResponse={searchResponse} />;
}
