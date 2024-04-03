"use client";
import { TGETPlayer } from "@/app/api/player/[spid]/route";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  adaptability,
  enhance,
  enhanceTeamcolor,
  TAddStatus,
  TAddStatusSelectCategory,
  TAllStatus,
  TSelectAddStatus,
} from "@/lib/const";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PlayerAddSelectProps {
  player: TGETPlayer["simPlayers"][0];
  teamcolors: TGETPlayer["teamcolors"];
  setSelectAddStatus: (
    value: Partial<
      Record<TAddStatusSelectCategory, Partial<Record<TAllStatus, number>>>
    >
  ) => void;
}

const PlayerAddSelect: React.FC<PlayerAddSelectProps> = ({
  player,
  teamcolors,
  setSelectAddStatus,
}) => {
  // 데이터
  const [addStatus, setAddStatus] = useState<TSelectAddStatus>({});
  const [enhanceTeamcolorSlice, setEnhanceTeamcolorSlice] = useState(0);
  // 계산
  const createSelectItems = (
    selectValues: string[] | number[],
    type: TAddStatusSelectCategory
  ) => {
    return selectValues.map((value) => (
      <SelectItem key={`${value}div`} value={`${value}`}>
        {type === "enhance" ||
        type === "adaptability" ||
        type === "enhanceTeamcolor"
          ? value
          : teamcolors[type][parseInt(`${value}`)].name}
      </SelectItem>
    ));
  };

  const createTeamcolorStatus = (
    teamIds: number[],
    type: "affiliation" | "feature"
  ) => {
    return teamIds.reduce((tempTeamcolor, teamId) => {
      const tempAddStatus = {} as TAddStatus;
      [...Array(4).keys()].map((idx) => {
        const ability = `ability${idx + 1}` as
          | "ability1"
          | "ability2"
          | "ability3"
          | "ability4";
        const abilityStatus = `ability${idx + 1}Status` as
          | "ability1Status"
          | "ability2Status"
          | "ability3Status"
          | "ability4Status";
        const tempStatusName = teamcolors[type][teamId][ability] as
          | TAllStatus
          | "all"
          | null;
        tempStatusName &&
          (tempAddStatus[tempStatusName] =
            teamcolors[type][teamId][abilityStatus]);
      });
      return { ...tempTeamcolor, [teamId]: tempAddStatus };
    }, {} as Record<string, TAddStatus>);
  };

  const createOnValueChange = (
    type: TAddStatusSelectCategory,
    option: Record<string | number, TAddStatus>
  ) => {
    return (value: string) =>
      setAddStatus((pre) => {
        return value == "0"
          ? { ...pre, [type]: {} }
          : { ...pre, [type]: option[value] };
      });
  };

  // 액션
  const onValueChangeEnhance = (value: string) => {
    const enhanceCount = parseInt(value);
    const sliceCount =
      enhanceCount < 3
        ? 0
        : enhanceCount < 5
        ? 1
        : enhanceCount < 8
        ? 3
        : enhanceCount <= 10
        ? 5
        : 0;
    setEnhanceTeamcolorSlice(sliceCount);
    const vlaueChange = createOnValueChange("enhance", enhance);
    vlaueChange(value);
  };
  useEffect(() => {
    setSelectAddStatus({ ...addStatus });
  }, [addStatus]);

  return (
    <div className="grid grid-cols-6 gap-0.5">
      <Select
        selectItems={createSelectItems(Object.keys(enhance), "enhance")}
        onValueChange={onValueChangeEnhance}
        className="col-span-2"
        defaultValue="1"
        label="강화"
      />
      <Select
        selectItems={createSelectItems(
          Object.keys(adaptability),
          "adaptability"
        )}
        onValueChange={createOnValueChange("adaptability", adaptability)}
        className="col-span-2"
        defaultValue="1"
        label="적응도"
      />
      <Select
        selectItems={createSelectItems(
          Object.keys(enhanceTeamcolor),
          "enhanceTeamcolor"
        ).slice(0, enhanceTeamcolorSlice)}
        onValueChange={createOnValueChange(
          "enhanceTeamcolor",
          enhanceTeamcolor
        )}
        className="col-span-2"
        label="강화 팀컬러"
      />
      <Select
        selectItems={createSelectItems(
          player.teamcolors.affiliation,
          "affiliation"
        )}
        onValueChange={createOnValueChange(
          "affiliation",
          createTeamcolorStatus(player.teamcolors.affiliation, "affiliation")
        )}
        className="col-span-3"
        label="소속 팀컬러"
      />
      <Select
        selectItems={createSelectItems(player.teamcolors.feature, "feature")}
        onValueChange={createOnValueChange(
          "feature",
          createTeamcolorStatus(player.teamcolors.feature, "feature")
        )}
        className="col-span-3"
        label="특성 팀컬러"
      />
    </div>
  );
};

type TSelect = {
  selectItems: React.ReactNode[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  className?: string;
  label?: string;
};
const Select: React.FC<TSelect> = ({
  selectItems,
  defaultValue,
  onValueChange,
  className,
  label,
}) => {
  return (
    <SelectContainer defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={cn(className, "relative")}>
        {label && (
          <small className="absolute top-0 text-xs -translate-y-1/2 left-1 text-muted-foreground">
            {label}
          </small>
        )}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!defaultValue && (
            <SelectItem key={`SelectItem0`} value={"0"}>
              {"-"}
            </SelectItem>
          )}
          {selectItems.map((_, idx) => selectItems[idx])}
        </SelectGroup>
      </SelectContent>
    </SelectContainer>
  );
};

export default PlayerAddSelect;
