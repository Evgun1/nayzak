"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import classes from "./FilterList.module.scss";
import { useFilterContext } from "../../tools/context/useFilterContext";
import Form, { FormOnChangeParams } from "@/ui/form/Form";
import PopupResultFilter from "./PopupResultFilter";
import FilterListPreview from "./FilterListPreview";

export type FilterAttributesItem = {
	name: string;
	value: { type: string; id: number; active: boolean; checked?: boolean }[];
};

export type FilterAttributesState = Array<FilterAttributesItem>;

type FindFilterInitState = Record<string, string[]>;

type FilterListProps = {
	price: { minPrice: number; maxPrice: number };
	attributes: FilterAttributesState;
	searchParams: Record<string, string>;
};

const FilterList: FC<FilterListProps> = (props) => {
	const { fetchAttributes: setAttributesHandler } = useFilterContext();
	const refTimeout = useRef<NodeJS.Timeout>();
	const temporaryStorage = useRef<FindFilterInitState>();

	const [attributesState, setAttributesState] =
		useState<FilterAttributesState>(props.attributes);
	const [lastTargetId, setLastTargetId] = useState<string>();
	const [findFilterState, setFindFilterState] =
		useState<FindFilterInitState>();

	const searchParamsObjMemo = useMemo(() => {
		const result: FindFilterInitState = {};
		for (const key in props.searchParams) {
			if (!key) continue;
			result[key] = props.searchParams[key].split(",");
		}

		setFindFilterState(result);
		return result;
	}, [props.searchParams]);

	const filterSearchParamsMemo = useMemo(() => {
		if (!findFilterState) return;
		const urlSearchParams = new URLSearchParams();
		for (const key in findFilterState) {
			if (findFilterState[key].length > 0) {
				urlSearchParams.set(key, findFilterState[key].join(","));
			}
		}

		return urlSearchParams;
	}, [findFilterState]);

	const filterListPreviewElementMemo = useMemo(() => {
		return attributesState.map((attribute, i) => (
			<FilterListPreview
				key={i}
				attribute={attribute}
			/>
		));
	}, [attributesState]);

	const onChangeCallback: FormOnChangeParams = useCallback(
		(e) => {
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
						setFindFilterState((prev) => ({
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

			setFindFilterState((prev) => {
				if (!prev) prev = {};
				const prevArr = prev[find.name] ?? [];

				if (checked) {
					return {
						...prev,
						[find.name]: [...prevArr, id],
					};
				} else {
					const newArr = prevArr.filter((item) => item !== id);

					return {
						...prev,
						[find.name]: newArr.length <= 0 ? [] : newArr,
					};
				}
			});
		},
		[ props.attributes, props.price],
	);
	const attributesCallback = useCallback(
		async (urlSearchParams: URLSearchParams) => {
			const attributes = await setAttributesHandler(urlSearchParams);
			if (attributes?.attribute) setAttributesState(attributes.attribute);
		},
		[setAttributesHandler],
	);

	const inputCheckedHandler = (
		param: FindFilterInitState,
		temporaryStorage: boolean,
	) => {
		for (const [name, ids] of Object.entries(param)) {
			const inputList = document.querySelectorAll(`[name="${name}"]`);
			for (const input of inputList) {
				const inputElement = input as HTMLInputElement;

				if (!temporaryStorage) {
					inputElement.checked = false;
					continue;
				}

				inputElement.checked = ids.some((id) => {
					if (!temporaryStorage) return temporaryStorage;
					return id === inputElement.id;
				});
			}
		}
	};

	useEffect(() => {
		if (filterSearchParamsMemo) attributesCallback(filterSearchParamsMemo);
	}, [filterSearchParamsMemo, attributesCallback]);

	useEffect(() => {
		if (Object.keys(searchParamsObjMemo).length)
			temporaryStorage.current = searchParamsObjMemo;
		if (
			temporaryStorage.current &&
			!Object.keys(searchParamsObjMemo).length
		) {
			inputCheckedHandler(temporaryStorage.current, false);
			temporaryStorage.current = undefined;
			return;
		}

		return inputCheckedHandler(searchParamsObjMemo, true);
	}, [searchParamsObjMemo, temporaryStorage]);

	// useEffect(() => {
	// 	setFindFilterState(searchParamsObjMemo);
	// }, [searchParamsObjMemo]);

	return (
		<div className={classes["filter-list"]}>
			<Form
				onChange={onChangeCallback}
				className={classes["filter-list__form"]}
			>
				<PopupResultFilter
					findFilter={findFilterState}
					lastTargetId={lastTargetId ?? ""}
				/>
				{filterListPreviewElementMemo}
			</Form>
		</div>
	);
};

export default FilterList;
