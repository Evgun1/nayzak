"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import classes from "./FilterList.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Form, { FormOnChangeParams } from "@/ui/form/Form";
import PopupResultFilter from "./popup-show-result-filter/PopupResultFilter";
import FilterColorCheckbox from "./FilterColorCheckbox";
import { SliderPrice } from "@/components/slider-price/SliderPrice";
import { fa } from "zod/v4/locales";
import { useFilterContext } from "../../(filter-tools)/context/useFilterContext";
import FilterListPreview from "./filter-list-preview/FilterListPreview";
import { log, profileEnd } from "console";
import PreviewReview from "@/page/product/product-tab/product-reviews/PreviewReview";
import { reportWebVitals } from "next/dist/build/templates/pages";

export type FilterAttributesItem = {
	name: string;
	value: { type: string; id: number; active: boolean; checked?: boolean }[];
};

export type FilterAttributesState = Array<FilterAttributesItem>;

type FilterListProps = {
	price: { minPrice: number; maxPrice: number };
	attributes: FilterAttributesState;
	searchParams: Record<string, string>;
};

const FilterList: FC<FilterListProps> = (props) => {
	const { fetchAttributes: setAttributesHandler, setFilterChips } =
		useFilterContext();
	const refTimeout = useRef<NodeJS.Timeout>();

	const [attributes, setAttributes] = useState<FilterAttributesState>(
		props.attributes,
	);
	const [lastTargetId, setLastTargetId] = useState<string>();
	const [findFilter, setFindFilter] = useState<{ [key: string]: string[] }>();

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

				// if (newArr.length === 0) {
				// 	// const { [find.name]: _, ...rest } = prev;
				// 	// console.log(rest);
				// 	// return rest;

				// 	return { ...prev, [find.name]: [] };
				// }

				return {
					...prev,
					[find.name]: newArr.length <= 0 ? [] : newArr,
				};
			}
		});
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams();

		const findFilterValid =
			Object.values(findFilter ?? {}).filter((item) => item.length > 0)
				.length > 0;

		// if (!findFilterValid) {
		// 	return setAttributes(props.attributes);
		// }

		for (const key in findFilter) {
			if (findFilter[key].length <= 0) {
				if (urlSearchParams.has(key)) urlSearchParams.delete(key);

				setAttributes(props.attributes);
				continue;
			}

			urlSearchParams.set(key, findFilter[key].join(","));
		}

		setAttributesHandler(urlSearchParams).then((item) => {
			if (!item) return;
			setAttributes(item.attribute);
		});
	}, [findFilter]);

	useEffect(() => {
		for (const attribute of props.attributes) {
			const searchParamsValue = props.searchParams[attribute.name];

			const attributeFilter = attribute.value.filter((item) =>
				searchParamsValue?.split(",").includes(item.id.toString()),
			);

			setFindFilter((prev) => {
				if (!prev) prev = {};

				const ids = searchParamsValue?.split(",");
				const name = attribute.name;

				if (!prev[name]) {
					if (ids?.length > 0) prev[name] = ids;
				} else {
					if (ids?.length > 0) {
						prev[name] = ids;
					} else {
						delete prev[name];
					}
				}

				return Object.keys(prev).length > 0 ? prev : undefined;
			});

			setFilterChips({
				name: attribute.name,
				value: attributeFilter.map((item) => ({
					id: item.id,
					type: item.type,
				})),
			});

			const curIds = attributeFilter.map((item) => item.id);
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
				{/* 
				<SliderPrice
					className={`${classes["filter-list__attribute-price"]}`}
					maxPrice={props.price.maxPrice}
					minPrice={props.price.minPrice}
				/> */}
				{attributes &&
					attributes.length > 0 &&
					attributes.map((attribute, i) => (
						<FilterListPreview
							key={i}
							attribute={attribute}
						/>
					))}
			</Form>
		</div>
	);
};

export default FilterList;
