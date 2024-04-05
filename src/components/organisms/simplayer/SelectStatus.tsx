"use client";

import { TGETPlayer } from "@/app/api/player/[spid]/route";
import Select from "@/components/molecules/Select";
import { usePlayerCompareContext } from "@/context/store";
import {
  TAddStatus,
  TAddStatusSelectCategory,
  adaptability,
  enhance,
  enhanceTeamcolor,
} from "@/lib/const";

type ability = "ability1" | "ability2" | "ability3" | "ability4";
type abilityStatus =
  | "ability1Status"
  | "ability2Status"
  | "ability3Status"
  | "ability4Status";

interface SelectStatusProps {
  dir: "left" | "right";
  type: TAddStatusSelectCategory;
  teamcolors: TGETPlayer["teamcolors"];
}
const SelectStatus: React.FC<SelectStatusProps> = ({
  dir,
  type,
  teamcolors,
}) => {
  const {
    playerLeft,
    playerRight,
    leftAddStatus,
    rightAddStatus,
    setLeftAddStatus,
    setRightAddStatus,
  } = usePlayerCompareContext();
  const setAddStatus = dir === "left" ? setLeftAddStatus : setRightAddStatus;
  const addStatus = dir === "left" ? leftAddStatus : rightAddStatus;
  const player = dir === "left" ? playerLeft : playerRight;
  const createSelectItems = () => {
    switch (type) {
      case "adaptability":
        return Object.keys(adaptability).map((key) => ({
          value: key,
          node: <div key={key}>{key}</div>,
        }));
      case "enhance":
        return Object.keys(enhance).map((key) => ({
          value: key,
          node: <div key={key}>{key}</div>,
        }));
      case "enhanceTeamcolor":
        return Object.keys(enhanceTeamcolor).map((key) => ({
          value: key,
          node: <div key={key}>{key}</div>,
        }));
      case "affiliation":
        return player.teamcolors.affiliation.map((key) => ({
          value: `${key}`,
          node: <div key={key}>{teamcolors.affiliation[key].name}</div>,
          text: teamcolors.affiliation[key].name,
        }));
      case "feature":
        return player.teamcolors.feature.map((key) => ({
          value: `${key}`,
          node: <div key={key}>{teamcolors.feature[key].name}</div>,
          text: teamcolors.feature[key].name,
        }));
    }
  };

  const createSelectCallback = () => {
    switch (type) {
      case "adaptability":
        return (value: string) =>
          setAddStatus({
            ...addStatus,
            adaptability: adaptability[value as keyof typeof adaptability],
          });
      case "enhance":
        return (value: string) =>
          setAddStatus({
            ...addStatus,
            enhance: enhance[value as keyof typeof enhance],
          });
      case "enhanceTeamcolor":
        return (value: string) =>
          setAddStatus({
            ...addStatus,
            enhanceTeamcolor:
              enhanceTeamcolor[value as keyof typeof enhanceTeamcolor],
          });
      case "affiliation":
        return (value: string) =>
          setAddStatus({
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
                ? { ...tempStatus, [abilityKey]: [abilityStatus] }
                : { ...tempStatus };
            }, {} as TAddStatus),
          });
      case "feature":
        return (value: string) =>
          setAddStatus({
            ...addStatus,
            feature: [1, 2, 3, 4].reduce((tempStatus, idx) => {
              const abilityKey =
                teamcolors.feature[parseInt(value)][`ability${idx}` as ability];
              const abilityStatus =
                teamcolors.feature[parseInt(value)][
                  `ability${idx}Status` as abilityStatus
                ];
              return abilityKey
                ? { ...tempStatus, [abilityKey]: [abilityStatus] }
                : { ...tempStatus };
            }, {} as TAddStatus),
          });
    }
  };
  const defaultValue = type === "enhance" || type === "adaptability" ? "1" : "";

  return (
    <Select
      defaultValue={defaultValue}
      onSelctCallback={createSelectCallback()}
      selectItems={createSelectItems()}
    />
  );
};

export default SelectStatus;
