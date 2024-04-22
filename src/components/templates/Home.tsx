import { TGETRanker } from "@/app/api/ranker/route";
import { TGETRecommend, TRecommend } from "@/app/api/recommend/route";
import {
  SelectTabs_Provider,
  SelectTabs_Select,
  SelectTabs_Tabs,
} from "../molecules/SelectTabs";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import StateLayer from "../atoms/StateLayer";
import PlayerCard from "../organisms/PlayerCard";
import Stadium from "../organisms/Stadium";
import PlayerPosition from "../organisms/PlayerPosition";
import { SquadAddPlayer } from "../organisms/SquadMaker";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const Home: React.FC<{
  responseRecommend: TGETRecommend;
  responseRanker: TGETRanker;
}> = ({ responseRecommend, responseRanker }) => {
  //데이터
  const { positions, seasons, recommendPositions, recommendSeasons } =
    responseRecommend;
  const { rankers, keyboardRankers, gamepadRankers, etcRankers } =
    responseRanker;

  //계산
  const createSelectItems = (values: string[], type?: "season" | "ranker") =>
    values.map((value) => {
      const renderTag = () => {
        if (type === undefined) return null;
        if (type === "season")
          return (
            <ImageAspectRatio
              width={20}
              imgSrc={`/season/${value.toLowerCase()}.png`}
              alt={`${value}이미지`}
            />
          );
        if (type === "ranker")
          return (
            <small className="text-xs text-nowrap text-muted-foreground">
              {rankers[value].controller === "keyboard"
                ? "키보드"
                : rankers[value].controller === "gamepad"
                ? "패드"
                : "기타"}
            </small>
          );
        return null;
      };
      return {
        value: value,
        node: (
          <div
            key={value}
            className="flex py-1 items-center text-foreground gap-x-0.5 relative text-lg"
          >
            {renderTag()}
            {value}
          </div>
        ),
      };
    });

  const createTabItems = (recommendRecord: Record<string, TRecommend[]>) => {
    return Object.entries(recommendRecord).map(([key, recommends]) => ({
      value: key,
      node: (
        <ScrollArea
          key={key}
          className="max-w-full whitespace-nowrap mt-[16px] mb-[24px]"
        >
          <div className="grid grid-rows-2 grid-flow-col w-max gap-y-[16px] gap-x-[32px] Large:gap-x-[64px]">
            {recommends.map((recommend) => (
              <Link
                key={`${recommend.id}Link`}
                href={`/player/${recommend.playerId}`}
                target="_blank"
              >
                <StateLayer className="bg-foreground">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <PlayerCard player={recommend.player} isBp />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <SquadAddPlayer player={recommend.player}>
                          스쿼드 추가
                        </SquadAddPlayer>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </StateLayer>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ),
    }));
  };

  const createStadiums = (rankerRecord: TGETRanker["rankers"]) => {
    return Object.entries(rankerRecord).map(([key, rankers]) => {
      const positionItems = Object.fromEntries(
        rankers.players.map((player) => [
          player.position,
          <Link
            href={`/player/${player.playerId}`}
            key={`${player.playerId}Link`}
            target="_blank"
          >
            <PlayerPosition
              player={player}
              grade={player.grade}
              position={player.position}
            />
          </Link>,
        ])
      );
      return {
        value: key.toUpperCase(),
        node: <Stadium positionItems={positionItems} />,
      };
    });
  };

  return (
    <section>
      <h2 className="px-[16px] Expanded:px-[62px] Large:px-[106px] pt-[16px] pb-[24px]">
        최고의 선수찾기!
      </h2>
      {/* 랭커 픽율 포지션별 SelectTabs */}
      <section className="relative">
        <SelectTabs_Provider defaultValue={positions[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px] pt-[16px] pb-[24px]">
            <small className="text-muted-foreground">{`포지션별 최고의 가치, 지금 바로 만나보세요!`}</small>
            <div className="flex items-center justify-between">
              {`포지션 추천`}
              <SelectTabs_Select
                selectItems={createSelectItems(positions)}
                className="w-[150px]"
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <SelectTabs_Tabs tabItems={createTabItems(recommendPositions)} />
          </div>
        </SelectTabs_Provider>
      </section>
      {/* 랭커 픽율 시즌별 SelectTabs */}
      <section className="relative">
        <SelectTabs_Provider defaultValue={seasons[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px] pt-[16px] pb-[24px]">
            <small className="text-muted-foreground">{`시즌별 최고의 가치, 지금 바로 만나보세요!`}</small>
            <div className="flex items-center justify-between">
              {`시즌 추천`}
              <SelectTabs_Select
                selectItems={createSelectItems(seasons, "season")}
                className="w-[150px]"
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <SelectTabs_Tabs tabItems={createTabItems(recommendSeasons)} />
          </div>
        </SelectTabs_Provider>
      </section>
      {/* 랭커 스쿼드 별 SelectTabs */}
      <section className="relative">
        <SelectTabs_Provider defaultValue={keyboardRankers[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px] pt-[16px] pb-[24px]">
            <small className="text-muted-foreground">{`랭커 스쿼드, 지금 바로 만나보세요!`}</small>
            <div className="flex items-center justify-between">
              {`랭커 스쿼드 추천`}
              <SelectTabs_Select
                selectItems={createSelectItems(
                  [...keyboardRankers, ...gamepadRankers, ...etcRankers],
                  "ranker"
                )}
                className="w-[150px]"
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <SelectTabs_Tabs tabItems={createStadiums(rankers)} />
          </div>
        </SelectTabs_Provider>
      </section>
    </section>
  );
};

export default Home;
