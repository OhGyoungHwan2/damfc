import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { bp2string } from "@/lib/cssfuntion";
import { cn } from "@/lib/utils";
import Enhancement from "../molecules/Enhancement";
import PlayerInfo from "./PlayerInfo";

interface Player {
  id: number;
  name: string;
  season: string;
  imgId: string;
  ovr: number;
  position: string;
  pay: number;
  mainfoot: number;
  weakfoot: number;
  physical: number;
  weight: number;
  height: number;
  skillmove: number;
  bp1: number | null;
  bp3: number | null;
  bp5: number | null;
  bp8: number | null;
}

interface PlayerCardProps {
  player: Player | null;
  isBp?: boolean;
  reverse?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isBp, reverse }) => {
  if (!player) return null;

  const renderBpInfo = () => {
    if (!isBp) return null;

    const bps = [player.bp1, player.bp3, player.bp5, player.bp8];
    return (
      <div className="grid grid-cols-2 items-start gap-0.5">
        {[1, 3, 5, 8].map((enhance, idx) => (
          <small key={`bp${enhance}`} className="flex items-center">
            <Enhancement enhance={enhance} className="px-2" />
            {bp2string(bps[idx] || 0)}
          </small>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-1 max-w-[328px] truncate",
        reverse && "flex-row-reverse"
      )}
    >
      <PlayerCardThumbnail
        imgId={player.imgId}
        season={player.season}
        name={player.name}
        isBp={isBp}
      />
      <div className={cn("flex flex-col")}>
        <PlayerCardInfo player={player} reverse={reverse} />
        {renderBpInfo()}
      </div>
    </div>
  );
};

interface PlayerCardThumbnailProps {
  imgId: string;
  season: string;
  name: string;
  isBp?: boolean;
}

const PlayerCardThumbnail: React.FC<PlayerCardThumbnailProps> = ({
  imgId,
  season,
  name,
  isBp,
}) => {
  return (
    <div className="relative">
      <ImageAspectRatio
        imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${imgId}.AVIF?raw=true`}
        width={isBp ? 110 : 64}
        alt={`${season}${name}이미지`}
      />
    </div>
  );
};

interface PlayerCardInfoProps {
  player: Player;
  reverse?: boolean;
}

const PlayerCardInfo: React.FC<PlayerCardInfoProps> = ({ player, reverse }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between text-muted-foreground grow shrink",
        reverse ? "items-end" : "items-start"
      )}
    >
      <div className="flex items-center gap-0.5 font-extrabold text-foreground">
        <ImageAspectRatio
          imgSrc={`/season/${player.season}.png`}
          width={20}
          alt={`${player.season}이미지`}
        />
        {player.name}
      </div>
      <PlayerInfo player={player} />
    </div>
  );
};

export default PlayerCard;
