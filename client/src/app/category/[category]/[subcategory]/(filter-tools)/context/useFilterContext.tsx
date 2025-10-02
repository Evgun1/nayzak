"use client";

import {
	appAttributeBySubcategoryGet,
	appAttributesAllGet,
} from "@/lib/api/attribute";
import { useParams, useSearchParams } from "next/navigation";
import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { FilterAttributesState } from "../../@filter/filter-list/FilterList";
import filterAttributesHandler from "../tools/filterAttributesHandler";
import { IAttribute } from "@/types/attribute.interface";
import groupAttributes from "@/tools/groupAttributes";
import { utimes } from "fs";

type AttributeItem = Record<
	string,
	{ type: string; id: number; active: boolean }[]
>;
type AttributeState = {
	attribute: AttributeItem;
	countActiveAttributes: number;
};

type TFilterChips = {
	name: string;
	value: Array<{ type: string; id: number }>;
};

type SidebarContextItem = {
	showFilter: boolean;
	setShowFilter: Dispatch<SetStateAction<boolean>>;
	attributeCount: number;
	setFilterChips: (param: TFilterChips) => void;
	filterChips: TFilterChips[];
	// fetchAttributesCount: (searchParams: URLSearchParams) => void;
	fetchAttributes: (
		searchParams: URLSearchParams,
	) => Promise<
		| { attribute: FilterAttributesState; countActiveAttributes: number }
		| undefined
	>;
};

const FilterContext = createContext<SidebarContextItem | null | undefined>(
	null,
);

export const FilterProvider: FC<{
	children: ReactNode;
	filter?: ReactNode;
	searchParams: Record<string, string>;
}> = ({ children, filter }) => {
	const searchParam = useSearchParams();

	const params = useParams() as { category: string; subcategory: string };
	const [showFilter, setShowFilter] = useState<boolean>(true);
	const [attributeCount, setAttributeCount] = useState<number>(NaN);
	const [filterChipsState, setFilterChipsState] = useState<TFilterChips[]>(
		[],
	);

	const appAttributeBySubcategoryHandler = async (
		searchParams?: URLSearchParams,
	) => {
		const attributes = await appAttributeBySubcategoryGet({
			param: { slug: params.subcategory },
			searchParams,
		});
		return attributes;
	};
	const fetchAttributesHandler = useCallback(
		async (searchParams: URLSearchParams) => {
			const attributes = await appAttributeBySubcategoryHandler(
				searchParams,
			);
			if (!attributes) return;

			const filterAttributes = filterAttributesHandler(
				attributes.attribute,
				searchParam,
			);

			setAttributeCount(attributes.countActiveAttributes);

			return {
				attribute: filterAttributes,
				countActiveAttributes: attributes.countActiveAttributes,
			};
		},
		[params],
	);

	// const fetchAttributesCountHandler = useCallback(
	// 	async (searchParams: URLSearchParams) => {
	// 		const attributesFetch = await fetchAttributesHandler(searchParam);
	// 		if (!attributesFetch) return;
	// 		const { countActiveAttributes } = attributesFetch;
	// 		setAttributeCount(countActiveAttributes);
	// 	},
	// 	[fetchAttributesHandler],
	// );

	const setFilterChips = (param: TFilterChips) => {
		setFilterChipsState((prev) => {
			const { name, value: newValues } = param;

			const index = prev.findIndex((item) => item.name === name);

			if (index !== -1) {
				const updated = [...prev];
				const existingValues = updated[index].value;

				const syncedValues = existingValues
					.filter((ev) => newValues.some((nv) => nv.id === ev.id))
					.concat(
						newValues.filter(
							(nv) =>
								!existingValues.some((ev) => ev.id === nv.id),
						),
					);

				updated[index] = {
					...updated[index],
					value: syncedValues,
				};

				return updated;
			} else {
				return [...prev, { name, value: newValues }];
			}
		});
	};

	return (
		<FilterContext.Provider
			value={{
				filterChips: filterChipsState,
				setFilterChips,
				showFilter,
				setShowFilter,
				// fetchAttributesCount: fetchAttributesCountHandler,
				attributeCount,
				fetchAttributes: fetchAttributesHandler,
			}}
		>
			{showFilter && filter}
			{children}
		</FilterContext.Provider>
	);
};

export const useFilterContext = () => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error("useFilter must be used within a FilterProvider");
	}
	return context;
};
