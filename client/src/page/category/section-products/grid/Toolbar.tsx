"use client";

import classes from "./Toolbar.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { FilterContext } from "../filter/FilterCtx";
import ListTypeButton from "./ListTypeButton";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { Select, SelectItem } from "@/ui/select/Select";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { useFilter } from "../filter/useFilter";

export enum TypeList {
	FIVE = "five_grid",
	FOUR = "four_grid",
	THREE = "three_grid",
	TWO = "two_grid",
	LIST = "list",
}

const SELECTOR = [
	{ icon: IconsIdList.FIVE_COLUMNS, typeList: TypeList.FIVE },
	{ icon: IconsIdList.FOUR_COLUMNS, typeList: TypeList.FOUR },
	{ icon: IconsIdList.THREE_COLUMNS, typeList: TypeList.THREE },
	{ icon: IconsIdList.TWO_COLUMNS, typeList: TypeList.TWO },
	{ icon: IconsIdList.LIST_COLUMNS, typeList: TypeList.LIST },
];

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

type ToolbarProps = {
	totalCount?: number;
};

const Toolbar: FC<ToolbarProps> = ({ totalCount }) => {
	const { showFilter, setShowFilter } = useFilter();
	const [defaultKey, setDefaultKey] = useState<string | undefined>(undefined);
	const searchParams = useSearchParams() as ReadonlyURLSearchParams;

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

	const btnClickFilter = () => setShowFilter(!showFilter);

	useEffect(() => {
		setDefaultKey(getDefaultSelectKey());
	}, [getDefaultSelectKey]);

	return (
		<div className={classes["toolbar"]}>
			<span>{totalCount} products</span>

			<div></div>

			<div className={classes["toolbar__filter"]}>
				<ButtonCustom
					onClick={btnClickFilter}
					styleSettings={{
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

				<ul className={classes["toolbar__selector"]}>
					{SELECTOR.map((value, index) => (
						<li key={index}>
							<ListTypeButton
								icon={value.icon}
								typeList={value.typeList}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Toolbar;
