import { IGETSearch } from "@/app/api/search/route";
import Link from "next/link";
import StateLayer from "../atoms/StateLayer";
import PlayerCard from "../organisms/PlayerCard";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { SquadAddPlayer } from "../organisms/SquadMaker";

const Search: React.FC<{
  searchResponse: IGETSearch;
}> = ({ searchResponse }) => {
  const { players } = searchResponse;
  return (
    <section className="px-[16px] Expanded:px-[62px] Large:px-[106px] mx-auto flex flex-col gap-8 justify-center items-center">
      <section className="relative flex flex-col w-full gap-4">
        <div>
          <h3>검색 결과</h3>
        </div>
        <div className="flex flex-wrap justify-start w-full gap-2">
          {players.map((player) => (
            <Link
              href={`/player/${player.id}`}
              key={`ThumbnailInfo${player.id}`}
              target="_blank"
              className="relative"
            >
              <StateLayer className="bg-foreground">
                <ContextMenu>
                  <ContextMenuTrigger>
                    <PlayerCard player={player} isBp />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <SquadAddPlayer player={player}>
                        스쿼드 추가
                      </SquadAddPlayer>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </StateLayer>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Search;
