"use client";
import { TextClassList } from "@/types/textClassList.enum";
import { FC, RefObject, useEffect, useId, useRef, useState } from "react";
import classes from "./Tooltip.module.scss";

type HoverTooltipProps = {
    value: string;
};

const Tooltip: FC<HoverTooltipProps> = ({ value }) => {
    let timer: ReturnType<typeof setTimeout>;

    const ref = useRef() as RefObject<HTMLDivElement>;

    const eventListenerHandler = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const hoverTooltipWrap = e.currentTarget as HTMLElement;

        if (!hoverTooltipWrap) return;

        for (const element of hoverTooltipWrap.children) {
            const tooltip = element.closest("#tooltip__full-value");
            if (!tooltip) continue;
            const tooltipClassList = tooltip.classList;

            switch (e.type) {
                case "mouseenter":
                    timer = setTimeout(() => {
                        tooltipClassList.add(
                            classes["tooltip__full-value--visible"]
                        );
                    }, 400);
                    break;

                default:
                    clearTimeout(timer);
                    if (
                        tooltipClassList.contains(
                            classes["tooltip__full-value--visible"]
                        )
                    ) {
                        tooltipClassList.remove(
                            classes["tooltip__full-value--visible"]
                        );
                    }
                    break;
            }
        }
    };

    // useEffect(() => {
    //     const element = document.getElementById(tooltipId);
    //     if (!element) return;

    //     element.addEventListener("mouseenter", eventListenerHandler);
    //     element.addEventListener("mouseleave", eventListenerHandler);
    //     return () => {
    //         element.removeEventListener("mouseenter", eventListenerHandler);
    //         element.removeEventListener("mouseleave", eventListenerHandler);
    //     };
    // }, []);
    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        element.addEventListener("mouseenter", eventListenerHandler);
        element.addEventListener("mouseleave", eventListenerHandler);
        return () => {
            element.removeEventListener("mouseenter", eventListenerHandler);
            element.removeEventListener("mouseleave", eventListenerHandler);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${TextClassList.REGULAR_12} ${classes["tooltip__label"]}`}
        >
            {value}
            <div
                className={`${TextClassList.REGULAR_12} ${classes["tooltip__full-value"]} `}
                id={"tooltip__full-value"}
            >
                {value}
            </div>
        </div>
    );
};

export default Tooltip;
