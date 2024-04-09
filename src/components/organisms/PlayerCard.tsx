import { TRecommend } from "@/app/api/recommend/route";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import PlayerInfo from "./PlayerInfo";

interface PlayerCardProps {
  player: TRecommend["player"];
  isBp?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isBp }) => {
  if (!player) return null;
  return (
    <div className="flex gap-1 w-[306px] overflow-hidden">
      <PlayerCardThumbnail
        imgId={player.imgId}
        season={player.season}
        name={player.name}
        isBp={isBp}
      />
      <PlayerInfo player={player} isBp={isBp} />
    </div>
  );
};

const PlayerCardThumbnail: React.FC<{
  imgId: string;
  season: string;
  name: string;
  isBp?: boolean;
}> = ({ imgId, season, name, isBp }) => {
  return (
    <div className="relative">
      <ImageAspectRatio
        imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${imgId}.AVIF?raw=true`}
        width={isBp ? 110 : 80}
        alt={`${season}${name}이미지`}
      />
    </div>
  );
};

export default PlayerCard;
