"use client";

import { FC, ReactNode } from "react";
import classes from "./Tabs.module.scss";
import { useTabs } from "./TabsContext";

type TabsHeaderProps = {
    children: ReactNode;
    className?: string;
};

const TabsHeader: FC<TabsHeaderProps> = ({ children, className }) => {
    const { vertical } = useTabs();

    return (
        <div
            className={`${
                vertical
                    ? `${classes["tabs__header--vertical"]} ${classes["tabs__header"]}`
                    : classes["tabs__header"]
            } ${className ? className : ""}`}
        >
            {children}
        </div>
    );
};

export default TabsHeader;
