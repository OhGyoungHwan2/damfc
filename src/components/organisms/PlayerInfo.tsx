import { number2physical } from "@/lib/const";
import { bp2string, position2color } from "@/lib/cssfuntion";
import { cn } from "@/lib/utils";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import Enhancement from "../molecules/Enhancement";
import { TRecommend } from "@/app/api/recommend/route";

interface PlayerInfoProps {
  player: TRecommend["player"];
  addAll?: number;
  enhance?: number;
  reverse?: boolean;
  isBp?: boolean;
}
const PlayerInfo: React.FC<PlayerInfoProps> = ({
  player,
  addAll,
  enhance,
  reverse,
  isBp,
}) => {
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
        "w-full flex flex-col text-muted-foreground font-medium text-sm justify-start leading-none",
        reverse ? "items-end" : "items-start"
      )}
    >
      {/* 시즌 이름 */}
      <div
        className={cn("flex items-center gap-1", reverse && "flex-row-reverse")}
      >
        <ImageAspectRatio
          imgSrc={`/season/${player.season}.png`}
          width={20}
          alt={`${player.season}이미지`}
          className="inline-block"
        />
        <span className="text-base font-extrabold text-foreground text-nowrap">
          {player.name}
        </span>
      </div>
      {/* 포지션 오버롤 급여 */}
      <div>
        <span className={position2color(player.position)}>
          {player.position}
        </span>
        <span>{player.ovr + (addAll || 0)}</span>
        {` 급여 ${player.pay}`}
      </div>
      {/* 키 몸무게 */}
      <span>{`${player.height}cm ${player.weight}kg`}</span>
      {/* 양발 체형 */}
      <div>
        <span className={cn(player.mainfoot == 1 && "text-primary")}>
          {`${player.mainfoot == 1 ? 5 : player.weakfoot}`}
        </span>
        <span>-</span>
        <span className={cn(player.mainfoot == -1 && "text-primary")}>
          {`${player.mainfoot == -1 ? 5 : player.weakfoot}`}
        </span>
        <span>{` ${
          number2physical[player.physical as 0 | 1 | 2 | 3 | 4 | 5]
        }`}</span>
      </div>
      {/* 개인기 */}
      <div className="text-[#fc0]">
        {"".padEnd(
          player.skillmove + (enhance || 0 > 4 ? 1 : enhance || 0 > 7 ? 2 : 0),
          "★"
        )}
      </div>
      {/* BP */}
      {renderBpInfo()}
    </div>
  );
};

export default PlayerInfo;
