"use client";
import { cn } from "@/lib/utils";
import { RadarSliceTooltipProps, ResponsiveRadar } from "@nivo/radar";
import { useEffect, useState } from "react";

interface Radar1To1Props {
  target1: Record<string, number>;
  target2: Record<string, number>;
  target1Name: string;
  target2Name: string;
  viewKeys: Record<string, string>;
  target1AddPoint?: Record<string, number>;
  target2AddPoint?: Record<string, number>;
  isComparePoint?: boolean;
}

const Radar1To1: React.FC<Radar1To1Props> = ({
  target1,
  target2,
  target1Name,
  target2Name,
  viewKeys,
  target1AddPoint,
  target2AddPoint,
  isComparePoint = true,
}) => {
  // 데이터
  const viewKeysKey = Object.keys(viewKeys);
  const [tooltipItems, setTooltipItems] = useState({
    index: viewKeysKey[0],
    value1: target1[viewKeysKey[0]],
    value2: target2[viewKeysKey[0]],
  });

  // 계산
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

  useEffect(() => {
    setTooltipItems({
      index: viewKeysKey[0],
      value1: target1[viewKeysKey[0]],
      value2: target2[viewKeysKey[0]],
    });
  }, [target1, target2]);

  return (
    <>
      <div className="aspect-square">
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
          colors={(temp) => {
            return temp.index == 0 ? "#7d1c1c" : "#22c55e";
          }}
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-3 pt-1 text-center text-nowrap",
          isComparePoint ? "" : "hidden"
        )}
      >
        <small className="col-span-2">{`${
          viewKeys[tooltipItems.index]
        }`}</small>
        <small className="text-primary">
          {Math.abs(tooltipItems.value1 - tooltipItems.value2)}
        </small>
      </div>
    </>
  );
};

export default Radar1To1;
