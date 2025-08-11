"use client";

import Form, { FormOnChangeParams } from "@/ui/form/Form";
import classes from "./FilterList.module.scss";
import React, {
	FormEvent,
	MouseEvent,
	ReactElement,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import { SliderPrice } from "@/ui/slider-price/SliderPrice";
import { useFilter } from "./useFilter";
import { TextClassList } from "@/types/textClassList.enum";
import { useSearchParams } from "next/navigation";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

const FilterList = () => {
	const { attributeState, setAttributesHandler } = useFilter();
	const searchParams = useSearchParams();

	const urlSearchParams = new URLSearchParams(searchParams.toString());
	const ref = useRef() as RefObject<HTMLUListElement>;
	const refResultFilter = useRef() as RefObject<HTMLDivElement>;
	const refTimeout = useRef<NodeJS.Timeout>();
	const [lastTargetId, setLastTargetId] = useState<string>();
	const [findFilter, setFindFilter] = useState<Record<string, string[]>>({});
	const [filterElements, setFilterElements] = useState<ReactElement[]>([]);

	const onChangeHandler: FormOnChangeParams = (e: FormEvent) => {
		const target = e.target as HTMLInputElement;
		const id = target.id;
		const checked = target.checked;
		setLastTargetId(id);

		if (!attributeState?.attribute[target.name]) {
			document.addEventListener("mouseup", (e) => {
				const currentTarget = e.currentTarget as HTMLElement | null;
				if (!currentTarget) return;
				clearTimeout(refTimeout.current);
				refTimeout.current = setTimeout(() => {
					for (const element of currentTarget.querySelectorAll(
						`input[name='${target.name}']`,
					)) {
						const inputElement = element as HTMLInputElement;

						setFindFilter((prev) => ({
							...prev,
							[inputElement.id]: [inputElement.value],
						}));
					}
				}, 10);
			});

			const elementByName = document.getElementsByName(target.name);
			// console.log(elementByName);
		}

		let name: string | undefined;
		const attribute = attributeState?.attribute;
		for (const key in attribute) {
			if (attribute[key].find((item) => item.id === +id)) {
				name = key;
			}
		}
		if (!name) return;

		setFindFilter((prev) => {
			const prevArr = prev[name] ?? [];

			if (checked) {
				return {
					...prev,
					[name]: [...prevArr, id],
				};
			} else {
				const newArr = prevArr.filter((item) => item !== id);

				if (newArr.length === 0) {
					const { [name]: _, ...rest } = prev;
					return rest;
				}

				return {
					...prev,
					[name]: newArr,
				};
			}
		});
	};

	function writeUrlSearchParams(param: typeof findFilter) {
		const urlSearchParams = new URLSearchParams();
		for (const key in param) {
			urlSearchParams.set(key, findFilter[key].join(","));
		}
		return urlSearchParams;
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
	function setBackgroundColor(color: { type: string; id: number }[]) {
		for (const elementColor of color) {
			const elementById = document.getElementById(
				elementColor.id.toString(),
			);
			if (elementById && document.getElementsByName("color")) {
				const parentsElement = elementById.parentElement;
				if (!parentsElement) return;

				for (const element of parentsElement.children) {
					const htmlElement = element as HTMLElement;

					if (htmlElement.tagName.includes("INPUT")) continue;
					htmlElement.classList.add(
						classes["filter__checkbox-color"],
					);

					let currColor: string = "#ffffff";
					if (!htmlElement.id.includes(elementColor.id.toString()))
						continue;

					const colorNameArr = elementColor.type.split(" ");
					const colorName =
						colorNameArr.length > 1
							? colorNameArr
									.map((data, i) => {
										let newData: string = "";
										if (i === 0) {
											newData = data;
										} else {
											newData +=
												capitalizeAndSeparateWords(
													data,
												);
										}
										return newData;
									})
									.join("")
							: colorNameArr[0];
					const ctx = document
						.createElement("canvas")
						.getContext("2d");

					if (ctx) {
						ctx.fillStyle = colorName;
						currColor = ctx.fillStyle;
					}

					const hxArr = currColor.replaceAll("#", "").split("");
					const firstThreeAreF = hxArr
						.slice(0, 3)
						.every((char) => char.includes("f"));
					const fourthAndFifthAreNumbers = hxArr
						.slice(3, 5)
						.every((el) => Number.isNaN(Number(el)));

					const borderColor = {
						hex: `#${hxArr.join("")}`,
						valid: firstThreeAreF && fourthAndFifthAreNumbers,
					};

					htmlElement.style.setProperty(
						"--checkbox-background-color",
						currColor,
					);
					htmlElement.style.setProperty(
						"--checkbox-border-color",
						borderColor.valid ? "#000000" : borderColor.hex,
					);
				}
			}
		}
	}

	const attributeUrlSearchParams = useMemo(() => {
		const obj = {} as Record<string, string>;
		for (const key in findFilter) {
			obj[key] = findFilter[key].join(",");
		}
		return obj;
	}, [findFilter]);

	useEffect(() => {
		if (!ref.current) return;
		const ids = [] as string[];

		for (const key in findFilter) {
			for (const element of findFilter[key]) {
				ids.push(element);
			}
		}

		const ulElement = ref.current as HTMLUListElement;
		const inputElement = ulElement.getElementsByTagName("input");

		for (const element of inputElement) {
			if (ids.includes(element.id)) {
				element.checked = true;
			} else {
				element.checked = false;
			}
		}
	}, [findFilter, filterElements]);

	useEffect(() => {
		const attributer = attributeState?.attribute;
		if (!attributer) return;

		setBackgroundColor(attributer["color"]);

		const filterElement: ReactElement[] = [];
		for (const [name, arr] of Object.entries(attributeState.attribute)) {
			filterElement.push(
				<li>
					<div
						className={`${classes["filter__attribute-header"]} ${TextClassList.SEMIBOLD_14}`}
					>
						{name.toUpperCase()}
					</div>
					{name.includes("color") ? (
						<div
							className={`${classes["filter__color-list"]} ${classes["filter__attribute-list--scroll"]}`}
						>
							{arr.map((val, i) => (
								<Form.Checkbox
									className={
										!val.active
											? classes[
													"filter__attribute-item--disable"
											  ]
											: ""
									}
									settingsStyle={{
										roundness: "CIRCLE",
										size: "LARGE",
									}}
									id={val.id}
									value={val.type}
									name={name.toLowerCase()}
									style={
										{
											"--background-color": val.type,
										} as React.CSSProperties
									}
									key={i}
								/>
							))}
						</div>
					) : (
						<div
							className={`${classes["filter__attribute-list"]} ${classes["filter__attribute-list--scroll"]}`}
						>
							{arr.map((val, i) => (
								<Form.Checkbox
									className={
										!val.active
											? classes[
													"filter__attribute-item--disable"
											  ]
											: ""
									}
									key={i}
									id={val.id}
									value={val.id}
									name={name.toLocaleLowerCase()}
									settingsStyle={{
										roundness: "SHARP",
										size: "SMALL",
									}}
								>
									{val.type}
								</Form.Checkbox>
							))}
						</div>
					)}
				</li>,
			);
		}
		setFilterElements(filterElement);
	}, [attributeState?.attribute]);

	useEffect(() => {
		if (!lastTargetId) return;

		document.addEventListener("change", (e) =>
			eventListenerHandler(e, lastTargetId),
		);
		document.addEventListener("mouseup", (e) =>
			eventListenerHandler(e, lastTargetId),
		);

		return () => {
			document.removeEventListener("change", (e) =>
				eventListenerHandler(e, lastTargetId),
			);
			document.removeEventListener("mouseup", (e) =>
				eventListenerHandler(e, lastTargetId),
			);
		};
	}, [lastTargetId]);

	useEffect(() => {
		const urlSearchParams = writeUrlSearchParams(findFilter);
		setAttributesHandler(urlSearchParams);
	}, [findFilter]);

	useEffect(() => {
		if (searchParams.size <= 0) setFindFilter({});
		for (const [key, value] of searchParams.entries())
			setFindFilter((prev) => ({ ...prev, [key]: value.split(",") }));

		setAttributesHandler(searchParams);
	}, [searchParams]);

	return (
		<div className={classes.filter}>
			<Form onChange={onChangeHandler}>
				<div
					id="resultFilter"
					ref={refResultFilter}
					className={classes["show-result-filters"]}
				>
					<div className={classes["show-result-filters__icon"]}></div>
					<div className={classes["show-result-filters__content"]}>
						<LinkCustom
							href={{ queryParams: attributeUrlSearchParams }}
							styleSettings={{
								type: "DEFAULT",
								color: "DARK",
								size: "X_SMALL",
								fill: "SOLID",
								roundness: "ROUNDED",
							}}
							onClick={buttonClickHandler}
						>
							find products
						</LinkCustom>
						<div>
							{attributeState?.countActiveAttributes
								? `result: ${attributeState.countActiveAttributes}`
								: "not found"}
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
				<SliderPrice />

				{filterElements.length > 0 && (
					<ul
						className={classes["filter__attribute"]}
						ref={ref}
					>
						{filterElements.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</ul>
				)}
			</Form>
		</div>
	);
};

export default FilterList;
