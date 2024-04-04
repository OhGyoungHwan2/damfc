// import { cn } from "@/lib/utils";
// import { IGETSearch } from "../api/search/route";
// import Search from "@/components/templates/Search";

// async function getPlayer(name: string) {
//   const res = await fetch(`${process.env.BASE_URL}/api/search?name=${name}`, {
//     cache: "force-cache",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// type TProps = {
//   searchParams: { [key: string]: string | string[] | undefined };
// };

export default async function Page() {
  // const searchResponse = (await getPlayer(
  //   cn(props.searchParams.name)
  // )) as IGETSearch;
  // return <Search searchResponse={searchResponse} />;
  return <></>;
}
