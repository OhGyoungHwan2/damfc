import { number2physical } from "@/lib/const";
import { position2color } from "@/lib/cssfuntion";
import { cn } from "@/lib/utils";

interface PlayerInfoProps {
  player: {
    pay: number;
    height: number;
    weight: number;
    mainfoot: number;
    weakfoot: number;
    physical: number;
    position: string;
    skillmove: number;
    ovr: number;
  };
  alignItems?: string;
  addAll?: number;
  enhance?: number;
}
const PlayerInfo: React.FC<PlayerInfoProps> = ({
  player,
  alignItems = "items-start",
  addAll,
  enhance,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col text-muted-foreground font-medium text-[0.875rem] Medium:text-[1rem] leading-none",
        alignItems
      )}
    >
      {/* 포지션 오버롤 급여 */}
      <span>
        <span className={position2color(player.position)}>
          {player.position}
        </span>
        <span>{player.ovr + (addAll || 0)}</span>
        {` 급여 ${player.pay}`}
      </span>
      {/* 키 몸무게 */}
      <span>{`${player.height}cm ${player.weight}kg`}</span>
      {/* 양발 체형 */}
      <span>
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
      </span>
      {/* 개인기 */}
      <span className="text-[#fc0]">
        {"".padEnd(
          player.skillmove + (enhance || 0 > 4 ? 1 : enhance || 0 > 7 ? 2 : 0),
          "★"
        )}
      </span>
    </div>
  );
};

export default PlayerInfo;
