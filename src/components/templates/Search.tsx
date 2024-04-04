import { IGETSearch } from "@/app/api/search/route";
import Link from "next/link";
import StateLayer from "../atoms/StateLayer";
import PlayerCard from "../organisms/PlayerCard";

const Search: React.FC<{
  searchResponse: IGETSearch;
}> = ({ searchResponse }) => {
  const { players } = searchResponse;
  return (
    <main className="max-w-[1400px] p-4 small:p-6 medium:p-8 mx-auto flex flex-col gap-8 justify-center items-center">
      <section className="relative flex flex-col w-full gap-4 p-4 border rounded-md border-border small:p-6 medium:p-8">
        <div>
          <h3>검색 결과</h3>
        </div>
        <div className="flex flex-wrap justify-start w-full gap-2">
          {players.map((player) => (
            <Link
              href={`/player/${player.id}`}
              key={`ThumbnailInfo${player.id}`}
              target="_blank"
              className="relative w-[200px]"
            >
              <StateLayer className="bg-foreground">
                <PlayerCard player={player} />
              </StateLayer>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Search;
