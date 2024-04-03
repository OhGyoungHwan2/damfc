import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { PlayerCompareProvider } from "@/context/store";
import {
  ComparePlayerCard,
  CompareRadar,
} from "../organisms/simplayer/Compare";
import { AddSelect } from "../organisms/simplayer/AddSelect";
import {
  PlayerScroll,
  PlayerScrollFilter,
  PlayerScrollFilterReset,
  PlayerScrollProvider,
} from "../organisms/simplayer/PlayerScroll";
import Table from "../organisms/simplayer/Table";

const PlayerSpid: React.FC<{ playerResponse: TGETPlayer }> = ({
  playerResponse,
}) => {
  // 데이터
  const { player, simPlayers, teamcolors } = playerResponse;

  let log = "";
  simPlayers.map((player, idx) => {
    idx % 3 === 0 && (log += "\n");
    log += `[${idx + 1}위${player.season}${player.name}], `;
  });
  console.log(log);

  const createCommandItems = (values: number[]) =>
    values.map((value) => ({
      value: teamcolors.affiliation[value].name,
      node: <div key={value}>{teamcolors.affiliation[value].name}</div>,
    }));

  return (
    <section className="flex flex-col Expanded:flex-row max-w-[905px] mx-auto w-full justify-between">
      <PlayerCompareProvider
        defaultPlayerLeft={player}
        defaultPlayerRight={simPlayers[0]}
      >
        <section className="Expanded:w-[calc(100%-360px)]">
          <section className="h-[220px] grid grid-cols-6 items-center gap-0.5 Expanded:gap-2">
            <div className="self-start col-span-2">
              <ComparePlayerCard type="left" />
            </div>
            <div className="self-start col-span-2 Medium:row-span-2">
              <CompareRadar />
            </div>
            <div className="self-start col-span-2">
              <ComparePlayerCard type="right" />
            </div>
            <div className="self-end col-span-3 Medium:col-span-2">
              <AddSelect type="left" teamcolors={teamcolors} />
            </div>
            <div className="self-end col-span-3 Medium:col-span-2">
              <AddSelect type="right" teamcolors={teamcolors} />
            </div>
          </section>
          <section className="h-[210px] Expanded:h-[400px] ">
            <Table />
          </section>
        </section>
        <PlayerScrollProvider>
          <section className="h-[146px] Expanded:h-[calc(100vh-64px)] Expanded:w-[360px]">
            <div className="flex items-center gap-1">
              <PlayerScrollFilter
                commandItems={createCommandItems(
                  Object.entries(teamcolors.affiliation).map(([key]) =>
                    parseInt(key)
                  )
                )}
              />
              <PlayerScrollFilterReset />
            </div>
            <PlayerScroll
              players={simPlayers}
              teamcolors={teamcolors.affiliation}
            />
          </section>
        </PlayerScrollProvider>
      </PlayerCompareProvider>
    </section>
  );
};
export default PlayerSpid;
