"use client";

import { RadarSliceTooltipProps, ResponsiveRadar } from "@nivo/radar";
import { useState } from "react";

interface Radar1To1Props {
  target1: Record<string, number>;
  target2: Record<string, number>;
  target1Name: string;
  target2Name: string;
  viewKeys: Record<string, string>;
  target1AddPoint?: Record<string, number>;
  target2AddPoint?: Record<string, number>;
}

const adjustTarget = ({
  target1,
  target2,
  target1Name,
  target2Name,
  viewKeys,
  target1AddPoint,
  target2AddPoint,
}: Radar1To1Props) => {
  return Object.keys(viewKeys).map((key) => ({
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
};

const Radar1To1: React.FC<Radar1To1Props> = ({
  target1,
  target2,
  target1Name,
  target2Name,
  viewKeys,
  target1AddPoint,
  target2AddPoint,
}) => {
  // 데이터
  const [tooltipItems, setTooltipItems] = useState({
    index: "sprintspeed",
    value1: target1["sprintspeed"],
    value2: target2["sprintspeed"],
  });

  // 계산
  const data = adjustTarget({
    target1,
    target2,
    target1Name,
    target2Name,
    viewKeys,
    target1AddPoint,
    target2AddPoint,
  });

  // 액션
  const handleSliceTooltip = (item: RadarSliceTooltipProps) => {
    const leftData = item.data[0];
    const rightData = item.data[1];
    setTooltipItems((pre) => ({
      ...pre,
      index: `${item.index}`,
      value1: leftData.value,
      value2: rightData.value,
    }));
  };

  return (
    <div className="py-2 size-full">
      <div className="h-[110px] Medium:h-[186px] aspect-square mx-auto">
        <ResponsiveRadar
          data={data}
          keys={[target1Name, target2Name]}
          indexBy={"key"}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          valueFormat={">-.0f"}
          gridLevels={1}
          gridShape="linear"
          layers={["layers", "legends", "slices"]}
          sliceTooltip={(item) => {
            handleSliceTooltip({ ...item });
            return undefined;
          }}
          colors={["#227440", "#ffa800"]}
        />
      </div>
      <RadarToolTip
        value1={tooltipItems.value1}
        value2={tooltipItems.value2}
        index={viewKeys[tooltipItems.index]}
      />
    </div>
  );
};

type RadarToolTipProps = {
  value1: number;
  value2: number;
  index: string;
};
const RadarToolTip: React.FC<RadarToolTipProps> = ({
  value1,
  value2,
  index,
}) => {
  return (
    <div className="grid grid-cols-5 pt-1 text-center text-nowrap">
      <small className="text-[#227440]">{value1}</small>
      <small className="col-span-3">{index}</small>
      <small className="text-[#ffa800]">{value2}</small>
    </div>
  );
};

export default Radar1To1;
