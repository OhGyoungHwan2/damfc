"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PlayerCard from "../PlayerCard";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import StateLayer from "@/components/atoms/StateLayer";
import { createContext, useContext, useState } from "react";
import Combobox from "@/components/molecules/Combobox";
import { Button } from "@/components/ui/button";

type PlayerScrollType = {
  value: string;
  onSelctCallback: (value: string) => void;
};
const PlayerScrollContext = createContext<PlayerScrollType>({
  value: "",
  onSelctCallback: () => {},
});

const usePlayerScrollContext = () => useContext(PlayerScrollContext);

interface PlayerScrollProps {
  players: TGETPlayer["simPlayers"];
  teamcolors: TGETPlayer["teamcolors"]["affiliation"];
}
export const PlayerScroll: React.FC<PlayerScrollProps> = ({
  players,
  teamcolors,
}) => {
  const { value } = usePlayerScrollContext();
  const name2teamcolorId = Object.fromEntries(
    Object.entries(teamcolors).map(([key, teamcolor]) => [
      teamcolor.name,
      parseInt(key),
    ])
  );
  return (
    <ScrollArea>
      <div className="grid grid-flow-col grid-rows-1 gap-4 Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:grid-flow-row Expanded:h-[calc(100vh-100px)] w-max Expanded:w-[360px]">
        {players
          .filter(
            (player) =>
              player.teamcolors.affiliation.includes(name2teamcolorId[value]) ||
              value === ""
          )
          .map((player) => (
            <StateLayer key={player.id} className="bg-foreground">
              <PlayerCard player={player} isBp />
            </StateLayer>
          ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const PlayerScrollFilter: React.FC<{
  commandItems: { value: string; node: React.ReactNode }[];
}> = ({ commandItems }) => {
  const { onSelctCallback } = usePlayerScrollContext();
  return (
    <Combobox
      defaultValue=""
      commandItems={commandItems}
      onSelctCallback={onSelctCallback}
    />
  );
};

export const PlayerScrollProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [value, setValue] = useState("");
  const onSelctCallback = (value: string) => setValue(value.toUpperCase());
  return (
    <PlayerScrollContext.Provider
      value={{
        value,
        onSelctCallback,
      }}
    >
      {children}
    </PlayerScrollContext.Provider>
  );
};

export const PlayerScrollFilterReset: React.FC = () => {
  const { onSelctCallback } = usePlayerScrollContext();
  const onClickButton = () => onSelctCallback("");
  return (
    <Button onClick={onClickButton} className="w-[50px]">
      초기화
    </Button>
  );
};
