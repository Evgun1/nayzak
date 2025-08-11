"use client";

import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import { useParams } from "next/navigation";
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

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
	setShowFilter: (newValue: boolean) => void;
	attributeState: AttributeState | undefined;
	setAttributesHandler: (searchParams?: URLSearchParams) => Promise<void>;
};

const FilterContext = createContext<SidebarContextItem | undefined>(undefined);

export const FilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const params = useParams() as { category: string; subcategory: string };
	const [showFilter, setShowFilter] = useState<boolean>(false);
	const [attributeState, setAttributeState] = useState<AttributeState>();

	const appAttributeBySubcategoryHandler = async (
		searchParams?: URLSearchParams,
	) => {
		const { subcategoryId } = getIdCategoryOrSubcategory({ params });
		if (!subcategoryId) return;
		const attributes = await appAttributeBySubcategoryGet({
			param: subcategoryId,
			searchParams,
		});
		return attributes;
	};

	const setAttributesHandler = useCallback(
		async (searchParams?: URLSearchParams) => {
			const attributes = await appAttributeBySubcategoryHandler(
				searchParams,
			);
			if (!attributes) return;

			const elementObject = {} as AttributeItem;
			for (const element of attributes.attribute) {
				if (!Object.keys(elementObject).includes(element.name)) {
					elementObject[element.name] = [
						{
							id: element.id,
							type: element.type,
							active: element.active,
						},
					];
					continue;
				}
				elementObject[element.name] = [
					...elementObject[element.name],
					{
						id: element.id,
						type: element.type,
						active: element.active,
					},
				];
			}

			setAttributeState({
				attribute: elementObject,
				countActiveAttributes: attributes.countActiveAttributes,
			});
		},
		[params],
	);

	useEffect(() => {
		setAttributesHandler();
	}, [setAttributesHandler]);

	return (
		<FilterContext.Provider
			value={{
				showFilter,
				setShowFilter,
				attributeState: attributeState,
				setAttributesHandler,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilter = () => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
