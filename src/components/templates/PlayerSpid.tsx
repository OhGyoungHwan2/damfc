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
import { Tutorial_Provider, Tutorial_Tooltip } from "../organisms/Tutorial";

const PlayerSpid: React.FC<{ playerResponse: TGETPlayer }> = ({
  playerResponse,
}) => {
  // 데이터
  const { player, simPlayers, teamcolors } = playerResponse;
  const cookieStore = cookies();
  const condition = cookieStore.get("condition");
  const isVisit = cookieStore.get("isVisit");
  const conditionObj = JSON.parse(condition?.value || "{}");

  return (
    <section className="h-[calc(100dvh-64px)] flex flex-col Expanded:flex-row">
      <Tutorial_Provider maxStage={4} isVisit={isVisit ? true : false}>
        <PlayerCompareProvider
          defaultPlayerLeft={player}
          defaultPlayerRight={simPlayers[0]}
          teamcolors={teamcolors}
        >
          <section className="Expanded:w-[calc(100vw-306px)] h-full Expanded:h-[calc(100dvh-64px)] flex flex-col">
            <section className="px-[16px] relative">
              <Compare />
              <Tutorial_Tooltip
                stageIndex={1}
                explanation="능력치 비교 그래프를 통해 두 선수를 한눈에 비교할 수 있습니다."
                direction="top"
              />
            </section>
            <section className="px-[16px] relative">
              <div className="grid grid-cols-2">
                <div className="grid grid-cols-9 Medium:grid-cols-9">
                  <div className="col-span-3">
                    <SelectStatus type="adaptability" dir="left" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="enhance" dir="left" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="defaultTeamcolor" dir="left" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="enhanceTeamcolor" dir="left" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="affiliation" dir="left" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="feature" dir="left" />
                  </div>
                </div>
                <div className="grid grid-cols-9 Medium:grid-cols-9">
                  <div className="col-span-3">
                    <SelectStatus type="adaptability" dir="right" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="enhance" dir="right" />
                  </div>
                  <div className="col-span-3">
                    <SelectStatus type="defaultTeamcolor" dir="right" />
                  </div>
                  <div className="col-span-3">
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
              <Tutorial_Tooltip
                stageIndex={2}
                explanation="추가 능력치 설정 부분입니다. 적응도-강화-팀컬러를 통해 선수의 추가 능력치를 설정할 수 있습니다."
                direction="top"
              />
            </section>
            <section className="relative grow shrink">
              <div className="absolute inset-0">
                <CompareTable />
              </div>
              <Tutorial_Tooltip
                stageIndex={3}
                explanation="능력치, 가격 비교 테이블입니다. 좌우로 스크롤하여 비교할 수 있습니다."
                direction="bottom"
              />
            </section>
          </section>
          <section className="pl-[16px] Expanded:pl-0 Expanded:w-[306px] Large:w-[612px] relative">
            <Tutorial_Tooltip
              stageIndex={4}
              explanation="유사선수 리스트입니다. 오른쪽클릭(모바일 길게 터치)을 통해 선수 비교를 변경하거나 스쿼드 추가가 가능합니다."
              direction="bottom"
              expandedDirection="right"
            />
            <PlayerScroll_Provider
              defaultCondition={conditionObj}
              teamcolors={teamcolors}
            >
              <div className="absolute z-30 top-1 left-1">
                <PlayerScroll_Filter />
              </div>
              <PlayerScroll_Scroll players={[player, ...simPlayers]} />
            </PlayerScroll_Provider>
          </section>
        </PlayerCompareProvider>
      </Tutorial_Provider>
    </section>
  );
};
export default PlayerSpid;
