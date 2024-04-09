"use client";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { TSelectAddStatus } from "@/lib/const";
import { createContext, useContext, useState } from "react";

type PlayerCompareType = {
  playerLeft: TGETPlayer["player"];
  setPlayerLeft: (value: TGETPlayer["player"]) => void;
  playerRight: TGETPlayer["player"];
  setPlayerRight: (value: TGETPlayer["player"]) => void;
  leftAddStatus: TSelectAddStatus;
  setLeftAddStatus: (value: TSelectAddStatus) => void;
  rightAddStatus: TSelectAddStatus;
  setRightAddStatus: (value: TSelectAddStatus) => void;
  teamcolors: TGETPlayer["teamcolors"];
};

const PlayerCompareContext = createContext<PlayerCompareType>({
  playerLeft: {} as TGETPlayer["player"],
  setPlayerLeft: () => {},
  playerRight: {} as TGETPlayer["player"],
  setPlayerRight: () => {},
  leftAddStatus: {},
  setLeftAddStatus: () => {},
  rightAddStatus: {},
  setRightAddStatus: () => {},
  teamcolors: {} as TGETPlayer["teamcolors"],
});

export const PlayerCompareProvider: React.FC<{
  children: React.ReactNode;
  defaultPlayerLeft: TGETPlayer["player"];
  defaultPlayerRight: TGETPlayer["player"];
  teamcolors: TGETPlayer["teamcolors"];
}> = ({ children, defaultPlayerLeft, defaultPlayerRight, teamcolors }) => {
  const [playerLeft, setPlayerLeft] =
    useState<TGETPlayer["player"]>(defaultPlayerLeft);
  const [playerRight, setPlayerRight] =
    useState<TGETPlayer["player"]>(defaultPlayerRight);
  const [leftAddStatus, setLeftAddStatus] = useState<TSelectAddStatus>({});
  const [rightAddStatus, setRightAddStatus] = useState<TSelectAddStatus>({});

  const onChangePlayerLeft = (player: TGETPlayer["player"]) =>
    setPlayerLeft({ ...player });
  const onChangePlayerRight = (player: TGETPlayer["player"]) =>
    setPlayerRight({ ...player });

  return (
    <PlayerCompareContext.Provider
      value={{
        playerLeft,
        setPlayerLeft: onChangePlayerLeft,
        playerRight,
        setPlayerRight: onChangePlayerRight,
        leftAddStatus,
        setLeftAddStatus,
        rightAddStatus,
        setRightAddStatus,
        teamcolors,
      }}
    >
      {children}
    </PlayerCompareContext.Provider>
  );
};

export const usePlayerCompareContext = () => useContext(PlayerCompareContext);
