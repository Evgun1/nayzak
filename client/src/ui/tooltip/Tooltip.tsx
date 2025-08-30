"use client";
import { TextClassList } from "@/types/textClassList.enum";
import { FC, RefObject, useCallback, useEffect, useRef } from "react";
import classes from "./Tooltip.module.scss";

type HoverTooltipProps = {
	value: string;
};

const Tooltip: FC<HoverTooltipProps> = ({ value }) => {
	const ref = useRef() as RefObject<HTMLDivElement>;
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const eventListenerHandler = useCallback((e: Event) => {
		const hoverTooltipWrap = e.currentTarget as HTMLElement;
		if (!hoverTooltipWrap) return;

		for (const element of hoverTooltipWrap.children) {
			const tooltip = element.closest("#tooltip__full-value");
			if (!tooltip) continue;
			const tooltipClassList = tooltip.classList;

			switch (e.type) {
				case "mouseenter":
					timerRef.current = setTimeout(() => {
						tooltipClassList.add(
							classes["tooltip__full-value--visible"],
						);
					}, 400);
					``;
					break;

				default:
					if (timerRef.current) clearTimeout(timerRef.current);
					if (
						tooltipClassList.contains(
							classes["tooltip__full-value--visible"],
						)
					) {
						tooltipClassList.remove(
							classes["tooltip__full-value--visible"],
						);
					}
					break;
			}
		}
	}, []);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		element.addEventListener("mouseenter", eventListenerHandler);
		element.addEventListener("mouseleave", eventListenerHandler);
		return () => {
			element.removeEventListener("mouseenter", eventListenerHandler);
			element.removeEventListener("mouseleave", eventListenerHandler);
		};
	}, [eventListenerHandler]);

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
