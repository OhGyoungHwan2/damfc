import { TGETPlayer } from "@/app/api/player/[spid]/route";
import Compare from "../organisms/Compare";
import { PlayerCompareProvider } from "@/context/store";
import SelectStatus from "../organisms/SelectStatus";
import {
  PlayerScroll_Filter,
  PlayerScroll_Provider,
  PlayerScroll_Scroll,
} from "../organisms/PlayerScroll";
import { cookies } from "next/headers";
import CompareTable from "../organisms/CompareTable";

const PlayerSpid: React.FC<{ playerResponse: TGETPlayer }> = ({
  playerResponse,
}) => {
  // 데이터
  const { player, simPlayers, teamcolors } = playerResponse;
  const cookieStore = cookies();
  const condition = cookieStore.get("condition");
  const conditionObj = JSON.parse(condition?.value || "{}");

  return (
    <section className="h-[calc(100dvh-64px)] flex flex-col Expanded:flex-row">
      <PlayerCompareProvider
        defaultPlayerLeft={player}
        defaultPlayerRight={simPlayers[0]}
        teamcolors={teamcolors}
      >
        <section className="Expanded:w-[calc(100vw-306px)] h-full Expanded:h-[calc(100dvh-64px)] flex flex-col">
          <section className="px-[16px]">
            <Compare />
          </section>
          <section className="px-[16px]">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6">
                <div className="col-span-2">
                  <SelectStatus type="enhance" dir="left" />
                </div>
                <div className="col-span-2">
                  <SelectStatus type="adaptability" dir="left" />
                </div>
                <div className="col-span-2">
                  <SelectStatus type="enhanceTeamcolor" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="affiliation" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="feature" dir="left" />
                </div>
              </div>
              <div className="grid grid-cols-6">
                <div className="col-span-2">
                  <SelectStatus type="enhance" dir="right" />
                </div>
                <div className="col-span-2">
                  <SelectStatus type="adaptability" dir="right" />
                </div>
                <div className="col-span-2">
                  <SelectStatus type="enhanceTeamcolor" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="affiliation" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="feature" dir="right" />
                </div>
              </div>
            </div>
          </section>
          <section className="relative grow shrink">
            <div className="absolute inset-0">
              <CompareTable />
            </div>
          </section>
        </section>
        <section className="pl-[16px] Expanded:pl-0 Expanded:w-[306px] Large:w-[612px]">
          <PlayerScroll_Provider
            defaultCondition={conditionObj}
            teamcolors={teamcolors}
          >
            <PlayerScroll_Filter />
            <PlayerScroll_Scroll players={simPlayers} />
          </PlayerScroll_Provider>
        </section>
      </PlayerCompareProvider>
    </section>
  );
};
export default PlayerSpid;
