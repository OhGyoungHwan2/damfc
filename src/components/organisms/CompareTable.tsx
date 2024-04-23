"use client";

import { Roboto_Mono } from "next/font/google";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePlayerCompareContext } from "@/context/store";
import { TSelectAddStatus, statusOrder, status, statusGK } from "@/lib/const";
import { bp2string, point2color } from "@/lib/cssfuntion";
import { cn } from "@/lib/utils";
import Enhancement from "../molecules/Enhancement";

const AllStatus = { ...status, ...statusGK };

const robotoMono = Roboto_Mono({
  weight: "700",
  subsets: ["latin"],
});

const CompareTable: React.FC = () => {
  const { playerLeft, playerRight, leftAddStatus, rightAddStatus } =
    usePlayerCompareContext();

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
    <ScrollArea id="ScrollAreaWrapRow" className="pr-4 size-full">
      <div className="flex flex-col flex-wrap items-start justify-start h-full gap-0.5 text-sm w-max Large:text-base">
        {/* 스탯 */}
        {statusOrder.map((statusKey) => {
          const leftCell =
            playerLeft[statusKey] + addStatus2point(leftAddStatus, statusKey);
          const rightCell =
            playerRight[statusKey] + addStatus2point(rightAddStatus, statusKey);
          const gapLeftRight = leftCell - rightCell;
          return (
            <div key={statusKey} className="flex gap-1">
              <div
                className={cn(
                  "text-right w-[60px] Large:w-[70px]",
                  robotoMono.className
                )}
              >
                <span className="text-primary">
                  {gapLeftRight > 0 && `+${gapLeftRight} `}
                </span>
                <span className={point2color(leftCell)}>
                  {leftCell < 100 ? (
                    <>&nbsp;</>
                  ) : leftCell < 10 ? (
                    <>&nbsp;&nbsp;</>
                  ) : (
                    <></>
                  )}
                  {leftCell}
                </span>
              </div>
              <div className="text-center w-[100px] justify-self-center">
                {AllStatus[statusKey]}
              </div>
              <div
                className={cn(
                  "text-left w-[60px] Large:w-[70px]",
                  robotoMono.className
                )}
              >
                <span className={point2color(rightCell)}>
                  {rightCell}
                  {rightCell < 100 ? (
                    <>&nbsp;</>
                  ) : rightCell < 10 ? (
                    <>&nbsp;&nbsp;</>
                  ) : (
                    <></>
                  )}
                </span>
                <span className="text-primary">
                  {gapLeftRight < 0 && ` +${gapLeftRight * -1}`}
                </span>
              </div>
            </div>
          );
        })}
        {/* 가격 */}
        {(
          [
            "bp1",
            "bp2",
            "bp3",
            "bp4",
            "bp5",
            "bp6",
            "bp7",
            "bp8",
            "bp9",
            "bp10",
          ] as const
        ).map((key) => {
          return (
            <div key={key} className="flex gap-0.5 pl-8">
              <Enhancement
                className="w-[24px] mx-auto"
                enhance={parseInt(key.replace("bp", ""))}
              />
              <div
                className={cn("text-right w-[70px] text-foreground text-sm")}
              >
                <span>{bp2string(playerLeft[key] || 0)}</span>
              </div>
              <div
                className={cn("text-right w-[70px] text-foreground text-sm")}
              >
                <span>{bp2string(playerRight[key] || 0)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CompareTable;
