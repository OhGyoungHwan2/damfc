"use client";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { TRecommend } from "@/app/api/recommend/route";
import { TSelectAddStatus } from "@/lib/const";
import { createContext, useContext, useEffect, useState } from "react";

// 비교 State

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

// 스쿼드 State

type enhancePlayer = {
  enhance: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  player: TGETPlayer["player"] | TRecommend["player"];
};

export type SquadType = {
  squadPlayers: enhancePlayer[];
  onAddSquadPlayer: (
    player: TGETPlayer["player"] | TRecommend["player"]
  ) => void;
  onChangeEnhance: (idx: number, enhance: enhancePlayer["enhance"]) => void;
  onDeletePlayer: (idx: number) => void;
  onUpdateSquadPlayers: () => void;
  onClear: () => void;
};

const SquadContext = createContext<SquadType>({
  squadPlayers: [] as SquadType["squadPlayers"],
  onAddSquadPlayer: () => {},
  onChangeEnhance: () => {},
  onDeletePlayer: () => {},
  onUpdateSquadPlayers: () => {},
  onClear: () => {},
});

export const SquadProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [squadPlayers, setSquadPlayers] = useState<SquadType["squadPlayers"]>(
    [] as SquadType["squadPlayers"]
  );

  const onAddSquadPlayer = (
    player: TGETPlayer["player"] | TRecommend["player"]
  ) => setSquadPlayers((pre) => [...pre, { player: player, enhance: 1 }]);

  const onChangeEnhance = (idx: number, enhance: enhancePlayer["enhance"]) =>
    setSquadPlayers((pre) => {
      pre[idx].enhance = enhance;
      return [...pre];
    });

  const onDeletePlayer = (idx: number) =>
    setSquadPlayers((pre) => {
      pre.splice(idx, 1);
      return [...pre];
    });

  const onClear = () => {
    window.localStorage.setItem("squadPlayers", "[]");
    setSquadPlayers([]);
  };

  const onUpdateSquadPlayers = () => {
    const myStorageSquadPlayers = window.localStorage.getItem("squadPlayers");
    const tempSquadPlayers = JSON.parse(
      myStorageSquadPlayers || "[]"
    ) as SquadType["squadPlayers"];
    tempSquadPlayers.length > 0 && setSquadPlayers([...tempSquadPlayers]);
  };

  useEffect(() => {
    onUpdateSquadPlayers();
  }, []);

  useEffect(() => {
    squadPlayers &&
      window.localStorage.setItem("squadPlayers", JSON.stringify(squadPlayers));
  }, [JSON.stringify(squadPlayers)]);

  return (
    <SquadContext.Provider
      value={{
        squadPlayers,
        onAddSquadPlayer,
        onChangeEnhance,
        onDeletePlayer,
        onUpdateSquadPlayers,
        onClear,
      }}
    >
      {children}
    </SquadContext.Provider>
  );
};

export const useSquadContext = () => useContext(SquadContext);
