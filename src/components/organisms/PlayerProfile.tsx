import { cn } from "@/lib/utils";
import Enhancement from "../molecules/Enhancement";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { spPosition2Position } from "@/lib/const";
import { position2color } from "@/lib/cssfuntion";

interface Player {
  id: number;
  season: string;
  name: string;
  imgId: string;
}

interface PlayerProfileProps {
  player: Player | null;
  widthClassName?: string;
  position?: number;
  grade?: number;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({
  player,
  widthClassName = "w-[48px] Large:w-[64px]",
  position,
  grade,
}) => {
  if (!player) return null;

  const renderPosition = () => {
    if (position === undefined) return null;
    const positionName = spPosition2Position[position]?.toUpperCase();
    if (!positionName) return null;
    return (
      <div className={`text-xs Medium:text-sm ${position2color(positionName)}`}>
        {positionName}
      </div>
    );
  };

  const renderGrade = () => {
    if (!grade) return null;
    return <Enhancement enhance={grade} className="px-0.5 Medium:px-2" />;
  };

  return (
    <div className={cn("relative flex flex-col items-center", widthClassName)}>
      <ImageAspectRatio
        imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${player.imgId}.AVIF?raw=true`}
        width={"100%"}
        alt={`${player.season}${player.name}이미지`}
      />
      <div className="flex items-center pt-0.5 gap-0.5 font-extrabold text-foreground">
        <ImageAspectRatio
          imgSrc={`/season/${player.season}.png`}
          width={18}
          alt={`${player.season}이미지`}
        />
        <small className="w-full truncate bg-background">{player.name}</small>
      </div>
      <div className="absolute top-0 flex flex-col items-start gap-1 -left-3">
        {renderPosition()}
        {renderGrade()}
      </div>
    </div>
  );
};

export default PlayerProfile;
