import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TGETRecommend, TRecommend } from "@/app/api/recommend/route";
import { TGETRanker, TRanker } from "@/app/api/ranker/route";
import {
  ComboboxTabsCombobox,
  ComboboxTabsProvider,
  ComboboxTabsTabs,
} from "../organisms/recommend/ComboboxTabs";
import PlayerCard from "../organisms/PlayerCard";
import StateLayer from "../atoms/StateLayer";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import Stadium from "../organisms/recommend/Stadium";
import PlayerProfile from "../organisms/PlayerProfile";

const Home: React.FC<{
  responseRecommend: TGETRecommend;
  responseRanker: TGETRanker;
}> = ({ responseRecommend, responseRanker }) => {
  //데이터
  const { positions, seasons, recommendPositions, recommendSeasons } =
    responseRecommend;
  const { rankers, keyboardRankers, gamepadRankers, etcRankers } =
    responseRanker;

  // 계산
  const createCommendItems = (values: string[], type?: "img" | "ranker") =>
    values.map((value) => ({
      value: value,
      node: (
        <div
          key={value}
          className="flex py-1 items-center text-foreground gap-x-0.5 relative"
        >
          {type === "img" && (
            <ImageAspectRatio
              width={20}
              imgSrc={`/season/${value}.png`}
              alt={`${value}이미지`}
            />
          )}
          {type === "ranker" && (
            <small className="absolute top-0 left-0 text-xs -translate-y-1/2 bg-background text-nowrap text-muted-foreground">
              {rankers[value].controller === "keyboard"
                ? "키보드"
                : rankers[value].controller === "gamepad"
                ? "패드"
                : "기타"}
            </small>
          )}
          {value}
        </div>
      ),
    }));
  const createTabItems = (recommendRecord: Record<string, TRecommend[]>) =>
    Object.entries(recommendRecord).map(([key, recommends]) => ({
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
                  <PlayerCard player={recommend.player} isBp />
                </StateLayer>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ),
    }));
  const createStadiums = (rankerRecord: Record<string, TRanker>) => {
    return Object.entries(rankerRecord).map(([key, rankers]) => {
      const positionItems = Object.fromEntries(
        rankers.players.map((player) => [
          player.position,
          <Link
            href={`/player/${player.playerId}`}
            key={`${player.playerId}Link`}
            target="_blank"
          >
            <PlayerProfile
              player={player.player}
              grade={player.grade}
              position={player.position}
            />
          </Link>,
        ])
      );
      return {
        value: key,
        node: <Stadium positionItems={positionItems} />,
      };
    });
  };

  return (
    <section>
      <h2 className="px-[16px] Expanded:px-[62px] Large:px-[106px]">
        최고의 선수찾기!
      </h2>
      <section className="relative">
        <ComboboxTabsProvider defaultValue={positions[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px]">
            <small className="text-muted-foreground">{`포지션별 최고의 가치, 지금 바로 만나보세요!`}</small>
            <div className="flex items-center justify-between">
              {`포지션 추천`}{" "}
              <ComboboxTabsCombobox
                commandItems={createCommendItems(positions)}
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <ComboboxTabsTabs tabItems={createTabItems(recommendPositions)} />
          </div>
        </ComboboxTabsProvider>
      </section>
      <section className="relative">
        <ComboboxTabsProvider defaultValue={seasons[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px]">
            <small className="text-muted-foreground">{`시즌별 최고의 가치, 지금 바로 만나보세요!`}</small>
            <div className="flex items-center justify-between">
              {`시즌 추천`}
              <ComboboxTabsCombobox
                commandItems={createCommendItems(seasons, "img")}
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <ComboboxTabsTabs tabItems={createTabItems(recommendSeasons)} />
          </div>
        </ComboboxTabsProvider>
      </section>
      <section>
        <ComboboxTabsProvider defaultValue={gamepadRankers[0]}>
          <h3 className="px-[16px] Expanded:px-[62px] Large:px-[106px]">
            <small className="text-muted-foreground">{`랭커가 사용하는 최고의 스쿼드!`}</small>
            <div className="flex items-center justify-between">
              {`랭커 스쿼드`}
              <ComboboxTabsCombobox
                commandItems={createCommendItems(
                  [...keyboardRankers, ...gamepadRankers, ...etcRankers],
                  "ranker"
                )}
              />
            </div>
          </h3>
          <div className="pl-[16px] Expanded:pl-[62px] Large:pl-[106px]">
            <ComboboxTabsTabs tabItems={createStadiums(rankers)} />
          </div>
        </ComboboxTabsProvider>
      </section>
    </section>
  );
};

export default Home;
