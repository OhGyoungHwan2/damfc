"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TransparencyGridIcon } from "@radix-ui/react-icons";

import { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { SquadType, useSquadContext } from "@/context/store";
import { cn } from "@/lib/utils";
import { enhance } from "@/lib/const";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import PlayerInfo from "./PlayerInfo";
import { bp2string } from "@/lib/cssfuntion";
import ImageAspectRatio from "../molecules/ImageAspectRatio";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

const SquadMaker: React.FC = () => {
  const { squadPlayers, onChangeEnhance, onDeletePlayer } = useSquadContext();
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="outline">
                <TransparencyGridIcon className="w-[20px] h-[20px]" />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-background">
            <small className="text-foreground">스쿼드 보기</small>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>스쿼드 가격 체크</SheetTitle>
          <SheetDescription>
            스쿼드를 완성해 가격을 확인하세요.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[50dvh]">
          <div className="flex flex-col gap-1 h-max py-2 divide-y-2 divide-border">
            {Object.entries(squadPlayers).map(([key, playerEnhance]) => (
              <div className="relative flex justify-between py-1" key={key}>
                <div className="flex">
                  <div className="flex flex-col items-center">
                    {playerEnhance.player && (
                      <ImageAspectRatio
                        width={64}
                        imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${playerEnhance.player.imgId}.AVIF?raw=true`}
                        alt={`${playerEnhance.player.season}${playerEnhance.player.name}이미지`}
                      />
                    )}
                    {playerEnhance.player && (
                      <small>
                        {bp2string(
                          playerEnhance.player[`bp${playerEnhance.enhance}`]
                        )}
                        BP
                      </small>
                    )}
                  </div>
                  {playerEnhance.player && (
                    <PlayerInfo
                      player={playerEnhance.player}
                      enhance={playerEnhance.enhance}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <Select
                    selectItems={Object.keys(enhance).map((value) => ({
                      value: value,
                      node: <div key={value}>{value}</div>,
                    }))}
                    onSelctCallback={(value) =>
                      onChangeEnhance(
                        key as keyof SquadType["squadPlayers"],
                        parseInt(value) as
                          | 1
                          | 2
                          | 3
                          | 4
                          | 5
                          | 6
                          | 7
                          | 8
                          | 9
                          | 10
                      )
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      onDeletePlayer(key as keyof SquadType["squadPlayers"])
                    }
                  >
                    비우기
                  </Button>
                </div>
                <div className="size-[16px] rounded-full absolute left-0 top-0">
                  {key}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export const SquadAddPlayer: React.FC<{
  children: React.ReactNode;
  player: TGETPlayer["player"];
}> = ({ children, player }) => {
  const selectItems = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "GK",
  ] as const;
  const { squadPlayers, onChangeSquadPlayer } = useSquadContext();
  const onClickCallback = (value: string) =>
    onChangeSquadPlayer(player, value as keyof SquadType["squadPlayers"]);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>자리 선택</DialogTitle>
          <DialogDescription>GK는 GK만 선택 가능합니다.</DialogDescription>
        </DialogHeader>
        {selectItems.map((key) => (
          <Button
            onClick={() => onClickCallback(key)}
            variant={squadPlayers[key].player ? "secondary" : "outline"}
            key={key}
          >
            {key}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  );
};

const Select: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
  }[];
  onSelctCallback: (value: string) => void;
}> = ({ selectItems, onSelctCallback }) => {
  const onSelectCallbackMobile = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelctCallback(e.target.value);
  return (
    <div className={"relative"}>
      <small className="text-xs absolute top-0 left-2 -translate-y-1/2">
        {"강화"}
      </small>
      <SelectContainer onValueChange={onSelctCallback}>
        <SelectTrigger className={"w-full hidden Medium:flex"}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
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
        id={`enhanceSelect`}
      >
        {selectItems.map((selectItem) => (
          <option
            key={selectItem.value}
            value={selectItem.value}
            className="bg-popover text-popover-foreground"
          >
            {selectItem.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SquadMaker;
