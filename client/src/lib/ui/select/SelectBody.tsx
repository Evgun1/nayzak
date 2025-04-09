"use client";

import React, {
    FC,
    forwardRef,
    ReactElement,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { useSelect } from "./SelectContext";
import SelectItem from "./SelectItem";

import classes from "./Select.module.scss";

const SelectBody: FC<{ children: ReactNode }> = (props) => {
    const { children } = props;
    const { itemKey, addDefaultLabel } = useSelect();
    const [currentChildren, setCurrentChildren] = useState<ReactNode>();

    const childrenRecursion = useCallback(
        (children: ReactNode): ReactNode => {
            return React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                if (typeof child.type === "string") {
                    const childWithChildren = child as ReactElement<{
                        children: ReactNode;
                    }>;

                    return React.cloneElement(childWithChildren, {
                        children: childrenRecursion(
                            childWithChildren.props.children
                        ),
                    });
                }

                if (child.props.itemKey) {
                    if (child.props.itemKey === itemKey) {
                        addDefaultLabel(child.props.textValue);
                        return;
                    }

                    return child;
                } else {
                    const childWithChildren = child as ReactElement<{
                        children: ReactNode;
                    }>;

                    return React.cloneElement(childWithChildren, {
                        children: childrenRecursion(
                            childWithChildren.props.children
                        ),
                    });
                }
            });
        },
        [itemKey, addDefaultLabel]
    );

    useEffect(() => {
        const child = childrenRecursion(children);
        setCurrentChildren(child);
    }, [children, childrenRecursion]);

    return (
        <div id={"select-body"} className={classes["select__body"]}>
            {currentChildren}
        </div>
    );
};

export default SelectBody;
