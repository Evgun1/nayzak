"use client";

import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import classes from "./PopupResultFilter.module.scss";
import { FC, MouseEvent, RefObject, useEffect, useMemo, useRef } from "react";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { useFilter } from "../../../(filter-tools)/context/useFilter";
import { useRouter, useSearchParams } from "next/navigation";

type PopupShowResultFilterProps = {
	findFilter?: Record<string, string[]>;
	lastTargetId: string;
};

const PopupResultFilter: FC<PopupShowResultFilterProps> = (props) => {
	const { attributeCount } = useFilter();
	const searchParams = useSearchParams();
	const refResultFilter = useRef() as RefObject<HTMLDivElement>;
	const router = useRouter();

	function findFilter(event: MouseEvent) {
		const urlSearchParams = new URLSearchParams(searchParams);
		for (const key in props.findFilter) {
			urlSearchParams.set(key, props.findFilter[key].join(","));
		}
		router.push(`?${urlSearchParams}`);
		buttonClickHandler(event);
	}

	function buttonClickHandler(event: MouseEvent) {
		const target = event.target as HTMLElement | null;
		if (!target) return;

		const findParentElementRecursion = (element: HTMLElement) => {
			if (!element.id.includes("resultFilter")) {
				const parentElement = element.parentElement;
				if (!parentElement) return;
				return findParentElementRecursion(element.parentElement);
			}
			return element;
		};
		const parentElement = findParentElementRecursion(target);
		if (!parentElement) return;
		parentElement.style.display = "none";
	}

	function eventListenerHandler(event: Event, id?: string) {
		if (!id) return;
		const filterElementRecursion = (element: HTMLElement) => {
			if (!element.id.includes("resultFilter")) {
				const parentElement = element.parentElement;
				if (!parentElement) return;
				return filterElementRecursion(element.parentElement);
			}
			return element;
		};
		const findFormRecursion = (element: HTMLElement) => {
			const html = element.parentElement;
			if (!html) return;
			if (html.getElementsByTagName("form").length <= 0) {
				return findFormRecursion(element.parentElement as HTMLElement);
			}
			return element as HTMLElement;
		};

		const filterFindElement = refResultFilter.current;
		const target = event.target as HTMLElement | null;
		if (!target || !filterFindElement) return;

		const filterElement = filterElementRecursion(target);
		if (filterElement) return;

		if (!target.id.includes(id)) {
			if (filterFindElement.style.display.includes("none")) return;
			return (filterFindElement.style.display = "none");
		}

		const parentsElement = findFormRecursion(target);
		const childrenWrapper = target.parentElement;
		if (!childrenWrapper || !parentsElement) return;

		const findTop =
			parentsElement.getBoundingClientRect().bottom -
			childrenWrapper.getBoundingClientRect().top;
		if (!findTop) return;

		filterFindElement.style.bottom = `${findTop - 20}px`;
		filterFindElement.style.display = `block`;
	}

	// const attributeUrlSearchParams = useMemo(() => {
	// 	const obj = {} as Record<string, string>;
	// 	for (const key in props.findFilter) {
	// 		obj[key] = props.findFilter[key].join(",");
	// 	}
	// 	return obj;
	// }, [props.findFilter]);

	useEffect(() => {
		if (!props.lastTargetId) return;

		document.addEventListener("change", (e) =>
			eventListenerHandler(e, props.lastTargetId),
		);
		document.addEventListener("mouseup", (e) =>
			eventListenerHandler(e, props.lastTargetId),
		);

		return () => {
			document.removeEventListener("change", (e) =>
				eventListenerHandler(e, props.lastTargetId),
			);
			document.removeEventListener("mouseup", (e) =>
				eventListenerHandler(e, props.lastTargetId),
			);
		};
	}, [props.lastTargetId]);

	return (
		<div
			id="resultFilter"
			ref={refResultFilter}
			className={classes["popup-result-filter"]}
		>
			<div className={classes["popup-result-filter__icon"]}></div>
			<div className={classes["popup-result-filter__content"]}>
				<ButtonCustom
					styleSettings={{
						type: "DEFAULT",
						color: "DARK",
						size: "X_SMALL",
						fill: "SOLID",
						roundness: "ROUNDED",
					}}
					onClick={findFilter}
				>
					find products
				</ButtonCustom>
				<div>
					{attributeCount ? `result: ${attributeCount}` : "not found"}
				</div>
				<ButtonCustom
					styleSettings={{
						color: "DARK",
						type: "TEXT",
						size: "X_SMALL",
						icon: { left: "CLOSE" },
					}}
					onClick={buttonClickHandler}
				></ButtonCustom>
			</div>
		</div>
	);
};

export default PopupResultFilter;
