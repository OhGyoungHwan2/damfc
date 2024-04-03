"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Combobox from "@/components/molecules/Combobox";
import { createContext, useContext, useState } from "react";

type ComboboxTabsType = {
  value: string;
  onSelctCallback: (value: string) => void;
};
const ComboboxTabsContext = createContext<ComboboxTabsType>({
  value: "",
  onSelctCallback: () => {},
});

const useComboboxTabsContext = () => useContext(ComboboxTabsContext);

export const ComboboxTabsCombobox: React.FC<{
  commandItems: {
    value: string;
    node: React.ReactNode;
  }[];
}> = ({ commandItems }) => {
  const { onSelctCallback } = useComboboxTabsContext();
  return (
    <Combobox
      commandItems={commandItems}
      defaultValue={commandItems[0].value}
      onSelctCallback={onSelctCallback}
    />
  );
};

export const ComboboxTabsTabs: React.FC<{
  tabItems: {
    value: string;
    node: React.ReactNode;
  }[];
}> = ({ tabItems }) => {
  const { value } = useComboboxTabsContext();
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

export const ComboboxTabsProvider: React.FC<{
  children: React.ReactNode;
  defaultValue: string;
}> = ({ children, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const onSelctCallback = (value: string) => setValue(value.toUpperCase());
  return (
    <ComboboxTabsContext.Provider
      value={{
        value,
        onSelctCallback,
      }}
    >
      {children}
    </ComboboxTabsContext.Provider>
  );
};
