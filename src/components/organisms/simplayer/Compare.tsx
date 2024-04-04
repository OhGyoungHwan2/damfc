"use client";

import ImageAspectRatio from "@/components/molecules/ImageAspectRatio";
import { usePlayerCompareContext } from "@/context/store";
import PlayerInfo from "../PlayerInfo";
import Radar1To1 from "@/components/molecules/Radar1To1";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import {
  TAddStatus,
  TSelectAddStatus,
  status,
  statusGK,
  traitKeys,
} from "@/lib/const";

interface ComparePlayerCardProps {
  type: "left" | "right";
}
export const ComparePlayerCard: React.FC<ComparePlayerCardProps> = ({
  type,
}) => {
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext();
  const player = type === "left" ? playerLeft : playerRight;
  const addStatus = type === "left" ? leftAddStatus : rightAddStatus;
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
    <div className="flex flex-col items-center justify-start gap-1 size-full">
      <div className="w-1/3 Medium:w-1/4">
        <ImageAspectRatio
          key={`${player.id}`}
          imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${player.imgId}.AVIF?raw=true`}
          width={"100%"}
          alt={`${player.season}${player.name}이미지`}
        />
      </div>
      <PlayerInfo
        player={player}
        alignItems="items-center"
        addAll={addAll}
        enhance={enhance}
      />
      <div className="flex flex-wrap justify-center">
        {traitKeys.map((traitKey) => {
          const imgSrc = `/trait/trait_icon_${traitKey
            .replace("trait", "")
            .padStart(2, "0")}.png`;
          return player[traitKey] ? (
            <ImageAspectRatio
              key={`${traitKey}Image`}
              imgSrc={imgSrc}
              width={20}
              alt={`${traitKey}이미지`}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

interface CompareRadarProps {
  isGK?: boolean;
}
export const CompareRadar: React.FC<CompareRadarProps> = ({ isGK }) => {
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext();

  const statusKey = isGK ? statusGK : status;
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
    <Radar1To1
      target1={pickStatus(playerLeft, Object.keys(statusKey))}
      target2={pickStatus(playerRight, Object.keys(statusKey))}
      target1Name={playerLeft.name}
      target2Name={playerRight.name}
      viewKeys={status}
      target1AddPoint={createAddPoint(leftAddStatus)}
      target2AddPoint={createAddPoint(rightAddStatus)}
    />
  );
};
