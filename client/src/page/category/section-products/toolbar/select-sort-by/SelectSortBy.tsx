"use client";

import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { Select, SelectItem } from "@/ui/select/Select";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../filter/useFilter";

const sortData = [
	{
		title: "Price: Ascending",
		valueName: {
			sortBy: "price",
			sort: "asc",
		},
	},
	{
		title: "Price: Descending",
		valueName: {
			sortBy: "price",
			sort: "desc",
		},
	},
	{
		title: "By Rating",
		valueName: {
			sortBy: "rating",
			sort: "desc",
		},
	},
];

const SelectSortBy: React.FC = () => {
	const [defaultKey, setDefaultKey] = useState<string | undefined>(undefined);
	const { showFilter, setShowFilter } = useFilter();
	const searchParams = useSearchParams() as ReadonlyURLSearchParams;
	const btnClickFilter = () => setShowFilter(!showFilter);

	const getDefaultSelectKey = useCallback(() => {
		const [sortBySearch, sortSearch] = searchParams
			.toString()
			.split("&")
			.map((val) => val.split("="));

		let title;

		for (const element of sortData) {
			if (
				sortBySearch.includes(element.valueName.sortBy) &&
				sortSearch.includes(element.valueName.sort)
			) {
				title = element.title;
			}
		}

		return title?.toLocaleLowerCase();
	}, [searchParams]);

	useEffect(() => {
		setDefaultKey(getDefaultSelectKey());
	}, [getDefaultSelectKey]);

	return (
		<>
			<ButtonCustom
				onClick={btnClickFilter}
				styleSettings={{
					icon: { right: "SETTINGS" },
					size: "SMALL",
					type: "TEXT",
					color: "DARK",
				}}
			>
				Filter
			</ButtonCustom>
			<Select
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
			</Select>
		</>
	);
};

export default SelectSortBy;
