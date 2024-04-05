"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PlayerCard from "../PlayerCard";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import StateLayer from "@/components/atoms/StateLayer";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Select from "@/components/molecules/Select";
import { Button } from "@/components/ui/button";
import { status, statusGK } from "@/lib/const";
import { usePlayerCompareContext } from "@/context/store";
import { deleteCookies, setCookies } from "@/lib/actions";

type allCondition =
  | keyof typeof status
  | keyof typeof statusGK
  | "affiliation"
  | "feature"
  | "mainfoot"
  | "weakfoot"
  | "physical";

export type TCondition = Partial<
  Record<
    allCondition,
    | string
    | number
    | {
        min: number;
        max: number;
      }
  >
>;

type PlayerScrollType = {
  condition: TCondition;
  setCondition: Dispatch<
    SetStateAction<
      Partial<
        Record<
          allCondition,
          | string
          | number
          | {
              min: number;
              max: number;
            }
        >
      >
    >
  >;
};
const PlayerScrollContext = createContext<PlayerScrollType>({
  condition: {},
  setCondition: () => {},
});

const usePlayerScrollContext = () => useContext(PlayerScrollContext);

interface PlayerScrollProps {
  players: TGETPlayer["simPlayers"];
  teamcolors: TGETPlayer["teamcolors"];
}
export const PlayerScroll: React.FC<PlayerScrollProps> = ({
  players,
  teamcolors,
}) => {
  // 데이터
  const { setPlayerLeft, setPlayerRight } = usePlayerCompareContext();
  const { condition } = usePlayerScrollContext();
  const name2affiliationteamcolorId = Object.fromEntries(
    Object.entries(teamcolors.affiliation).map(([key, teamcolor]) => [
      teamcolor.name,
      parseInt(key),
    ])
  );
  const name2featureteamcolorId = Object.fromEntries(
    Object.entries(teamcolors.feature).map(([key, teamcolor]) => [
      teamcolor.name,
      parseInt(key),
    ])
  );
  // 계산
  const playerFilter = (
    players: { player: TGETPlayer["simPlayers"][0]; node: React.ReactNode }[]
  ) => {
    return players.filter(({ player }) => {
      const booleans = Object.entries(condition).map(([key, value]) => {
        if (["affiliation", "feature"].includes(key)) {
          return (
            player.teamcolors[key as "affiliation" | "feature"].includes(
              (key === "affiliation"
                ? name2affiliationteamcolorId
                : name2featureteamcolorId)[value as string]
            ) || (value as string) === ""
          );
        } else if (typeof value === "number") {
          return (
            player[key as "mainfoot" | "weakfoot" | "physical"] ===
            (value as number)
          );
        } else {
          return (
            (value as { min: number; max: number }).min <=
              player[key as keyof typeof status | keyof typeof statusGK] &&
            (value as { min: number; max: number }).max >=
              player[key as keyof typeof status | keyof typeof statusGK]
          );
        }
      });
      return booleans.reduce((tf, value) => tf && value, true);
    });
  };
  // 액션
  return (
    <ScrollArea>
      <div className="grid grid-flow-col grid-rows-1 gap-4 Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:grid-flow-row Expanded:h-[calc(100vh-100px)] w-max Expanded:w-[360px]">
        {playerFilter(
          players.map((player, idx) => ({
            player: player,
            node: (
              <StateLayer key={player.id} className="bg-foreground">
                <Dialog>
                  <DialogTrigger className="relative">
                    <div className="absolute top-0 left-0">{idx + 1}</div>
                    <PlayerCard player={player} isBp />
                  </DialogTrigger>
                  <DialogContent className="w-[300px] flex gap-2">
                    <Button onClick={() => setPlayerLeft(player)}>
                      왼쪽교체
                    </Button>
                    <Button onClick={() => setPlayerRight(player)}>
                      오른쪽교체
                    </Button>
                  </DialogContent>
                </Dialog>
              </StateLayer>
            ),
          }))
        ).map((player) => player.node)}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const PlayerScrollFilter: React.FC<{
  selectItems: { value: string; node: React.ReactNode }[];
  type: "affiliation" | "feature";
}> = ({ selectItems, type }) => {
  const { setCondition } = usePlayerScrollContext();
  const onSelctCallback = (value: string) =>
    setCondition((pre) => ({ ...pre, [type]: value.toUpperCase() }));
  return (
    <Select
      defaultValue=""
      selectItems={selectItems}
      onSelctCallback={onSelctCallback}
    />
  );
};

export const PlayerScrollProvider: React.FC<{
  children: React.ReactNode;
  defaultCondition?: TCondition;
}> = ({ children, defaultCondition }) => {
  const [condition, setCondition] = useState<TCondition>(
    defaultCondition || {}
  );
  return (
    <PlayerScrollContext.Provider
      value={{
        condition,
        setCondition,
      }}
    >
      {children}
    </PlayerScrollContext.Provider>
  );
};

export const PlayerScrollFilterReset: React.FC = () => {
  const { setCondition } = usePlayerScrollContext();
  const onClickButton = () => (
    setCondition(Object.assign({})),
    deleteCookies("condition"),
    alert("초기화 완료")
  );
  return (
    <Button onClick={onClickButton} className="w-[50px]">
      초기화
    </Button>
  );
};

export const PlayerScrollFilterFix: React.FC = () => {
  const { condition } = usePlayerScrollContext();
  const onClickButton = () => (
    setCookies("condition", condition), alert("고정 완료")
  );
  return (
    <Button onClick={onClickButton} className="w-[50px]">
      고정
    </Button>
  );
};
