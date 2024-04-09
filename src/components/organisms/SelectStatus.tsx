"use client";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlayerCompareContext } from "@/context/store";
import {
  TAddStatus,
  TAddStatusSelectCategory,
  adaptability,
  enhance,
  enhanceTeamcolor,
} from "@/lib/const";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

type ability = "ability1" | "ability2" | "ability3" | "ability4";
type abilityStatus =
  | "ability1Status"
  | "ability2Status"
  | "ability3Status"
  | "ability4Status";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

interface SelectStatusProps {
  dir: "left" | "right";
  type: TAddStatusSelectCategory;
}
const SelectStatus: React.FC<SelectStatusProps> = ({ dir, type }) => {
  const {
    playerLeft,
    playerRight,
    leftAddStatus,
    rightAddStatus,
    setLeftAddStatus,
    setRightAddStatus,
    teamcolors,
  } = usePlayerCompareContext();

  const setAddStatus = dir === "left" ? setLeftAddStatus : setRightAddStatus;
  const addStatus = dir === "left" ? leftAddStatus : rightAddStatus;
  const player = dir === "left" ? playerLeft : playerRight;

  const getEnhanceSlice = () => {
    if (addStatus.enhance?.all) {
      return addStatus.enhance?.all >= 15
        ? 5
        : addStatus.enhance?.all >= 6
        ? 3
        : addStatus.enhance?.all >= 2
        ? 1
        : 0;
    } else {
      return 0;
    }
  };

  switch (type) {
    case "adaptability":
      return (
        <Select
          onSelctCallback={(value: string) =>
            setAddStatus({
              ...addStatus,
              adaptability: adaptability[value as keyof typeof adaptability],
            })
          }
          selectItems={Object.keys(adaptability).map((key) => ({
            value: key,
            node: <div key={key}>{key}</div>,
          }))}
        />
      );
    case "enhance":
      return (
        <Select
          onSelctCallback={(value: string) =>
            setAddStatus({
              ...addStatus,
              enhance: enhance[value as keyof typeof enhance],
            })
          }
          selectItems={Object.keys(enhance).map((key) => ({
            value: key,
            node: <div key={key}>{key}</div>,
          }))}
        />
      );
    case "enhanceTeamcolor":
      return (
        <Select
          isNoneSelect
          onSelctCallback={(value: string) => {
            value === "-"
              ? (delete addStatus.enhanceTeamcolor,
                setAddStatus({ ...addStatus }))
              : setAddStatus({
                  ...addStatus,
                  enhanceTeamcolor:
                    enhanceTeamcolor[value as keyof typeof enhanceTeamcolor],
                });
          }}
          selectItems={Object.keys(enhanceTeamcolor)
            .map((key) => ({
              value: key,
              node: <div key={key}>{key}</div>,
            }))
            .slice(0, getEnhanceSlice())}
        />
      );
    case "affiliation":
      return (
        <Select
          isNoneSelect
          onSelctCallback={(value: string) => {
            value === "-"
              ? (delete addStatus.affiliation, setAddStatus({ ...addStatus }))
              : setAddStatus({
                  ...addStatus,
                  affiliation: [1, 2, 3, 4].reduce((tempStatus, idx) => {
                    const abilityKey =
                      teamcolors.affiliation[parseInt(value)][
                        `ability${idx}` as ability
                      ];
                    const abilityStatus =
                      teamcolors.affiliation[parseInt(value)][
                        `ability${idx}Status` as abilityStatus
                      ];
                    return abilityKey
                      ? { ...tempStatus, [abilityKey]: abilityStatus }
                      : { ...tempStatus };
                  }, {} as TAddStatus),
                });
          }}
          selectItems={player.teamcolors.affiliation.map((key) => ({
            value: `${key}`,
            node: <div key={key}>{teamcolors.affiliation[key].name}</div>,
            text: teamcolors.affiliation[key].name,
          }))}
        />
      );
    case "feature":
      return (
        <Select
          isNoneSelect
          onSelctCallback={(value: string) => {
            value === "-"
              ? (delete addStatus.feature, setAddStatus({ ...addStatus }))
              : setAddStatus({
                  ...addStatus,
                  feature: [1, 2, 3, 4].reduce((tempStatus, idx) => {
                    const abilityKey =
                      teamcolors.feature[parseInt(value)][
                        `ability${idx}` as ability
                      ];
                    const abilityStatus =
                      teamcolors.feature[parseInt(value)][
                        `ability${idx}Status` as abilityStatus
                      ];
                    return abilityKey
                      ? { ...tempStatus, [abilityKey]: abilityStatus }
                      : { ...tempStatus };
                  }, {} as TAddStatus),
                });
          }}
          selectItems={player.teamcolors.feature.map((key) => ({
            value: `${key}`,
            node: <div key={key}>{teamcolors.feature[key].name}</div>,
            text: teamcolors.feature[key].name,
          }))}
        />
      );
  }
};

const Select: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
    text?: string;
  }[];
  isNoneSelect?: boolean;
  className?: string;
  onSelctCallback: (value: string) => void;
}> = ({ selectItems, className, isNoneSelect, onSelctCallback }) => {
  const onSelectCallbackMobile = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelctCallback(e.target.value);
  return (
    <div className={className}>
      <SelectContainer
        defaultValue={isNoneSelect ? "" : selectItems[0].value}
        onValueChange={onSelctCallback}
      >
        <SelectTrigger className={"w-full hidden Medium:flex"}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isNoneSelect && <SelectItem value="-">-</SelectItem>}
            {selectItems.map((selectItem) => (
              <SelectItem key={selectItem.value} value={selectItem.value}>
                {selectItem.node}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectContainer>
      <select
        defaultValue={isNoneSelect ? "-" : selectItems[0].value}
        onChange={onSelectCallbackMobile}
        className={cn(CLASSNAME_SELECT, "flex Medium:hidden")}
        name="statusSelect"
      >
        {isNoneSelect && (
          <option value="-" className="bg-popover text-popover-foreground">
            -
          </option>
        )}
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

export default SelectStatus;
