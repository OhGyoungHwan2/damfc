import { spPosition2Position } from "@/lib/const";
import { position2color } from "@/lib/cssfuntion";
import { TGETRanker } from "@/app/api/ranker/route";
import Enhancement from "../molecules/Enhancement";
import ImageAspectRatio from "../molecules/ImageAspectRatio";

interface PlayerProfileProps {
  player: TGETRanker["rankers"][""]["players"][0];
  position?: number;
  grade?: number;
}

const PlayerPosition: React.FC<PlayerProfileProps> = ({
  player,
  position,
  grade,
}) => {
  if (!player.player) return null;

  const playerInfo = player.player;

  const renderPosition = () => {
    if (position === undefined) return null;
    const positionName = spPosition2Position[position]?.toUpperCase();
    if (!positionName) return null;
    return (
      <div className={`text-sm leading-none ${position2color(positionName)}`}>
        {positionName}
      </div>
    );
  };

  const renderGrade = () => {
    if (!grade) return null;
    return <Enhancement enhance={grade} className="px-0.5 Medium:px-2" />;
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative px-2">
        <ImageAspectRatio
          imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${playerInfo.imgId}.AVIF?raw=true`}
          width={64}
          alt={`${playerInfo.season}${playerInfo.name}이미지`}
        />
        <div className="absolute bottom-0 inset-x-0 flex justify-between items-end">
          {renderPosition()}
          {renderGrade()}
        </div>
      </div>
      <div className="flex z-10 items-center gap-0.5 font-extrabold text-foreground">
        <ImageAspectRatio
          imgSrc={`/season/${playerInfo.season}.png`}
          width={18}
          alt={`${playerInfo.season}이미지`}
        />
        <small className="bg-background text-nowrap">{playerInfo.name}</small>
      </div>
    </div>
  );
};

export default PlayerPosition;
