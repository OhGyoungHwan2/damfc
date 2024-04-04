"use client";

import Combobox from "@/components/molecules/Combobox";
import { status, statusGK } from "@/lib/const";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type allCondition =
  | keyof typeof status
  | keyof typeof statusGK
  | "affiliation"
  | "feature"
  | "mainfoot"
  | "weakfoot"
  | "physical";

type TCondition = Partial<
  Record<
    allCondition,
    | string
    | number
    | {
        min: number;
        max: number;
      }
  >
>;
type PlayerScrollType = {
  condition: TCondition;
  setCondition: Dispatch<SetStateAction<TCondition>>;
};
const PlayerScrollContext = createContext<PlayerScrollType>({
  condition: {},
  setCondition: () => {},
});

const usePlayerScrollContext = () => useContext(PlayerScrollContext);

export const PlayerScrollProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [condition, setCondition] = useState<TCondition>({});
  return (
    <PlayerScrollContext.Provider
      value={{
        condition,
        setCondition,
      }}
    >
      {children}
    </PlayerScrollContext.Provider>
  );
};

export const PlayerScrollCombobox: React.FC<{
  commandItems: { value: string; node: React.ReactNode }[];
  type: "affiliation" | "feature";
}> = ({ commandItems, type }) => {
  const { setCondition } = usePlayerScrollContext();
  const onSelctCallback = (value: string) =>
    setCondition((pre) => ({ ...pre, [type]: value.toUpperCase() }));
  return (
    <Combobox
      defaultValue=""
      commandItems={commandItems}
      onSelctCallback={onSelctCallback}
    />
  );
};
