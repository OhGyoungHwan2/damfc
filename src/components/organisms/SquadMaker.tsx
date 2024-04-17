"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  TransparencyGridIcon,
  TrashIcon,
  UpdateIcon,
  ResetIcon,
} from "@radix-ui/react-icons";

import { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { useSquadContext } from "@/context/store";
import { cn } from "@/lib/utils";
import { enhance } from "@/lib/const";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import { bp2string } from "@/lib/cssfuntion";
import ImageAspectRatio from "../molecules/ImageAspectRatio";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { TRecommend } from "@/app/api/recommend/route";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

type enhanceSelect = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const SquadMaker: React.FC = () => {
  const {
    squadPlayers,
    onChangeEnhance,
    onDeletePlayer,
    onUpdateSquadPlayers,
    onClear,
  } = useSquadContext();

  const allBP = squadPlayers.reduce((sum, { player, enhance }) => {
    return (sum += player?.[`bp${enhance}`] || 0);
  }, 0);

  const allPay = squadPlayers.reduce((sum, { player }) => {
    return (sum += player?.pay || 0);
  }, 0);

  const onClickUpdate = () => {
    onUpdateSquadPlayers();
  };
  const onClickReset = () => onClear();

  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                name="스쿼드 보기"
                onClick={onClickUpdate}
              >
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
        <div className="flex gap-1 w-full justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => onClickUpdate()}>
                  <UpdateIcon className="size-[20px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-background">
                <small className="text-foreground">최신화</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => onClickReset()}>
                  <ResetIcon className="size-[20px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-background">
                <small className="text-foreground">비우기</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ScrollArea className="h-[70dvh] pr-1">
          <div className="flex flex-col h-max gap-2 divide-y-2 divide-border">
            {squadPlayers.map(({ player, enhance: playerEnhance }, idx) =>
              player ? (
                <div className="px-1 pt-2 pb-1 relative w-full" key={idx}>
                  <div className="flex flex-1">
                    <ImageAspectRatio
                      width={64}
                      imgSrc={`https://github.com/OhGyoungHwan2/damfc/blob/main/public/player/${player.imgId}.AVIF?raw=true`}
                      alt={`${player.season}${player.name}이미지`}
                    />
                    <div className="flex flex-col justify-between">
                      <div className="flex gap-1 items-center">
                        <ImageAspectRatio
                          width={20}
                          imgSrc={`/season/${player.season}.png`}
                          alt={`${player.season}이미지`}
                        />
                        <small>{player.name}</small>
                      </div>
                      <Select
                        value={`${playerEnhance}`}
                        selectItems={Object.keys(enhance).map((value) => ({
                          value: value,
                          node: <div key={value}>{value}</div>,
                        }))}
                        onSelctCallback={(value) =>
                          onChangeEnhance(idx, parseInt(value) as enhanceSelect)
                        }
                      />
                    </div>
                  </div>
                  <div className="absolute top-1 right-1 bg-background">
                    <Button variant="ghost" onClick={() => onDeletePlayer(idx)}>
                      <TrashIcon className="size-[20px]" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-background">
                    <small>{`${bp2string(
                      player?.[`bp${playerEnhance}`] || 0
                    )} BP`}</small>
                  </div>
                  <div className="size-[16px] absolute left-0 top-0 rounded-full">
                    {idx + 1}
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <SheetFooter>
          <div className="flex flex-col w-full">
            <div className="w-full flex justify-between">
              <span className="text-muted-foreground font-bold">총 급여</span>
              <span
                className={
                  allPay > 255 ? "text-destructive" : "text-foreground"
                }
              >
                {`${allPay}/255`}
              </span>
            </div>
            <div className="w-full flex justify-between">
              <span className="text-muted-foreground font-bold">총 가격</span>
              <span>{`${bp2string(allBP)} BP`}</span>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const SquadAddPlayer: React.FC<{
  children: React.ReactNode;
  player: TGETPlayer["player"] | TRecommend["player"];
}> = ({ children, player }) => {
  const { onAddSquadPlayer } = useSquadContext();
  const onClickCallback = () => onAddSquadPlayer(player);
  return <div onClick={() => onClickCallback()}>{children}</div>;
};

const Select: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
  }[];
  value: string;
  onSelctCallback: (value: string) => void;
}> = ({ selectItems, value, onSelctCallback }) => {
  const onSelectCallbackMobile = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelctCallback(e.target.value);
  return (
    <div className={"relative"}>
      <small className="text-xs absolute top-0 left-2 -translate-y-1/2">
        {"강화"}
      </small>
      <SelectContainer value={value} onValueChange={onSelctCallback}>
        <SelectTrigger className={"hidden Medium:flex w-[100px]"}>
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
        value={value}
        onChange={onSelectCallbackMobile}
        className={cn(CLASSNAME_SELECT, "flex Medium:hidden w-[100px]")}
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
