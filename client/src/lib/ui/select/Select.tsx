"use client";

import React, {
    FC,
    MouseEvent,
    ReactElement,
    ReactNode,
    RefObject,
    Suspense,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import ButtonCustom, {
    StyleSettingsObject,
} from "../custom-elements/button-custom/ButtonCustom";
import SelectOption from "./SelectOption";
import classes from "./Select.module.scss";
import { useSearchParams } from "next/navigation";
import OptionLink from "./OptionLink";
import { HrefObject } from "../custom-elements/link-custom/LinkCustom";
import { current } from "@reduxjs/toolkit";
import { join } from "path";

type SelectComponentProps = {
    trackByQuery?: boolean;
    styleSetting: StyleSettingsObject;
    children: ReactNode;
    label: string | ReactNode;
};

const SelectComponent: FC<SelectComponentProps> = (props) => {
    const { styleSetting, children, label, trackByQuery = false } = props;
    const [currentChildren, setCurrentChildren] = useState<ReactNode>();
    const [optionalLabel, setOptionalLabel] = useState<string | ReactNode>(
        label
    );

    const generateId = useId().replaceAll(":", "");
    const childrenRef = useRef() as RefObject<HTMLDivElement>;

    const searchParams = useSearchParams();
    const queryParams = searchParams.toString().split("&");

    const queryParamsObj = queryParams.reduce(
        (acc: { [key: string]: string }, el) => {
            const [key, val] = el.split("=");
            return (acc[key] = val), acc;
        },
        {}
    );

    const eventListenerHandler = useCallback(
        (event: Event) => {
            const target = event.target as HTMLElement;
            const childrenCurrent = childrenRef.current;
            if (!target || !childrenCurrent) return;

            const childrenClassList = childrenCurrent.classList;
            const targetClassList = target.closest(`#${generateId}`)?.classList;

            if (!targetClassList) {
                childrenClassList.remove(classes["select__options--visible"]);
                return;
            }

            if (
                childrenClassList.contains(classes["select__options--visible"])
            ) {
                childrenClassList.remove(classes["select__options--visible"]);
            } else {
                childrenClassList.add(classes["select__options--visible"]);
            }
        },
        [generateId]
    );

    const childrenRecursion = useCallback(
        (children: ReactNode, label?: string) => {
            return React.Children.map(children, (child, i): ReactNode => {
                if (!React.isValidElement(child)) return child;

                if (child.type === OptionLink) {
                    const childrenElement = child as ReactElement<{
                        href: HrefObject;
                    }>;

                    const childrenQueryParams = childrenElement.props.href
                        .queryParams as Record<string, string>;

                    if (
                        !Object.entries(childrenQueryParams).every(
                            ([key, value]) =>
                                queryParamsObj[key] === value.toLowerCase()
                        )
                    ) {
                        const childWithChildren = child as ReactElement<{
                            href: HrefObject;
                            id: string;
                            onClick: (event: string | undefined) => void;
                        }>;

                        Object.keys(childrenQueryParams).every((acc) => {
                            if (!Object.keys(queryParamsObj).includes(acc)) {
                                setOptionalLabel(label);
                            }
                        });

                        return React.cloneElement(childWithChildren, {});
                    }

                    setOptionalLabel(child.props.children);
                } else {
                    const childWithChildren = child as ReactElement<{
                        id: string;
                        onClick: (event: string | undefined) => void;
                    }>;

                    return React.cloneElement(childWithChildren);
                }
            });
        },
        [queryParamsObj]
    );

    useEffect(() => {
        const childRecursion = childrenRecursion(
            children,
            label as string
        ) as Array<ReactElement>;

        setCurrentChildren(childRecursion);
    }, [children, childrenRecursion, label]);

    useEffect(() => {
        document.addEventListener("click", eventListenerHandler);
        return () =>
            document.removeEventListener("click", eventListenerHandler);
    }, [eventListenerHandler]);

    return (
        <div id={generateId} className={classes["select"]}>
            <ButtonCustom styleSettings={styleSetting}>
                {optionalLabel}
            </ButtonCustom>
            <div className={classes["select__options"]} ref={childrenRef}>
                {currentChildren}
            </div>
        </div>
    );
};

const Select = Object.assign(SelectComponent, {
    OptionLink: OptionLink,
    Option: SelectOption,
});

export default Select;
