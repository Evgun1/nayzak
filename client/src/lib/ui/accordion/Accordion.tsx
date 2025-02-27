"use client";

import React, {
    FC,
    ReactElement,
    ReactNode,
    RefObject,
    use,
    useEffect,
    useId,
    useRef,
} from "react";
import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import classes from "./Accordion.module.scss";

type AccordionProps = {
    className?: string;
    children: ReactNode;
};

const AccordionComponent: FC<AccordionProps> = ({ children, className }) => {
    const randomId = useId().replaceAll(":", "");
    const accordionId = `accordion-${randomId}`;

    const eventListenerHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (!target) return;

        const accordion = target.closest(
            `#${accordionId}`
        ) as HTMLDivElement | null;
        const accordionHeader = target.closest(
            "#accordion-header"
        ) as HTMLDivElement;

        for (const queryElement of document.querySelectorAll(
            `#${accordionId}`
        )) {
            if (accordion === queryElement) {
                if (!accordionHeader) return;

                accordionHeader.classList.toggle(
                    classes["accordion__header--active"]
                );
                for (const element of queryElement.children) {
                    const accordionBody = element.closest(
                        `#accordion-body`
                    ) as HTMLDivElement | null;
                    if (accordionBody) {
                        const scrollHeight = accordionBody.scrollHeight;
                        accordionBody.classList.toggle(
                            classes["accordion__body--visible"]
                        );

                        if (
                            accordionBody.classList.contains(
                                classes["accordion__body--visible"]
                            )
                        ) {
                            accordionBody.style.maxHeight = scrollHeight + "px";
                        } else {
                            accordionBody.style.maxHeight = "0px";
                        }
                    }
                }
            } else {
                for (const element of queryElement.children) {
                    const accordionHeader = element.closest(
                        "#accordion-header"
                    ) as HTMLDivElement | null;
                    const accordionBody = element.closest(
                        "#accordion-body"
                    ) as HTMLDivElement | null;

                    if (accordionHeader)
                        if (
                            accordionHeader.classList.contains(
                                classes["accordion__header--active"]
                            )
                        )
                            accordionHeader.classList.remove(
                                classes["accordion__header--active"]
                            );

                    if (accordionBody)
                        if (
                            accordionBody.classList.contains(
                                classes["accordion__body--visible"]
                            )
                        ) {
                            accordionBody.classList.remove(
                                classes["accordion__body--visible"]
                            );

                            accordionBody.style.maxHeight = "0px";
                        }
                }
            }
        }
    };

    const childrenRecursion = (children: ReactNode): ReactNode => {
        return React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child)) return child;

            if (
                child.type === AccordionHeader ||
                child.type === AccordionBody
            ) {
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
    };

    useEffect(() => {
        document.addEventListener("click", eventListenerHandler);
        return () =>
            document.removeEventListener("click", eventListenerHandler);
    }, []);

    return (
        <div id={accordionId} className={className && className}>
            {childrenRecursion(children)}
        </div>
    );
};

const Accordion = Object.assign(AccordionComponent, {
    Header: AccordionHeader,
    Body: AccordionBody,
});

export default Accordion;
