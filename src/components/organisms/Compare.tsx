"use client";

import { usePlayerCompareContext } from "@/context/store";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import PlayerInfo from "./PlayerInfo";
import { cn } from "@/lib/utils";
import Radar1To1 from "../molecules/Radar1To1";
import {
  TAddStatus,
  TAddStatusSelectCategory,
  TAllStatus,
  TSelectAddStatus,
  status,
  statusGK,
  traitKey2kr,
} from "@/lib/const";
import TraitImage from "./TraitImage";

const Compare: React.FC = () => {
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext();
  const statusKey = playerLeft.position === "GK" ? statusGK : status;

  // 계산
  const pickStatus = (player: TGETPlayer["player"], keys: string[]) => {
    return Object.fromEntries(
      keys.map((key) => [key, player[key as keyof typeof statusKey]])
    );
  };

  const createAddPoint = (addStatus: TSelectAddStatus) => {
    const tempAddStatus = Object.values(addStatus).reduce<TAddStatus>(
      (allAddStatus, addStatus) => {
        Object.entries(addStatus).forEach(([key, value]) => {
          const statusKey = key as keyof typeof allAddStatus;
          const defaultValue = allAddStatus[statusKey] ?? 0;
          allAddStatus[statusKey] = defaultValue + value;
        });
        return allAddStatus;
      },
      {}
    );
    return { ...tempAddStatus };
  };

  return (
    <div className="grid items-center grid-cols-3">
      <div className="overflow-hidden">
        <PlayerOverview player={playerLeft} addStatus={leftAddStatus} />
      </div>
      <div className="w-full Medium:w-[144px] mx-auto">
        <Radar1To1
          target1={pickStatus(playerLeft, Object.keys(statusKey))}
          target2={pickStatus(playerRight, Object.keys(statusKey))}
          target1Name={`${playerLeft.season}${playerLeft.name}`}
          target2Name={`${playerRight.season}${playerRight.name}`}
          viewKeys={statusKey}
          target1AddPoint={createAddPoint(leftAddStatus)}
          target2AddPoint={createAddPoint(rightAddStatus)}
        />
      </div>
      <div className="overflow-hidden">
        <PlayerOverview
          player={playerRight}
          addStatus={rightAddStatus}
          reverse
        />
      </div>
    </div>
  );
};

const PlayerOverview: React.FC<{
  player: TGETPlayer["player"];
  addStatus: Partial<
    Record<TAddStatusSelectCategory, Partial<Record<TAllStatus, number>>>
  >;
  reverse?: boolean;
}> = ({ player, addStatus, reverse }) => {
  const addAll =
    (addStatus["adaptability"]?.all || 0) +
    (addStatus["enhance"]?.all || 0) +
    (addStatus["enhanceTeamcolor"]?.all || 0) +
    (addStatus["affiliation"]?.all || 0);
  const enhance =
    addStatus["enhance"]?.all || 0 > 14
      ? 8
      : addStatus["enhance"]?.all || 0 > 5
      ? 5
      : 1;
  return (
    <div className={cn("flex flex-col", reverse ? "items-end" : "items-start")}>
      <ImageAspectRatio
        imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${player.imgId}.AVIF?raw=true`}
        width={64}
        alt={`${player.season}${player.name}이미지`}
      />
      <PlayerInfo
        player={player}
        reverse={reverse}
        addAll={addAll}
        enhance={enhance}
      />
      <div
        className={cn(
          "w-full flex flex-wrap h-[36px]",
          reverse && "flex-row-reverse"
        )}
      >
        {Object.keys(traitKey2kr).map((key) =>
          player[key as keyof typeof traitKey2kr] ? (
            <TraitImage key={key} traitKey={key as keyof typeof traitKey2kr} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Compare;
