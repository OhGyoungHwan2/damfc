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

type enhancePlayer = {
  enhance: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  player?: TGETPlayer["player"];
};

export type SquadType = {
  squadPlayers: {
    "1": enhancePlayer;
    "2": enhancePlayer;
    "3": enhancePlayer;
    "4": enhancePlayer;
    "5": enhancePlayer;
    "6": enhancePlayer;
    "7": enhancePlayer;
    "8": enhancePlayer;
    "9": enhancePlayer;
    "10": enhancePlayer;
    GK: enhancePlayer;
  };
  onChangeSquadPlayer: (
    player: TGETPlayer["player"],
    idx: keyof SquadType["squadPlayers"]
  ) => void;
  onChangeEnhance: (
    idx: keyof SquadType["squadPlayers"],
    enhance: enhancePlayer["enhance"]
  ) => void;
  onDeletePlayer: (idx: keyof SquadType["squadPlayers"]) => void;
};

const SquadContext = createContext<SquadType>({
  squadPlayers: {
    "1": { enhance: 1 },
    "2": { enhance: 1 },
    "3": { enhance: 1 },
    "4": { enhance: 1 },
    "5": { enhance: 1 },
    "6": { enhance: 1 },
    "7": { enhance: 1 },
    "8": { enhance: 1 },
    "9": { enhance: 1 },
    "10": { enhance: 1 },
    GK: { enhance: 1 },
  } as SquadType["squadPlayers"],
  onChangeSquadPlayer: () => {},
  onChangeEnhance: () => {},
  onDeletePlayer: () => {},
});

export const SquadProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [squadPlayers, setSquadPlayers] = useState<SquadType["squadPlayers"]>({
    "1": { enhance: 1 },
    "2": { enhance: 1 },
    "3": { enhance: 1 },
    "4": { enhance: 1 },
    "5": { enhance: 1 },
    "6": { enhance: 1 },
    "7": { enhance: 1 },
    "8": { enhance: 1 },
    "9": { enhance: 1 },
    "10": { enhance: 1 },
    GK: { enhance: 1 },
  } as SquadType["squadPlayers"]);

  const onChangeSquadPlayer = (
    player: TGETPlayer["player"],
    idx: keyof SquadType["squadPlayers"]
  ) =>
    setSquadPlayers((pre) => ({
      ...pre,
      [idx]: { player: player, enhance: 1 },
    }));

  const onChangeEnhance = (
    idx: keyof SquadType["squadPlayers"],
    enhance: enhancePlayer["enhance"]
  ) =>
    setSquadPlayers((pre) => ({
      ...pre,
      [idx]: { ...pre[idx], enhance: enhance },
    }));

  const onDeletePlayer = (idx: keyof SquadType["squadPlayers"]) =>
    setSquadPlayers((pre) => ({
      ...pre,
      [idx]: { enhance: 1 },
    }));

  return (
    <SquadContext.Provider
      value={{
        squadPlayers,
        onChangeSquadPlayer,
        onChangeEnhance,
        onDeletePlayer,
      }}
    >
      {children}
    </SquadContext.Provider>
  );
};

export const useSquadContext = () => useContext(SquadContext);
