"use client";
import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs as TabsContainer, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChangeEvent, createContext, useContext, useState } from "react";

const CLASSNAME_SELECT =
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

type SelectTabsType = {
  value: string;
  onSelctCallback: (value: string) => void;
};
const SelectTabsContext = createContext<SelectTabsType>({
  value: "",
  onSelctCallback: () => {},
});

const useSelectTabsContext = () => useContext(SelectTabsContext);

export const SelectTabs_Provider: React.FC<{
  children: React.ReactNode;
  defaultValue: string;
}> = ({ children, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const onSelctCallback = (value: string) => setValue(value.toUpperCase());
  return (
    <SelectTabsContext.Provider
      value={{
        value,
        onSelctCallback,
      }}
    >
      {children}
    </SelectTabsContext.Provider>
  );
};

export const SelectTabs_Select: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
  }[];
  className?: string;
}> = ({ selectItems, className }) => {
  const { onSelctCallback, value } = useSelectTabsContext();
  const onSelectCallbackMobile = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelctCallback(e.target.value);
  return (
    <div className={className}>
      <SelectContainer value={value} onValueChange={onSelctCallback}>
        <SelectTrigger className={"w-full hidden Medium:flex"}>
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
      <select
        value={value}
        onChange={onSelectCallbackMobile}
        className={cn(CLASSNAME_SELECT, "flex Medium:hidden")}
        id={`${selectItems[0].value}select`}
      >
        {selectItems.map((selectItem) => (
          <option
            key={selectItem.value}
            value={selectItem.value}
            className="bg-popover text-popover-foreground"
          >
            {selectItem.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectTabs_Tabs: React.FC<{
  tabItems: {
    value: string;
    node: React.ReactNode;
  }[];
  className?: string;
}> = ({ tabItems, className }) => {
  const { value } = useSelectTabsContext();
  return (
    <TabsContainer value={value} className={className}>
      {tabItems.map((tabItem) => (
        <TabsContent key={`${tabItem.value}`} value={tabItem.value}>
          {tabItem.node}
        </TabsContent>
      ))}
    </TabsContainer>
  );
};
