"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import StateLayer from "@/components/atoms/StateLayer";
import { Button } from "@/components/ui/button";
import { adaptability, enhance, number2physical, positions, status, statusGK, statusOrder } from "@/lib/const";
import { usePlayerCompareContext } from "@/context/store";
import { deleteCookies, setCookies } from "@/lib/actions";
import PlayerCard from "./PlayerCard";
import { cn } from "@/lib/utils";
import { SquadAddPlayer } from "./SquadMaker";
import { Input } from "../ui/input";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

export type allCondition =
  | keyof typeof status
  | keyof typeof statusGK
  | "affiliation"
  | "feature"
  | "mainfoot"
  | "weakfoot"
  | "physical"
  | "enhanceBp"
  | "statusMin"
  | "position";

export type conditionValue =
  | string
  | {
      enhance: string;
      bp: string;
    }
  | {
    statusKey: typeof statusOrder[number];
    minValue: string;
  }
  ;

export type TCondition = Partial<Record<allCondition, conditionValue>>;

type PlayerScrollType = {
  condition: TCondition;
  setCondition: Dispatch<SetStateAction<TCondition>>;
  teamcolors: TGETPlayer["teamcolors"];
};

const PlayerScrollContext = createContext<PlayerScrollType>({
  condition: {},
  setCondition: () => {},
  teamcolors: {} as TGETPlayer["teamcolors"],
});

const usePlayerScrollContext = () => useContext(PlayerScrollContext);

export const PlayerScroll_Provider: React.FC<{
  children: React.ReactNode;
  teamcolors: TGETPlayer["teamcolors"];
  defaultCondition?: TCondition;
}> = ({ children, teamcolors, defaultCondition }) => {
  const [condition, setCondition] = useState<TCondition>(
    defaultCondition || {}
  );
  return (
    <PlayerScrollContext.Provider
      value={{
        condition,
        setCondition,
        teamcolors,
      }}
    >
      {children}
    </PlayerScrollContext.Provider>
  );
};

export const PlayerScroll_Scroll: React.FC<{
  players: TGETPlayer["simPlayers"];
}> = ({ players }) => {
  // 데이터
  const { setPlayerLeft, setPlayerRight } = usePlayerCompareContext();
  const { condition } = usePlayerScrollContext();
  // 계산
  const renderPlayerCard = () => {
    let render = false;
    return {
      node: players.map((player, idx) => {
        const isRender = Object.entries(condition).every(([key, value]) => {
          if (["affiliation", "feature"].includes(key)) {
            const tempKey = key as "affiliation" | "feature";
            const tempTeamId = value as string;
            return (
              tempTeamId &&
              player.teamcolors[tempKey].includes(parseInt(tempTeamId))
            );
          } else if (["mainfoot", "physical"].includes(key)) {
            const tempKey = key as "mainfoot" | "physical";
            const tempTeamId = value as string;
            return tempTeamId && player[tempKey] == parseInt(tempTeamId);
          } else if ("enhanceBp" === key) {
            const tempValue = value as { enhance: string; bp: string };
            const tempEnhance = tempValue["enhance"] as
              | "bp1"
              | "bp2"
              | "bp3"
              | "bp4"
              | "bp5"
              | "bp6"
              | "bp7"
              | "bp8"
              | "bp9"
              | "bp10";
            const tempBp = tempValue["bp"];
            return (player[tempEnhance] || 0) / 1000 <= parseInt(tempBp);
          } else if ("position" === key) {
            const tempValue = value;
            return player.position === tempValue;
          } else if ("statusMin" === key) {
            const tempValue = value as {
              statusKey: typeof statusOrder[number];
              minValue: string;
            };
            return (player[tempValue["statusKey"]] || 0) >= parseInt(tempValue["minValue"]);
          }
          return true;
        });
        render ||= isRender;
        return isRender ? (
          <StateLayer key={player.id} className="bg-foreground">
            <ContextMenu>
              <ContextMenuTrigger>
                <PlayerCard player={player} isBp />
                <div
                  className={cn(
                    "absolute top-0 left-0 bg-secondary rounded-full size-[18px] text-center leading-none",
                    idx === 1 && "bg-[#D5A11E]",
                    idx === 2 && "bg-[#A3A3A3]",
                    idx === 3 && "bg-[#CD7F32]"
                  )}
                >
                  {idx === 0 ? "-" : idx}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => setPlayerRight(player)}>
                  오른쪽 교체
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setPlayerLeft(player)}>
                  왼쪽 교체
                </ContextMenuItem>
                <ContextMenuItem>
                  <SquadAddPlayer player={player}>스쿼드 추가</SquadAddPlayer>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </StateLayer>
        ) : null;
      }),
      isRender: render,
    };
  };
  // 액션
  return (
    <ScrollArea>
      <div className="grid content-start grid-flow-col grid-rows-1 Medium:grid-rows-2 justify-start pb-2 Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:items-start Expanded:grid-flow-row Expanded:h-[calc(100dvh-64px)] w-max Expanded:w-[306px] Large:grid-cols-2 Large:w-[612px]">
        {renderPlayerCard().isRender ? (
          renderPlayerCard().node
        ) : (
          <div className="h-[110px] text-muted-foreground flex items-center">
            결과가 없습니다...
          </div>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const PlayerScroll_Filter: React.FC = () => {
  // 데이터
  const [filterStatus, setFilterStatus] = useState({
    filterCondition: "",
    value: "",
  });

  const [addPoint, setAddPoint] = useState({
    enhance:0,
    teamColor:0,
    adaptability:0,
  })

  const { condition, setCondition, teamcolors } = usePlayerScrollContext();

  const affiliationSelectItem = Object.entries(teamcolors.affiliation)
    .map(([key, value]) => ({
      value: `${key}`,
      node: <div key={key}>{value.name}</div>,
      text: value.name,
    }))
    .sort((pre, next) =>
      pre.text < next.text ? -1 : pre.text > next.text ? 1 : 0
    );
  const featureSelectItem = Object.entries(teamcolors.feature)
    .map(([key, value]) => ({
      value: `${key}`,
      node: <div key={key}>{value.name}</div>,
      text: value.name,
    }))
    .sort((pre, next) =>
      pre.text < next.text ? -1 : pre.text > next.text ? 1 : 0
    );
  const positionSelectItem = positions.map((value) => ({
    value: value,
    node: <div key={value}>{value}</div>,
  }));
  const mainfootSelectItem = ["왼발", "오른발"].map((value) => ({
    value: value === "왼발" ? `1` : `-1`,
    node: <div key={value}>{value}</div>,
    text: value,
  }));
  const physicalSelectItem = Object.entries(number2physical).map(
    ([idx, name]) => ({
      value: `${idx}`,
      node: <div key={idx}>{name}</div>,
      text: name,
    })
  );
  const enhanceSelectItem = [...Array(13).keys()].map((key) => ({
    value: `${key + 1}`,
    node: <div key={key}>{key + 1}</div>,
  }));
  const adaptabilitySelectItem = [...Array(5).keys()].map((key) => ({
    value: `${key + 1}`,
    node: <div key={key}>{key + 1}</div>,
  }));
  const teamColorSelectItem = [...Array(9).keys()].map((key) => ({
    value: `${key + 1}`,
    node: <div key={key}>{key + 1}</div>,
  }));
  const statusSelectItem = statusOrder.map((key) => ({
    value: `${key}`,
    node: <div key={key}>{{...status,...statusGK}[key]}</div>,
  }));
  // 계산

  // 액션
  const onSelctCallback = (value: string, type: allCondition) => {
    value === "-"
      ? setCondition((pre) => {
          delete pre[type];
          return { ...pre };
        })
      : setCondition((pre) => ({ ...pre, [type]: value.toUpperCase() }));
  };
  const onClickAdd = (type:"bp"|"minValue") =>
    type == "bp" ?
    setCondition((pre) => ({
      ...pre,
      enhanceBp: {
        enhance: filterStatus["filterCondition"],
        bp: filterStatus["value"],
      },
    })):setCondition((pre) => ({
      ...pre,
      statusMin: {
        statusKey: filterStatus["filterCondition"] as typeof statusOrder[number],
    minValue: `${(parseInt(filterStatus["value"])-Object.values(addPoint).reduce((accumulator, currentValue) => accumulator + currentValue,
    0,))}`,
      },
    }));

  const onClickDelete = (type: allCondition) =>
    setCondition((pre) => {
      delete pre[type];
      return { ...pre };
    });

  useEffect(() => {
    const timeOutId = setTimeout(() => {}, 500);
    return () => clearTimeout(timeOutId);
  }, [filterStatus["value"]]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" name="필터링">
          <MixerHorizontalIcon className="w-[20px] h-[20px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>결과 필터링</DialogTitle>
          <DialogDescription>
            조건을 통해 원하는 선수만 필터링하세요.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="size-full">
          <div className="flex flex-col justify-start gap-2 h-max">
            {/* 팀컬러 */}
            <div>
              <span className="text-primary">팀컬러</span>
              <div className="flex flex-wrap gap-2">
                <Select
                  label="소속"
                  selectItems={affiliationSelectItem}
                  onSelctCallback={(value: string) =>
                    onSelctCallback(value, "affiliation")
                  }
                  className="w-[150px]"
                />
                <Select
                  label="특성"
                  selectItems={featureSelectItem}
                  onSelctCallback={(value: string) =>
                    onSelctCallback(value, "feature")
                  }
                  className="w-[150px]"
                />
              </div>
            </div>
            {/* 가격 */}
            <div>
              <span className="text-primary">가격</span>
              <div className="flex flex-wrap gap-2">
                <Select
                  label="강화 기준"
                  selectItems={enhanceSelectItem}
                  onSelctCallback={(value: string) =>
                    setFilterStatus((pre) => ({
                      ...pre,
                      filterCondition: `bp${value}`,
                    }))
                  }
                  className="w-[80px]"
                />
                <div className="relative">
                  <Input
                    name="BP"
                    type="number"
                    className="w-[150px]"
                    placeholder="최대"
                    min={0}
                    max={100000000}
                    onChange={(e) => {
                      const temp = e.currentTarget.value;
                      setFilterStatus((pre) => ({ ...pre, value: temp }));
                    }}
                  />
                  <div className="absolute z-10 -translate-y-1/2 right-1 text-muted-foreground top-1/2">
                    억BP
                  </div>
                </div>
                <Button variant="ghost" onClick={()=>onClickAdd("bp")}>
                  추가
                </Button>
              </div>
            </div>
            {/* 최소 능력치 */}
            <div>
              <span className="text-primary">최소 능력치</span>
              <div className="flex flex-wrap gap-2">
                <Select
                  label="강화 기준"
                  selectItems={enhanceSelectItem}
                  onSelctCallback={(value: string) =>
                    setAddPoint(pre=>{return{...pre, enhance:enhance[value as "1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"]["all"]}})
                  }
                  className="w-[80px]"
                />
                <Select
                  label="적응도 기준"
                  selectItems={adaptabilitySelectItem}
                  onSelctCallback={(value: string) =>
                    setAddPoint(pre=>{return{...pre, adaptability:adaptability[value as "1"|"2"|"3"|"4"|"5"]["all"]}})
                  }
                  className="w-[80px]"
                />
                <Select
                  label="팀컬러 기준"
                  selectItems={teamColorSelectItem}
                  onSelctCallback={(value: string) =>
                    setAddPoint(pre=>{return{...pre, teamColor:parseInt(value)}})
                  }
                  className="w-[80px]"
                />
                <Select
                  label="세부 능력치"
                  selectItems={statusSelectItem}
                  onSelctCallback={(value: string) =>
                    setFilterStatus((pre) => ({
                      ...pre,
                      filterCondition: `${value}`,
                    }))
                  }
                  className="w-[80px]"
                />
                <div className="relative">
                  <Input
                    name="status"
                    type="number"
                    className="w-[150px]"
                    placeholder="최소"
                    min={0}
                    max={200}
                    onChange={(e) => {
                      const temp = e.currentTarget.value;
                      setFilterStatus((pre) => ({ ...pre, value: temp }));
                    }}
                  />
                </div>
                <Button variant="ghost" onClick={()=>onClickAdd("minValue")}>
                  추가
                </Button>
              </div>
            </div>
            {/* 포지션 */}
            <div>
              <span className="text-primary">포지션</span>
              <Select
                label="포지션"
                selectItems={positionSelectItem}
                onSelctCallback={(value: string) =>
                  onSelctCallback(value, "position")
                }
                className="w-[100px]"
              />
            </div>
            {/* 신체 */}
            <div>
              <span className="text-primary">신체</span>
              <div className="flex flex-wrap gap-2">
                <Select
                  label="주발"
                  selectItems={mainfootSelectItem}
                  onSelctCallback={(value: string) =>
                    onSelctCallback(value, "mainfoot")
                  }
                  className="w-[100px]"
                />
                <Select
                  label="체형"
                  selectItems={physicalSelectItem}
                  onSelctCallback={(value: string) =>
                    onSelctCallback(value, "physical")
                  }
                  className="w-[100px]"
                />
              </div>
            </div>
            {/* 선택된 조건 */}
            <div>
              <span className="text-primary">조건</span>
              <ScrollArea className="w-full h-[40px]">
                <div className="flex gap-0.5 w-max">
                  {Object.entries(condition).map(([key, value]) => {
                    if (key == "enhanceBp") {
                      const tempValue = value as {
                        enhance: string;
                        bp: string;
                      };
                      return (
                        <div
                          key="enhanceBp"
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${tempValue["enhance"].replace("bp", "")}강 ${
                            tempValue["bp"]
                          }억 이하`}
                          <Button
                            onClick={() => onClickDelete("enhanceBp")}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    } else if (["affiliation", "feature"].includes(key)) {
                      const tempKey = key as "affiliation" | "feature";
                      const tempTeamId = value as string;
                      return (
                        <div
                          key={key}
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${teamcolors[tempKey][parseInt(tempTeamId)]?.name}`}
                          <Button
                            onClick={() => onClickDelete(tempKey)}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    } else if (key === "physical") {
                      const tempValue = value as string;
                      return (
                        <div
                          key={key}
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${
                            number2physical[
                              parseInt(tempValue) as 0 | 1 | 2 | 3 | 4 | 5
                            ]
                          }`}
                          <Button
                            onClick={() => onClickDelete(key)}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    } else if (key === "mainfoot") {
                      const tempValue = value as string;
                      return (
                        <div
                          key={key}
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${tempValue === "1" ? "왼발" : "오른발"}`}
                          <Button
                            onClick={() => onClickDelete(key)}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    } else if (key == "statusMin") {
                      const tempValue = value as {
                        statusKey: typeof statusOrder[number];
                        minValue: string;
                      };
                      return (
                        <div
                          key="statusMin"
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${{...status,...statusGK}[tempValue["statusKey"]]} 최소값`}
                          <Button
                            onClick={() => onClickDelete("statusMin")}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    } else {
                      const tempKey = key as allCondition;
                      return (
                        <div
                          key={key}
                          className="border-b border-border text-muted-foreground"
                        >
                          {`${value}`}
                          <Button
                            onClick={() => onClickDelete(tempKey)}
                            variant="ghost"
                          >
                            X
                          </Button>
                        </div>
                      );
                    }
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex justify-between">
            <div className="flex gap-0.5">
              <Button
                variant="secondary"
                onClick={() => (
                  setCookies("condition", condition), alert("고정 완료")
                )}
              >
                고정
              </Button>
              <Button
                variant="destructive"
                onClick={() => (
                  deleteCookies("condition"),
                  setCondition({}),
                  alert("초기화 완료")
                )}
              >
                초기화
              </Button>
            </div>
            <DialogClose asChild>
              <Button>확인</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Select: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
    text?: string;
  }[];
  onSelctCallback: (value: string) => void;
  label: string;
  defaultValue?: string;
  className?: string;
}> = ({ selectItems, onSelctCallback, label, defaultValue, className }) => {
  const onSelectCallbackMobile = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelctCallback(e.target.value);
  return (
    <div className={cn(className, "relative")}>
      <small className="absolute top-0 left-2">{label}</small>
      <SelectContainer
        defaultValue={defaultValue}
        onValueChange={onSelctCallback}
      >
        <SelectTrigger className={"w-full hidden Medium:flex"}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="-">-</SelectItem>
            {selectItems.map((selectItem) => (
              <SelectItem key={selectItem.value} value={selectItem.value}>
                {selectItem.node}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectContainer>
      <select
        onChange={onSelectCallbackMobile}
        className={cn(CLASSNAME_SELECT, "flex Medium:hidden")}
        id={`${label}select`}
      >
        <option value={"-"} className="bg-popover text-popover-foreground">
          -
        </option>
        {selectItems.map((selectItem) => (
          <option
            key={selectItem.value}
            value={selectItem.value}
            className="bg-popover text-popover-foreground"
          >
            {selectItem.text || selectItem.value}
          </option>
        ))}
      </select>
    </div>
  );
};
