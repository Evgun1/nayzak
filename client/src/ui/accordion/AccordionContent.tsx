"use client";

import React, {
	FC,
	FunctionComponent,
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
} from "react";
import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";
import classes from "./Accordion.module.scss";
import {
	AccordionProvider,
	useAccordionContext,
} from "./context/useAccordionContext";

import {} from "react";

interface AccordionContentProps {
	visibleBody?: boolean;
	className?: string;
	children: ReactNode;
}

const AccordionContent: FunctionComponent<AccordionContentProps> = (props) => {
	const { children, className, visibleBody = false } = props;
	const { setActive: setActiveId } = useAccordionContext();
	const randomId = useId().replaceAll(":", "");

	const accordionId = `accordion-${randomId}`;

	const eventListenerHandler = useCallback(
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (!target) return;

			const accordionTarget = target.closest(
				`#${accordionId}`,
			) as HTMLDivElement | null;
			const accordionHeaderTarget = target.closest(
				"#accordion-header",
			) as HTMLDivElement | null;
			const accordionQuerySelector = document.querySelector(
				`#${accordionId}`,
			) as HTMLElement | null;

			if (!accordionQuerySelector) return;

			for (const element of accordionQuerySelector.children) {
				const accordionBody = element.closest(
					`#accordion-body`,
				) as HTMLDivElement | null;

				const accordionHeader = element.closest(
					`#accordion-header`,
				) as HTMLElement | null;

				if (accordionTarget === element.parentNode) {
					if (!accordionHeaderTarget) return;

					accordionHeader?.classList.toggle(
						classes["accordion__header--active"],
					);
					setActiveId((prev) => !prev);

					if (accordionBody) {
						const scrollHeight = accordionBody.scrollHeight;

						accordionBody.classList.toggle(
							classes["accordion__body--visible"],
						);

						if (
							accordionBody.classList.contains(
								classes["accordion__body--visible"],
							)
						) {
							accordionBody.style.maxHeight = scrollHeight + "px";
						} else {
							accordionBody.style.maxHeight = "0px";
						}
					}
				}
			}
		},
		[accordionId],
	);

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
						childWithChildren.props.children,
					),
				});
			}
		});
	};

	useEffect(() => {
		if (visibleBody) {
			return document
				.querySelectorAll("#accordion-body")
				.forEach((element) => {
					const div = element as HTMLDivElement;
					const scrollHeight = div.scrollHeight;

					div.classList.add(classes["accordion__body--visible"]);
					div.style.maxHeight = scrollHeight + "px";
				});
		}

		document.addEventListener("click", eventListenerHandler);
		return () =>
			document.removeEventListener("click", eventListenerHandler);
	}, [visibleBody, eventListenerHandler]);

	return (
		<div
			id={accordionId}
			className={className && className}
		>
			{childrenRecursion(children)}
		</div>
	);
};

export default AccordionContent;
