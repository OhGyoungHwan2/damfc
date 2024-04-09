"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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
import { status, statusGK } from "@/lib/const";
import { usePlayerCompareContext } from "@/context/store";
import { deleteCookies, setCookies } from "@/lib/actions";
import PlayerCard from "./PlayerCard";
import { cn } from "@/lib/utils";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

type allCondition =
  | keyof typeof status
  | keyof typeof statusGK
  | "affiliation"
  | "feature"
  | "mainfoot"
  | "weakfoot"
  | "physical";

type conditionValue =
  | string
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
  const renderPlayerCard = () =>
    players.map((player, idx) => {
      const isRender = Object.entries(condition).every(([key, value]) => {
        if (["affiliation", "feature"].includes(key)) {
          const tempKey = key as "affiliation" | "feature";
          const tempTeamId = value as string;
          return (
            tempTeamId &&
            player.teamcolors[tempKey].includes(parseInt(tempTeamId))
          );
        }
        return true;
      });
      return isRender ? (
        <StateLayer key={player.id} className="bg-foreground">
          <ContextMenu>
            <ContextMenuTrigger>
              <PlayerCard player={player} isBp />
              <div
                className={cn(
                  "absolute top-0 left-0 bg-secondary rounded-full size-[18px] text-center leading-none",
                  idx + 1 === 1 && "bg-[#D5A11E]",
                  idx + 1 === 2 && "bg-[#A3A3A3]",
                  idx + 1 === 3 && "bg-[#CD7F32]"
                )}
              >
                {idx + 1}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => setPlayerRight(player)}>
                오른쪽 교체
              </ContextMenuItem>
              <ContextMenuItem onClick={() => setPlayerLeft(player)}>
                왼쪽 교체
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </StateLayer>
      ) : null;
    });
  // 액션
  return (
    <ScrollArea>
      <div className="grid grid-flow-col grid-rows-1 Medium:grid-rows-2 gap-4 justify-start Expanded:grid-rows-none Expanded:grid-cols-1 Expanded:grid-flow-row Expanded:h-[calc(100vh-100px)] w-max Expanded:w-[360px]">
        {renderPlayerCard()}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export const PlayerScroll_Filter: React.FC = () => {
  // 데이터
  const { condition, setCondition, teamcolors } = usePlayerScrollContext();
  const onSelctCallback = (value: string, type: allCondition) => {
    value === "-"
      ? setCondition((pre) => {
          delete pre[type];
          return { ...pre };
        })
      : setCondition((pre) => ({ ...pre, [type]: value.toUpperCase() }));
  };

  const affiliationSelectItem = Object.entries(teamcolors.affiliation).map(
    ([key, value]) => ({
      value: `${key}`,
      node: <div key={key}>{value.name}</div>,
      text: value.name,
    })
  );
  const featureSelectItem = Object.entries(teamcolors.feature).map(
    ([key, value]) => ({
      value: `${key}`,
      node: <div key={key}>{value.name}</div>,
      text: value.name,
    })
  );
  // 계산
  // 액션
  return (
    <ScrollArea>
      <div className="flex gap-1 w-max">
        <Button onClick={() => setCookies("condition", condition)}>고정</Button>
        <Button onClick={() => deleteCookies("condition")}>초기화</Button>
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
        id={`${selectItems[0].value}select`}
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
