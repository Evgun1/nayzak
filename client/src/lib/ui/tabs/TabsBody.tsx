"use client";

import { FC, ReactNode } from "react";
import { useTabs } from "./TabsContext";

import classes from "./Tabs.module.scss";

type TabsBodyProps = { children: ReactNode[]; className?: string };

const TabsBody: FC<TabsBodyProps> = ({ children, className }) => {
    const { activeTab } = useTabs();

    return (
        <div
            className={`${className ? className : ""} ${classes["tabs__body"]}`}
        >
            {children[activeTab]}
        </div>
    );
};

export default TabsBody;
