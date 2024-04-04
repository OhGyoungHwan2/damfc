"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePlayerCompareContext } from "@/context/store";
import { TSelectAddStatus, statusOrder, status, statusGK } from "@/lib/const";
import { point2color } from "@/lib/cssfuntion";

const AllStatus = { ...status, ...statusGK };

const Table: React.FC = () => {
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
    <ScrollArea className="size-full">
      <div className="flex flex-col flex-wrap w-max h-[210px] Medium:h-[300px] Expanded:h-[400px] mx-auto">
        {statusOrder.map((statusKey) => {
          const leftCell =
            playerLeft[statusKey] + addStatus2point(leftAddStatus, statusKey);
          const rightCell =
            playerRight[statusKey] + addStatus2point(rightAddStatus, statusKey);
          const gapLeftRight = leftCell - rightCell;
          return (
            <div
              key={statusKey}
              className="grid justify-center grid-cols-3 gap-1 text-sm"
            >
              <div className="col-span-1 text-right">
                <span className="text-primary">
                  {gapLeftRight > 0 && `+${gapLeftRight} `}
                </span>
                <span className={point2color(leftCell)}>{leftCell}</span>
              </div>
              <div className="col-span-1 text-center">
                {AllStatus[statusKey]}
              </div>
              <div className="col-span-1 text-left">
                <span className={point2color(rightCell)}>{rightCell}</span>
                <span className="text-primary">
                  {gapLeftRight < 0 && ` +${gapLeftRight * -1}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Table;
