"use client";

import React, { FC, Key, ReactElement, ReactNode } from "react";
import { useSelect } from "./SelectContext";
import classes from "./Select.module.scss";

type SelectItemProps = {
    itemKey: string | number;
    textValue: string;
    children?: ReactNode;
};

const SelectItem: FC<SelectItemProps> = (props) => {
    const { children, itemKey, textValue } = props;
    const { addItemKey } = useSelect();

    const currChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return <div className={classes["select__item"]}>{child}</div>;
        }

        const childWithChildren = child as ReactElement<{ className: string }>;

        return React.cloneElement(childWithChildren, {
            className: classes["select__item"],
        });
    });

    return (
        <div onClick={() => addItemKey(itemKey)}>
            {children ? (
                currChildren
            ) : (
                <div className={classes["select__item"]}>{textValue}</div>
            )}
        </div>
    );
};

export default SelectItem;
