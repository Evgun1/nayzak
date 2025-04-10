// "use client";

import TabsHeader from "./TabsHeader";
import { TabsProvider, useTabs } from "./TabsContext";
import { ReactNode } from "react";
import TabsBody from "./TabsBody";
import TabsToggle from "./TabsToggle";

import classes from "./Tabs.module.scss";

type TabsProps = {
    children: ReactNode;
    isVertical?: boolean;
};

function Tabs({ children, isVertical }: TabsProps) {
    return (
        <TabsProvider isVertical={isVertical}>
            <div
                className={`${classes["tabs"]} ${
                    isVertical ? classes["tabs--vertical"] : ""
                }`}
            >
                {children}
            </div>
        </TabsProvider>
    );
}

export default Object.assign(Tabs, {
    Header: TabsHeader,
    Body: TabsBody,
    Toggle: TabsToggle,
});
