"use client";

import { TGETPlayer } from "@/app/api/player/[spid]/route";
import {
  allCondition,
  conditionValue,
  PlayerScroll_Filter,
  PlayerScroll_Provider,
  PlayerScroll_Scroll,
} from "../organisms/PlayerScroll";
import React, { useEffect, useState } from "react";
import {
  PlayerCompareProvider,
  usePlayerCompareContext,
} from "@/context/store";
import { Button } from "../ui/button";
import SelectStatus from "../organisms/SelectStatus";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { Do_Hyeon, Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  bp2string,
  info2color,
  point2color,
  position2color,
} from "@/lib/cssfuntion";
import {
  info2krTest,
  number2physical,
  positions,
  status,
  statusGK,
  statusOrder,
  TAddStatus,
  TSelectAddStatus,
} from "@/lib/const";
import Enhancement from "../molecules/Enhancement";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ResponsiveBar } from "@nivo/bar";
import { AnyScale } from "@nivo/scales";

const do_Hyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: "700",
  subsets: ["latin"],
});

const AllStatus = { ...status, ...statusGK };

// 공통함수
const enhance = (addStatus: TSelectAddStatus) => {
  return (addStatus["enhance"]?.all || 0) > 23
    ? 10
    : (addStatus["enhance"]?.all || 0) > 18
    ? 9
    : (addStatus["enhance"]?.all || 0) > 14
    ? 8
    : (addStatus["enhance"]?.all || 0) > 10
    ? 7
    : (addStatus["enhance"]?.all || 0) > 7
    ? 6
    : (addStatus["enhance"]?.all || 0) > 5
    ? 5
    : (addStatus["enhance"]?.all || 0) > 3
    ? 4
    : (addStatus["enhance"]?.all || 0) > 1
    ? 3
    : (addStatus["enhance"]?.all || 0) > 0
    ? 2
    : 1;
};

interface BarChartProps {
  target1: Record<string, number>;
  target2: Record<string, number>;
  target1Name: string;
  target2Name: string;
  viewKeys: Record<string, string>;
  target1AddPoint?: Record<string, number>;
  target2AddPoint?: Record<string, number>;
  isSimilarMode: boolean;
}
const BarChart: React.FC<BarChartProps> = ({
  target1,
  target2,
  target1Name,
  target2Name,
  viewKeys,
  target1AddPoint,
  target2AddPoint,
  isSimilarMode,
}) => {
  // 데이터
  const viewKeysKey = Object.keys(viewKeys);
  const data = viewKeysKey.map((key) => ({
    key,
    [target1Name]:
      (target1[key] ?? 0) +
      (target1AddPoint?.[key] ?? 0) +
      (target1AddPoint?.["all"] ?? 0),
    [target2Name]:
      (target2[key] ?? 0) +
      (target2AddPoint?.[key] ?? 0) +
      (target2AddPoint?.["all"] ?? 0),
  }));
  const modeKeys = isSimilarMode ? [target1Name, target2Name] : [target1Name];
  const colorsTarget = isSimilarMode ? target1Name : target2Name;

  // 계산
  const CustomGridLine = (y: number, color: string, label: string) => {
    // eslint-disable-next-line react/display-name
    return ({
      yScale,
      innerWidth,
    }: {
      yScale: AnyScale;
      innerWidth: number;
    }) => {
      return (
        <>
          <line
            x1={10}
            x2={innerWidth - 10}
            y1={yScale(y)}
            y2={yScale(y)}
            stroke={color}
            strokeWidth={1}
          />
        </>
      );
    };
  };

  return (
    <ResponsiveBar
      data={data}
      keys={modeKeys}
      indexBy={"key"}
      margin={{ top: 20, right: 0, bottom: 60, left: 20 }}
      padding={0.3}
      maxValue={160}
      minValue={50}
      valueScale={{
        type: "linear",
        min: 40,
        clamp: true,
      }}
      groupMode="grouped"
      enableLabel={false}
      colors={(temp) => {
        return temp.id == colorsTarget ? "#fe5858" : "#22c55e";
      }}
      axisLeft={{
        renderTick(props) {
          return (
            <g transform={`translate(${props.x},${props.y})`}>
              <text
                fill="#f2f2f2"
                dominantBaseline="central"
                textAnchor="end"
                transform={`translate(${props.textX + 10},${props.textY})`}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {props.value}
              </text>
            </g>
          );
        },
      }}
      axisBottom={{
        renderTick(props) {
          return (
            <svg key={props.value}>
              <g transform={`translate(${props.x - 5},${props.y - 8})`}>
                <text
                  fill="#f2f2f2"
                  transform={`translate(${props.textX},${props.textY}) rotate(${props.rotate})`}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    overflow: "-moz-hidden-unscrollable",
                  }}
                >
                  {AllStatus[props.value as keyof typeof AllStatus].includes(
                    "GK"
                  ) ? (
                    <>
                      <tspan x={0} y={-7}>
                        {AllStatus[
                          props.value as keyof typeof AllStatus
                        ].substring(0, 2)}
                      </tspan>
                      <tspan x={0} y={7}>
                        {AllStatus[
                          props.value as keyof typeof AllStatus
                        ].substring(3)}
                      </tspan>
                    </>
                  ) : (
                    AllStatus[props.value as keyof typeof AllStatus]
                  )}
                </text>
              </g>
            </svg>
          );
        },
        tickRotation: 90,
      }}
      layers={[
        "bars",
        "axes",
        CustomGridLine(130, "#dc0000", "빨간맛"),
        CustomGridLine(140, "#c99b00", "노란맛"),
      ]}
    />
  );
};

const Ranking: React.FC<{
  isSimilarMode: boolean;
  simPlayers: TGETPlayer["simPlayers"];
}> = ({ isSimilarMode, simPlayers }) => {
  // 데이터
  const { playerLeft, playerRight } = usePlayerCompareContext(); // 랭킹 확인 용
  const [position, setPosition] = useState("ST");
  const [rank, setRank] = useState(1);
  // 계산
  // 액션
  useEffect(() => {
    const tempRank =
      simPlayers.findIndex((player) => player.id == playerRight.id) + 1;
    setRank(tempRank);
  }, [playerRight]);

  return (
    <div
      className={cn(
        "flex items-center w-full gap-4 px-6 py-3",
        do_Hyeon.className
      )}
    >
      {/* 순위 표시 */}
      <h3 className="w-18">
        {isSimilarMode ? (
          `${rank}위`
        ) : (
          <select
            value={rank}
            onChange={(e) => setRank(parseInt(e.currentTarget.value))}
            className="bg-card"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            {[...Array(17).keys()].map((key) => (
              <option key={key} value={key}>
                {`${key}위`}
              </option>
            ))}
          </select>
        )}
        {/* 유사도 순위 */}
        <div className="text-sm tracking-tighter text-muted-foreground">
          {isSimilarMode ? "유사도 순위" : "랭커 스쿼드 포함 순위"}
        </div>
      </h3>
      {/* 선수 시즌+이름 */}
      <div className="flex items-center justify-end gap-1 grow">
        {isSimilarMode ? (
          <>
            <ImageAspectRatio
              imgSrc={`/season/${playerLeft.season}.png`}
              width={30}
              alt={`${playerLeft.season}이미지`}
              className="inline-block"
            />
            <h3>{playerLeft.name}</h3>
          </>
        ) : (
          <h3>데일리차트</h3>
        )}
      </div>
      {/* 선수 이미지 */}
      <div className="relative h-[32px] w-[64px]">
        {isSimilarMode ? (
          <div className="absolute bottom-0">
            <ImageAspectRatio
              imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${playerLeft.imgId}.AVIF?raw=true`}
              width={64}
              alt={`${playerLeft.season}${playerLeft.name}이미지`}
              className="drop-shadow-[0_0_5px_hsl(0,99%,67%)]"
            />
          </div>
        ) : (
          <div className="absolute bottom-0">
            <select
              value={position}
              onChange={(e) => setPosition(e.currentTarget.value)}
              className={cn(
                "border-0 text-6xl font-bold text-left bg-transparent",
                position2color(position)
              )}
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              {positions.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

const PlayerProfile: React.FC<{
  player: TGETPlayer["player"];
  enhance: number;
  addAll: number;
}> = ({ player, enhance, addAll }) => {
  // 계산
  const skillmovePoint =
    player.skillmove + ((enhance || 0) > 7 ? 2 : (enhance || 0) > 4 ? 1 : 0);
  return (
    <div className="flex justify-between w-full p-1">
      {/* 선수 정보 */}
      <div
        className={cn(
          "w-full flex flex-col text-muted-foreground text-lg justify-between leading-none"
        )}
      >
        {/* 시즌 이름 */}
        <div className={cn("flex items-center gap-1")}>
          <ImageAspectRatio
            imgSrc={`/season/${player.season}.png`}
            width={38}
            alt={`${player.season}이미지`}
            className="inline-block"
          />
          <h2 className={cn("pb-0 text-foreground", do_Hyeon.className)}>
            {player.name}
          </h2>
        </div>
        {/* 포지션 오버롤 급여 */}
        <div
          className={cn(
            "flex items-end gap-1 text-2xl text-foreground",
            do_Hyeon.className
          )}
        >
          <span className={position2color(player.position)}>
            {player.position}
          </span>
          <span className="text-3xl">{player.ovr + (addAll || 0)}</span>
        </div>
        {/* 선수 가격 */}
        <div>
          <span
            className={cn(
              "text-3xl text-[#25c7f5] grow text-right",
              do_Hyeon.className
            )}
          >
            {bp2string(
              player[
                `bp${enhance as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`
              ] || 0
            )}
            BP
          </span>
        </div>
        {/*급여 키 몸무게 */}
        <div className="flex divide-x divide-card-foreground">
          <div className="px-1">{`${player.pay}급여`}</div>
          <span className="px-1">{`${player.height}cm`}</span>
          <span className="px-1">{`${player.weight}kg`}</span>
          <span className="px-1">{`${
            number2physical[player.physical as 0 | 1 | 2 | 3 | 4 | 5]
          }`}</span>
          <span className="px-1">
            <span className={cn(player.mainfoot == 1 && "text-primary")}>
              {`${player.mainfoot == 1 ? 5 : player.weakfoot}`}
            </span>
            <span>-</span>
            <span className={cn(player.mainfoot == -1 && "text-primary")}>
              {`${player.mainfoot == -1 ? 5 : player.weakfoot}`}
            </span>
          </span>
        </div>
        {/* 개인기 */}
        <div className="text-[#fc0] px-1">
          {"".padEnd(skillmovePoint < 6 ? skillmovePoint : 6, "★")}
        </div>
      </div>
      {/* 선수 이미지 */}
      <div className="relative">
        <div className="w-[150px] h-[148px]" />
        <div className="absolute bottom-0 left-0">
          <ImageAspectRatio
            imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${player.imgId}.AVIF?raw=true`}
            width={150}
            alt={`${player.season}${player.name}이미지`}
            className="drop-shadow-[0_0_5px_hsl(142.1,70.6%,45.3%)]"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-8">
          <Enhancement
            enhance={enhance}
            className={cn("h-4", do_Hyeon.className)}
          />
        </div>
      </div>
    </div>
  );
};

const Graph: React.FC<{
  isSimilarMode: boolean;
  playerLeft: TGETPlayer["player"];
  playerRight: TGETPlayer["player"];
  leftAddStatus: TSelectAddStatus;
  rightAddStatus: TSelectAddStatus;
}> = ({
  isSimilarMode,
  playerLeft,
  playerRight,
  leftAddStatus,
  rightAddStatus,
}) => {
  // 데이터
  const { penalties, freekickaccuracy, slidingtackle, ...viewStatus } = status;
  const statusKey = playerLeft.position === "GK" ? statusGK : viewStatus;

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
    <div className="relative h-52">
      <div className="absolute inset-0">
        <BarChart
          target1={pickStatus(playerLeft, Object.keys(statusKey))}
          target2={pickStatus(playerRight, Object.keys(statusKey))}
          target1Name={`${playerLeft.season}${playerLeft.name}`}
          target2Name={`${playerRight.season}${playerRight.name}`}
          viewKeys={statusKey}
          target1AddPoint={createAddPoint(leftAddStatus)}
          target2AddPoint={createAddPoint(rightAddStatus)}
          isSimilarMode={isSimilarMode}
        />
      </div>
    </div>
  );
};

const Compare: React.FC<{
  isSimilarMode: boolean;
  simPlayers: TGETPlayer["simPlayers"];
}> = ({ isSimilarMode, simPlayers }) => {
  // 데이터
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext(); // 랭킹 확인 용

  // 계산
  const addAll = (addStatus: typeof leftAddStatus) => {
    return (
      (addStatus["adaptability"]?.all || 0) +
      (addStatus["enhance"]?.all || 0) +
      (addStatus["enhanceTeamcolor"]?.all || 0) +
      (addStatus["affiliation"]?.all || 0) +
      (addStatus["defaultTeamcolor"]?.all || 0)
    );
  };

  return (
    <section className="flex flex-col items-start justify-between gap-2">
      {/* 선수 이미지, 선수 정보 */}
      <section className="w-full mt-3 rounded-lg bg-card">
        <PlayerProfile
          player={isSimilarMode ? playerRight : playerLeft}
          enhance={
            isSimilarMode ? enhance(rightAddStatus) : enhance(leftAddStatus)
          }
          addAll={
            isSimilarMode ? addAll(rightAddStatus) : addAll(leftAddStatus)
          }
        />
      </section>
      {/* 랭킹 표시 */}
      <section className="w-full rounded-lg bg-card">
        <Ranking isSimilarMode={isSimilarMode} simPlayers={simPlayers} />
      </section>
      {/* 유사도 능력치 그래프*/}
      <section className="w-full rounded-lg bg-card">
        <Graph
          playerLeft={playerLeft}
          playerRight={playerRight}
          leftAddStatus={leftAddStatus}
          rightAddStatus={rightAddStatus}
          isSimilarMode={isSimilarMode}
        />
      </section>
    </section>
  );
};

const StatusTable: React.FC<{
  isSimilarMode: boolean;
}> = ({ isSimilarMode }) => {
  // 데이터
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext();
  const player = !isSimilarMode ? playerLeft : playerRight;
  const addStatus = !isSimilarMode ? leftAddStatus : rightAddStatus;

  // 계산
  const addStatus2point = (
    addStatus: TSelectAddStatus,
    statusKey: keyof typeof AllStatus
  ) => {
    return Object.keys(addStatus).reduce((add, addKey) => {
      const all = addStatus[addKey as keyof TSelectAddStatus]?.all || 0;
      const statusPoint =
        addStatus[addKey as keyof TSelectAddStatus]?.[statusKey] || 0;
      return add + all + statusPoint;
    }, 0);
  };

  return (
    <section className="h-full grid grid-cols-3">
      <div className="relative col-span-1">
        <div className="absolute inset-0 px-2 pt-3">
          <ScrollArea
            id="ScrollAreaWrapRow"
            className={cn("size-full bg-card rounded-lg", do_Hyeon.className)}
          >
            <div className="flex flex-col flex-wrap items-start justify-start h-full w-max text-lg">
              <div className="text-left w-[130px] justify-self-center pl-[2px] font-medium text-[rgb(37,199,245)]">
                경기 정보
              </div>
              {/* 경기 정보 */}
              {(
                [
                  "participation",
                  "score",
                  "assistance",
                  "effectiveShooting",
                  "shooting",
                  "passRate",
                  "dribbleRate",
                  "aerialBallRate",
                  "interception",
                  "tackleRate",
                  "blockRate",
                  "defenseRate",
                  "grade",
                ] as const
              ).map((key) => {
                return (
                  <div key={key} className="flex gap-1">
                    <span
                      className={cn(
                        do_Hyeon.className,
                        "text-left w-[80px] justify-self-center pl-[2px] font-medium"
                      )}
                    >
                      {info2krTest[key]}
                    </span>
                    {!isSimilarMode ? (
                      <div
                        className={cn(
                          "text-left w-[50px] Large:w-[50px] font-bold",
                          robotoMono.className
                        )}
                      >
                        <span
                          className={info2color(key, playerLeft.info?.[key])}
                        >
                          {playerLeft.info?.[key]}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "text-left w-[50px] Large:w-[50px] font-bold",
                          robotoMono.className
                        )}
                      >
                        <span
                          className={info2color(key, playerRight.info?.[key])}
                        >
                          {playerRight.info?.[key]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="h-[24px]" />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="relative col-span-2 mt-3">
        <div className="absolute inset-0 px-2 bg-card rounded-lg">
          <div
            className={cn(
              "text-left w-[130px] justify-self-center pl-[2px] font-medium text-[rgb(37,199,245)] text-lg",
              do_Hyeon.className
            )}
          >
            능력치 표
          </div>
          <ScrollArea
            id="ScrollAreaWrapRow"
            className={cn("w-full h-[calc(100%-26px)]", do_Hyeon.className)}
          >
            <div className="flex flex-col flex-wrap items-start justify-start h-full w-max text-[17px]">
              {/* 스탯 */}
              {statusOrder.map((statusKey) => {
                const cell =
                  player[statusKey] + addStatus2point(addStatus, statusKey);
                return (
                  <div key={statusKey} className="flex gap-1 odd:bg-[#2a2722]">
                    <div className="text-left w-[96px] justify-self-center pl-[2px] font-medium">
                      {AllStatus[statusKey]}
                    </div>
                    <div
                      className={cn(
                        "text-left w-[50px] Large:w-[50px] font-bold",
                        robotoMono.className
                      )}
                    >
                      <span className={point2color(cell)}>
                        {cell < 100 ? (
                          <>&nbsp;</>
                        ) : cell < 10 ? (
                          <>&nbsp;&nbsp;</>
                        ) : (
                          <></>
                        )}
                        {cell}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

const Videoclip: React.FC<{
  playerResponse: TGETPlayer;
  conditionObj?: Partial<Record<allCondition, conditionValue>> | undefined;
}> = ({ playerResponse, conditionObj }) => {
  // 데이터
  const [isSimilarMode, setIsSimilarMode] = useState(true); // 유사선수 랭킹 모드 or 데일리차트 랭킹 모드 선택용
  const { player, simPlayers, teamcolors } = playerResponse; // 현재 검색한 선수 정보, 유사선수 정보, 팀컬러 정보 가져오기
  // 계산
  // 액션
  const onClickModeButton = () => setIsSimilarMode((pre) => !pre);
  useEffect(() => {
    const HTML = document.getElementsByTagName("html");
    HTML[0].style.scrollbarWidth = "none";
  }, []);

  return (
    <>
      <PlayerCompareProvider
        defaultPlayerLeft={player}
        defaultPlayerRight={simPlayers[0]}
        teamcolors={teamcolors}
      >
        <section className="min-h-[calc(100vh)] left-0 w-screen absolute z-50 top-0 flex flex-col bg-background p-1">
          {/* 영상 자료 부분 */}
          <section className="w-screen h-screen grid grid-cols-2 pb-[68px]">
            {/* 선수 기본 정보 부분 */}
            <Compare isSimilarMode={isSimilarMode} simPlayers={simPlayers} />
            {/* 선수 능력치 테이블 부분 */}
            <StatusTable isSimilarMode={isSimilarMode} />
          </section>
          {/* 보여주기 선택 */}
          <Button onClick={onClickModeButton}>모드 바꾸기</Button>
          {/* 능력치 선택 부분 */}
          <section className="px-[16px] relative">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-9 Medium:grid-cols-9">
                <div className="col-span-3">
                  <SelectStatus type="adaptability" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="enhance" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="defaultTeamcolor" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="enhanceTeamcolor" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="affiliation" dir="left" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="feature" dir="left" />
                </div>
              </div>
              <div className="grid grid-cols-9 Medium:grid-cols-9">
                <div className="col-span-3">
                  <SelectStatus type="adaptability" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="enhance" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="defaultTeamcolor" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="enhanceTeamcolor" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="affiliation" dir="right" />
                </div>
                <div className="col-span-3">
                  <SelectStatus type="feature" dir="right" />
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* 유사 선수 선택 부분 */}
        <section className="absolute top-0 right-0 z-50 h-screen translate-x-full bg-background">
          <section className="pl-[16px] Expanded:pl-0 Expanded:w-[306px] Large:w-[612px] relative">
            <PlayerScroll_Provider
              teamcolors={teamcolors}
              defaultCondition={conditionObj}
            >
              <div className="absolute z-30 top-1 left-1">
                <PlayerScroll_Filter />
              </div>
              <PlayerScroll_Scroll players={[player, ...simPlayers]} />
            </PlayerScroll_Provider>
          </section>
        </section>
      </PlayerCompareProvider>
    </>
  );
};
export default Videoclip;
