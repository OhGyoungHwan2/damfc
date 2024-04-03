"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ComboboxProps {
  defaultValue: string;
  onSelctCallback: (value: string) => void;
  commandItems: {
    value: string;
    node: React.ReactNode;
  }[];
}
const Combobox: React.FC<ComboboxProps> = ({
  defaultValue,
  onSelctCallback,
  commandItems,
}) => {
  // 데이터
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  // 계산
  const textCompare = (pre: string, next: string) =>
    pre.toUpperCase() === next.toUpperCase();
  // 액션
  const onSelectCombobox = (currentValue: string) => {
    setValue(textCompare(currentValue, value) ? defaultValue : currentValue);
    onSelctCallback(
      textCompare(currentValue, value) ? defaultValue : currentValue
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {value
            ? commandItems.find((commandItem) =>
                textCompare(commandItem.value, value)
              )?.node
            : "..."}
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="검색..." className="h-9" />
          <CommandEmpty>결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            <ScrollArea
              className="max-h-[30vh] overflow-y-scroll"
              type="always"
            >
              <div className="h-max">
                {commandItems.map((commandItem) => (
                  <CommandItem
                    key={commandItem.value}
                    value={commandItem.value}
                    onSelect={onSelectCombobox}
                  >
                    {commandItem.node}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        textCompare(commandItem.value, value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </div>
              <ScrollBar />
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
