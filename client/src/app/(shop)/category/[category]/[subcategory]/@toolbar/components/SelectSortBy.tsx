"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFilterContext } from "../../tools/context/useFilterContext";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { Select, SelectItem } from "@/ui/select/Select";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import SelectSortByNav from "./SelectSortByNav";
import { keyof } from "zod/v4";
import { ar } from "zod/v4/locales";
import { usePopupLocalContext } from "@/components/popup-local/tool/usePopupLocalContext";
import { useAppSelector } from "@/redux/redux";
import PopupFilter from "@/popups/popup-filter/PopupFilter";
import PopupFilterSkeleton from "@/popups/popup-filter/skeleton/PopupFilterSkeleton";
import dynamic from "next/dynamic";

export type SortDataType = Array<{
	id: number;
	title: string;
	valueName: {
		sortBy: string;
		sort: string;
	};
}>;

const sortData: SortDataType = [
	{
		id: 1,
		title: "Price: Ascending",
		valueName: {
			sortBy: "price",
			sort: "asc",
		},
	},
	{
		id: 2,
		title: "Price: Descending",
		valueName: {
			sortBy: "price",
			sort: "desc",
		},
	},
	{
		id: 3,
		title: "By Rating",
		valueName: {
			sortBy: "rating",
			sort: "desc",
		},
	},
];

const PopupFilterDynamic = dynamic(
	() => import("@/popups/popup-filter/PopupFilter"),
	{
		ssr: false,
		loading: () => <PopupFilterSkeleton />,
	},
);

const SelectSortBy: React.FC = () => {
	const responsive = useAppSelector((state) => state.responsive);
	const originalData = useRef<SortDataType>(sortData);
	const { showFilter, setShowFilter } = useFilterContext();
	const { setPopup: setTogglePopup } = usePopupLocalContext();
	const searchParams = useSearchParams() as ReadonlyURLSearchParams;

	const [labelState, setLabelState] = useState<string>("Sort by");

	const [dataState, setDataState] = useState<SortDataType>(sortData);

	const btnClickFilter = useCallback(() => {
		// if (responsive.isMobile) setTogglePopup(<PopupFilter />);
		if (responsive.isMobile) setTogglePopup(<PopupFilterDynamic />);
		setShowFilter(!showFilter);
	}, [responsive]);

	const getSearchParamsData = useMemo(() => {
		const result = searchParams
			.toString()
			.split("&")
			.map((val) => val.split("="));

		const [sortBySearch, sortSearch] = result.reduce((acc, curr) => {
			if (curr.includes("sort") || curr.includes("sortBy"))
				acc.push(curr);

			return acc;
		}, [] as Array<Array<string>>);

		return [sortBySearch, sortSearch];
	}, [searchParams]);

	useEffect(() => {
		const [sort, sortBy] = getSearchParamsData;

		let idSortData = -1;
		for (const element of sortData) {
			if (
				sortBy?.includes(element.valueName.sortBy) &&
				sort?.includes(element.valueName.sort)
			) {
				idSortData = element.id;
				setLabelState(element.title);
			}
		}

		setDataState(
			originalData.current.filter((item) => item.id !== idSortData),
		);
	}, [getSearchParamsData, sortData]);

	return (
		<>
			<ButtonCustom
				onClick={btnClickFilter}
				styleSettings={{
					state: ["HOVER"],
					icon: { right: "SETTINGS" },
					size: "SMALL",
					type: "TEXT",
					color: "DARK",
				}}
			>
				Filter
			</ButtonCustom>
			{/* <Select
				label="Sort By"
				defaultSelectKey={defaultKey}
				styleSetting={{
					type: "TEXT",
					fill: "SOLID",
					color: "DARK",
					size: "SMALL",
					icon: { right: "CHEVRON" },
				}}
			>
				{sortData.map((value, index) => (
					<SelectItem
						textValue={value.title}
						itemKey={value.title.toLowerCase()}
						key={index}
					>
						<LinkCustom
							styleSettings={{
								color: "DARK",
								size: "X_SMALL",
								type: "TEXT",
								fill: "SOLID",
								roundness: "SHARP",
							}}
							searchParams={searchParams}
							href={{ queryParams: value.valueName }}
						>
							{value.title}
						</LinkCustom>
					</SelectItem>
				))}
			</Select> */}
			<SelectSortByNav
				data={dataState}
				label={labelState}
				searchParams={searchParams}
			/>
		</>
	);
};

export default SelectSortBy;
