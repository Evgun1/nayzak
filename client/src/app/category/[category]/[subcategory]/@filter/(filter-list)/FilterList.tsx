"use client";

import React, {
	FC,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import classes from "./FilterList.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Form, { FormOnChangeParams } from "@/ui/form/Form";
import { useFilter } from "../../(filter-tools)/context/useFilter";
import PopupResultFilter from "./popup-show-result-filter/PopupResultFilter";
import FilterColorCheckbox from "./FilterColorCheckbox";
import { SliderPrice } from "@/components/slider-price/SliderPrice";
import { fa } from "zod/v4/locales";

export type FilterAttributesItem = {
	name: string;
	value: { type: string; id: number; active: boolean; checked?: boolean }[];
};

export type FilterAttributesArray = Array<FilterAttributesItem>;

type FilterListProps = {
	price: { minPrice: number; maxPrice: number };
	attributes: FilterAttributesArray;
	searchParams: Record<string, string>;
};

const FilterList: FC<FilterListProps> = (props) => {
	const { fetchAttributesHandler: setAttributesHandler } = useFilter();
	const refTimeout = useRef<NodeJS.Timeout>();

	const randomId = useId().replaceAll(":", "");
	const [attributes, setAttributes] = useState<FilterAttributesArray>(
		props.attributes,
	);
	const [lastTargetId, setLastTargetId] = useState<string>();
	const [findFilter, setFindFilter] = useState<Record<string, string[]>>();

	const onChangeHandler: FormOnChangeParams = (e) => {
		const target = e.target as HTMLInputElement;
		const id = target.id;
		const checked = target.checked;
		setLastTargetId(id);

		document.addEventListener("mouseup", (e) => {
			const currentTarget = e.currentTarget as HTMLElement | null;
			if (!currentTarget) return;

			clearTimeout(refTimeout.current);
			refTimeout.current = setTimeout(() => {
				for (const key in props.price) {
					const element =
						(currentTarget.querySelector(
							`[id="${key}"]`,
						) as HTMLInputElement) || null;
					if (!element) continue;

					const id = element.id;
					const value = element.value;
					setFindFilter((prev) => ({
						...prev,
						[id]: [value],
					}));
				}
			}, 10);
		});

		const find = props.attributes.find((item) =>
			item.name.includes(target.name),
		);
		if (!find) return;

		setFindFilter((prev) => {
			if (!prev) prev = {};

			const prevArr = prev[find.name] ?? [];

			if (checked) {
				return {
					...prev,
					[find.name]: [...prevArr, id],
				};
			} else {
				const newArr = prevArr.filter((item) => item !== id);

				if (newArr.length === 0) {
					const { [find.name]: _, ...rest } = prev;
					return rest;
				}

				return {
					...prev,
					[find.name]: newArr,
				};
			}
		});
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams();
		if (!findFilter) {
			return setAttributes(props.attributes);
		}

		for (const key in findFilter) {
			urlSearchParams.set(key, findFilter[key].join(","));
		}

		setAttributesHandler(urlSearchParams).then((item) => {
			if (!item) return;

			setAttributes(item.attribute);
		});
	}, [findFilter]);

	useEffect(() => {
		if (Object.keys(props.searchParams).length <= 0) return;

		for (const attribute of props.attributes) {
			const searchParamsValue = props.searchParams[attribute.name];
			const filter = attribute.value.filter((item) =>
				searchParamsValue?.split(",").includes(item.id.toString()),
			);

			const curIds = filter.map((item) => item.id);

			const inputList = document.querySelectorAll(
				`[name="${attribute.name}"]`,
			);

			for (const inputItem of inputList) {
				const input = inputItem as HTMLInputElement;

				if (curIds.includes(+input.id)) {
					input.checked = true;
				} else {
					input.checked = false;
				}
			}
		}
	}, [props.searchParams]);

	useLayoutEffect(() => {
		const htmlElements = document.querySelectorAll(`[id=${randomId}]`);
		for (const element of htmlElements) {
			const html = element as HTMLDivElement;
			if (html.scrollHeight > 192)
				html.classList.add(
					classes["filter-list__attribute-list--scroll"],
				);
		}
	}, [randomId]);

	return (
		<div className={classes["filter-list"]}>
			<Form
				onChange={onChangeHandler}
				className={classes["filter-list__form"]}
			>
				<PopupResultFilter
					findFilter={findFilter}
					lastTargetId={lastTargetId ?? ""}
				/>

				<SliderPrice
					className={`${classes["filter-list__attribute-price"]}`}
					maxPrice={props.price.maxPrice}
					minPrice={props.price.minPrice}
				/>
				{attributes &&
					attributes.length > 0 &&
					attributes.map((attribute, i) => (
						<div key={i}>
							<div
								className={`${classes["filter-list__attribute-header"]} ${TextClassList.SEMIBOLD_14}`}
							>
								{attribute.name.toUpperCase()}
							</div>
							{attribute.name.includes("color") ? (
								<FilterColorCheckbox
									id={randomId}
									attribute={attribute}
								/>
							) : (
								<div
									id={randomId}
									className={`${classes["filter-list__attribute-list"]} `}
								>
									{attribute.value.map((val, i) => (
										<Form.Checkbox
											className={
												!val.active
													? classes[
															"filter-list__attribute-item--disable"
													  ]
													: ""
											}
											key={i}
											id={val.id}
											value={val.id}
											name={attribute.name.toLocaleLowerCase()}
											checked={val.checked}
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
						</div>
					))}
			</Form>
		</div>
	);
};

export default FilterList;
