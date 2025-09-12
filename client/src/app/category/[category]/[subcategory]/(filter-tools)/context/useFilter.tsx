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
	useState,
} from "react";
import { FilterAttributesArray } from "../../@filter/(filter-list)/FilterList";
import filterAttributesHandler from "../tools/filterAttributesHandler";
import { IAttribute } from "@/types/attribute.interface";

type AttributeItem = Record<
	string,
	{ type: string; id: number; active: boolean }[]
>;
type AttributeState = {
	attribute: AttributeItem;
	countActiveAttributes: number;
};

type SidebarContextItem = {
	showFilter: boolean;
	setShowFilter: Dispatch<SetStateAction<boolean>>;
	attributeCount: number;
	fetchAttributesHandler: (
		searchParams: URLSearchParams,
	) => Promise<
		| { attribute: FilterAttributesArray; countActiveAttributes: number }
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
	const urlSearchParams = new URLSearchParams(searchParam.toString());

	const params = useParams() as { category: string; subcategory: string };
	const [showFilter, setShowFilter] = useState<boolean>(true);
	const [attributeCount, setAttributeCount] = useState<number>(NaN);
	const [filterChips, setFilterChips] = useState<any[]>([]);

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

	return (
		<FilterContext.Provider
			value={{
				showFilter,
				setShowFilter,
				attributeCount,
				fetchAttributesHandler,
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
