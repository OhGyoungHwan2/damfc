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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import StateLayer from "@/components/atoms/StateLayer";
import { Button } from "@/components/ui/button";
import { number2physical, positions, status, statusGK } from "@/lib/const";
import { usePlayerCompareContext } from "@/context/store";
import { deleteCookies, setCookies } from "@/lib/actions";
import PlayerCard from "./PlayerCard";
import { cn } from "@/lib/utils";
import { SquadAddPlayer } from "./SquadMaker";
import { Input } from "../ui/input";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

type allCondition =
  | keyof typeof status
  | keyof typeof statusGK
  | "affiliation"
  | "feature"
  | "mainfoot"
  | "weakfoot"
  | "physical"
  | "enhanceBp"
  | "position";

type conditionValue =
  | string
  | {
      enhance: string;
      bp: string;
    }
  | {
      min: string;
      max: string;
    };

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
          } else if ("position" == key) {
            const tempValue = value;
            return player.position === tempValue;
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
                  {idx}
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
      <div className="grid grid-flow-col grid-rows-1 Medium:grid-rows-2 gap-4 justify-start Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:items-start Expanded:grid-flow-row Expanded:h-[calc(100vh-108px)] w-max Expanded:w-[306px] Large:grid-cols-2 Large:w-[612px]">
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
  const enhanceSelectItem = [...Array(10).keys()].map((key) => ({
    value: `${key + 1}`,
    node: <div key={key}>{key + 1}</div>,
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
  const onClickAdd = () =>
    setCondition((pre) => ({
      ...pre,
      enhanceBp: {
        enhance: filterStatus["filterCondition"],
        bp: filterStatus["value"],
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
    <ScrollArea>
      <div className="flex gap-1 w-max items-center pb-2">
        <Button
          onClick={() => (
            setCookies("condition", condition), alert("고정 완료")
          )}
        >
          고정
        </Button>
        <Button
          variant="destructive"
          onClick={() => (
            deleteCookies("condition"), setCondition({}), alert("초기화 완료")
          )}
        >
          초기화
        </Button>
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
          onSelctCallback={(value: string) => onSelctCallback(value, "feature")}
          className="w-[150px]"
        />
        <Select
          label="포지션"
          selectItems={positionSelectItem}
          onSelctCallback={(value: string) =>
            onSelctCallback(value, "position")
          }
          className="w-[100px]"
        />
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
        <div className="w-[2px] bg-border mx-4" />
        <Select
          label="강화 기준"
          selectItems={enhanceSelectItem}
          onSelctCallback={(value: string) =>
            setFilterStatus((pre) => ({
              ...pre,
              filterCondition: `bp${value}`,
            }))
          }
          className="w-[100px]"
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
          <div className="absolute right-[50px] text-muted-foreground z-10 top-1/2 -translate-y-1/2">
            억BP
          </div>
        </div>
        <Button variant="ghost" onClick={onClickAdd}>
          추가
        </Button>
        {Object.entries(condition).map(([key, value]) => {
          if (key == "enhanceBp") {
            const tempValue = value as { enhance: string; bp: string };
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
          }
          return <></>;
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
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
