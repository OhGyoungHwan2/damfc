"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Select from "@/components/molecules/Select";
import { createContext, useContext, useState } from "react";

type SelectTabsType = {
  value: string;
  onSelctCallback: (value: string) => void;
};
const SelectTabsContext = createContext<SelectTabsType>({
  value: "",
  onSelctCallback: () => {},
});

const useSelectTabsContext = () => useContext(SelectTabsContext);

export const SelectTabsSelect: React.FC<{
  selectItems: {
    value: string;
    node: React.ReactNode;
  }[];
}> = ({ selectItems }) => {
  const { onSelctCallback } = useSelectTabsContext();
  return (
    <div className="w-[150px]">
      <Select
        selectItems={selectItems}
        defaultValue={selectItems[0].value}
        onSelctCallback={onSelctCallback}
      />
    </div>
  );
};

export const SelectTabsTabs: React.FC<{
  tabItems: {
    value: string;
    node: React.ReactNode;
  }[];
}> = ({ tabItems }) => {
  const { value } = useSelectTabsContext();
  return (
    <Tabs value={value} className="w-full">
      {tabItems.map((tabItem) => (
        <TabsContent key={`${tabItem.value}`} value={tabItem.value}>
          {tabItem.node}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export const SelectTabsProvider: React.FC<{
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
