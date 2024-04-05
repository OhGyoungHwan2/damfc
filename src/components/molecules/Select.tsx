"use client";

import * as React from "react";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const SELECTCLASSNAME =
//   "Medium:hidden w-full flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

interface SelectProps {
  defaultValue: string;
  onSelctCallback: (value: string) => void;
  selectItems: {
    value: string;
    node: React.ReactNode;
    text?: string;
  }[];
}
const Select: React.FC<SelectProps> = ({
  defaultValue,
  onSelctCallback,
  selectItems,
}) => {
  // 데이터
  const [value, setValue] = React.useState(defaultValue);
  // 계산
  const textCompare = (pre: string, next: string) =>
    pre.toUpperCase() === next.toUpperCase();
  // 액션
  const onSelect = (currentValue: string) => {
    setValue(textCompare(currentValue, value) ? defaultValue : currentValue);
    onSelctCallback(
      textCompare(currentValue, value) ? defaultValue : currentValue
    );
  };

  return (
    <>
      <SelectContainer value={value} onValueChange={onSelect}>
        <SelectTrigger className={"w-full"}>
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
      {/* <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className={SELECTCLASSNAME}
      >
        {selectItems.map((selectItem) => (
          <option
            key={selectItem.value}
            value={selectItem.value}
            className="bg-popover text-popover-foreground"
          >
            {selectItem.text || selectItem.node}
          </option>
        ))}
      </select> */}
    </>
  );
};

export default Select;
