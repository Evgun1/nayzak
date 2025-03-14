"use client";

import React, {
    FC,
    MouseEvent,
    ReactElement,
    ReactNode,
    RefObject,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

import DropDownBody from "./DropDownBody";

import classes from "./DropDown.module.scss";
import { Size, Type } from "../custom-elements/button-custom/ButtonType";
import {
    ButtonCustom,
    StyleSettingsObject,
} from "../custom-elements/button-custom/ButtonCustom";
import DropDownTrigger from "./DropDownTrigger";
import DropDownItem from "./DropDownItem";

type DropDownProps = {
    btnCustomSettings?: StyleSettingsObject;
    children: ReactNode;
    styles?: string;
};

const DropDownComponent: FC<DropDownProps> = (
    { children, styles },
    ...props
) => {
    const wrapperRef = useRef() as RefObject<HTMLDivElement>;
    const generateId = useId().replaceAll(":", "");
    const dropDownId = `drop-down__${generateId}`;

    // const btnClickHandler: EventListener = (event) => {
    //     const target = event.target as HTMLElement;
    //     const wrapperRefId = wrapperRef?.current?.id.replaceAll(":", "");

    //     if (!target) return;

    //     if (childrenRef.current) {
    //         const childrenRefId = childrenRef.current.id;
    //         const currentWrapper = target.closest(`#${childrenRefId}`);

    //         if (currentWrapper) return;
    //     }

    //     const closestBtn = target.closest(`#${wrapperRefId}`);

    //     if (event.type === "mouseenter" && closestBtn) {
    //         setShowElements((prev) => !prev);
    //     }
    //     if (event.type === "mouseleave") {
    //         setShowElements(false);
    //     }

    //     if (event.type === "click") {
    //         if (closestBtn) {
    //             setShowElements((prev) => !prev);
    //         } else {
    //             setShowElements((prev) => (prev ? !prev : prev));
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (typeProperty === "mouseenter") {
    //         document
    //             .querySelectorAll(`#${wrapperRef.current?.id}`)
    //             .forEach((val) => {
    //                 val?.addEventListener("mouseenter", btnClickHandler);
    //                 val?.addEventListener("mouseleave", btnClickHandler);
    //             });
    //     } else {
    //         document.addEventListener(typeProperty, btnClickHandler);
    //     }

    //     return () =>
    //         document.removeEventListener(typeProperty, btnClickHandler);
    // }, [typeProperty]);

    function childrenRecursion(children: ReactNode): ReactNode {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return;

            switch (child.type) {
                case DropDownItem:
                case DropDownTrigger:
                case DropDownBody:
                    if (child.type === DropDownTrigger) {
                        const DropDownTriggerChild = child as ReactElement<{
                            dropDownId: string;
                        }>;
                        return React.cloneElement(DropDownTriggerChild, {
                            dropDownId: dropDownId,
                        });
                    }

                    return React.cloneElement(child);

                default:
                    const childrenWithChild = child as ReactElement<{
                        children: ReactNode;
                    }>;

                    return React.cloneElement(childrenWithChild, {
                        children: childrenRecursion(childrenWithChild),
                    });
            }
        });
    }

    return (
        <div
            ref={wrapperRef}
            id={dropDownId}
            className={`${styles ?? ""} ${classes["drop-down"]}`}
        >
            {childrenRecursion(children)}
        </div>
    );
};

const DropDown = Object.assign(DropDownComponent, {
    Trigger: DropDownTrigger,
    Body: DropDownBody,
    Item: DropDownItem,
});

export default DropDown;
