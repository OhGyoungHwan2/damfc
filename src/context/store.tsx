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
});

export const PlayerCompareProvider: React.FC<{
  children: React.ReactNode;
  defaultPlayerLeft: TGETPlayer["player"];
  defaultPlayerRight: TGETPlayer["player"];
}> = ({ children, defaultPlayerLeft, defaultPlayerRight }) => {
  const [playerLeft, setPlayerLeft] =
    useState<TGETPlayer["player"]>(defaultPlayerLeft);
  const [playerRight, setPlayerRight] =
    useState<TGETPlayer["player"]>(defaultPlayerRight);
  const [leftAddStatus, setLeftAddStatus] = useState<TSelectAddStatus>({});
  const [rightAddStatus, setRightAddStatus] = useState<TSelectAddStatus>({});

  return (
    <PlayerCompareContext.Provider
      value={{
        playerLeft,
        setPlayerLeft,
        playerRight,
        setPlayerRight,
        leftAddStatus,
        setLeftAddStatus,
        rightAddStatus,
        setRightAddStatus,
      }}
    >
      {children}
    </PlayerCompareContext.Provider>
  );
};

export const usePlayerCompareContext = () => useContext(PlayerCompareContext);
