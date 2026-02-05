"use client";
import FilterList, {
	FilterAttributesItem,
} from "@/app/(shop)/category/[category]/[subcategory]/@filter/components/FilterList";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { appMinMaxPriceGet } from "@/lib/api/products";
import filterAttributesHandler from "@/app/(shop)/category/[category]/[subcategory]/tools/filterAttributesHandler";
import { appAttributeBySubcategoryGet } from "@/lib/api/attribute";
import PopupFilterHeader from "./components/PopupFilterHeader";

interface PopupFilterProps {}

const PopupFilter: FunctionComponent<PopupFilterProps> = () => {
	const [filterAttributes, setFilterAttributes] = useState<
		Array<FilterAttributesItem>
	>([]);
	const [price, setPrice] = useState<{ minPrice: number; maxPrice: number }>({
		maxPrice: 0,
		minPrice: 0,
	});
	const searchParams = useSearchParams();
	const params = useParams();

	const searchParamsObjMemo = useMemo(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
		const obj = {} as Record<string, any>;
		for (const [key, value] of urlSearchParams) {
			obj[key] = value;
		}
		return obj;
	}, [searchParams]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());

		(async () => {
			const { attribute } = await appAttributeBySubcategoryGet({
				param: { slug: params.subcategory as string },
				searchParams: urlSearchParams,
			});

			const filterAttributes = filterAttributesHandler(
				attribute,
				urlSearchParams,
			);
			const { minPrice, maxPrice } = await appMinMaxPriceGet(
				urlSearchParams,
				[params.category as string, params.subcategory as string],
			);

			setFilterAttributes(filterAttributes);
			setPrice({ maxPrice, minPrice });
		})();
	}, [searchParams, params]);

	return (
		<div>
			<PopupFilterHeader />
			<FilterList
				attributes={filterAttributes}
				price={price}
				searchParams={searchParamsObjMemo}
			/>
		</div>
	);
};

export default PopupFilter;
