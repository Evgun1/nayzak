"use client";
import { FC, useCallback, useContext, useState } from "react";
import { useTabs } from "./TabsContext";
import ButtonCustom from "../custom-elements/button-custom/ButtonCustom";
import classes from "./Tabs.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";

type TabsToggleProps = {
    label: string;
    index: number;
    className?: string;
};

const TabsToggle: FC<TabsToggleProps> = ({ label, index, className }) => {
    const { activeTab, setActiveTab } = useTabs();

    const clickHandler = (index: number) => {
        setActiveTab(index);
    };

    return (
        <button
            className={`${className ? className : ""} ${
                activeTab === index
                    ? `${classes["tabs__toggle--action"]}  ${classes["tabs__toggle"]}`
                    : classes["tabs__toggle"]
            } ${ButtonClassList.BUTTON_MEDIUM}`}
            onClick={() => clickHandler(index)}
        >
            {label}
        </button>
    );
};

export default TabsToggle;
