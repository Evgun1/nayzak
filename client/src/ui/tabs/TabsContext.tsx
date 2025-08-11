"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextProps {
    activeTab: number;
    setActiveTab: (tab: number) => void;
    vertical?: boolean;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const TabsProvider: React.FC<{
    children: ReactNode;
    isVertical?: boolean;
}> = (props) => {
    const { children, isVertical } = props;

    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <TabsContext.Provider
            value={{ activeTab, setActiveTab, vertical: isVertical }}
        >
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = (): TabsContextProps => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }
    return context;
};
