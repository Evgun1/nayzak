"use client";
import classes from "./FilterButtons.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../filter/useFilter";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { capitalizeAndSeparateWords } from "@/tools/capitalizeAndSeparateWords";
import { TextClassList } from "@/types/textClassList.enum";

const FilterButtons: React.FC = () => {
	const { attributeState } = useFilter();
	const searchParams = useSearchParams();
	const [filter, setFilter] = useState<Array<{ type: string; id: number }>>();
	const router = useRouter();

	const buttonClickHandler = useCallback(
		(param: string) => {
			const urlSearchParams = new URLSearchParams();
			for (const [key, value] of searchParams.entries()) {
				const valueArr = value.split(",");
				const filters = valueArr.filter((item) => {
					if (item.includes(param)) return;
					return item;
				});

				if (filters.length > 0) {
					urlSearchParams.set(key, filters.join(","));
				}
			}
			router.push(`?${urlSearchParams}`);
		},
		[searchParams],
	);

	const buttonClearAllClickHandler = useCallback(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, val] of urlSearchParams.entries()) {
			if (!attributeState?.attribute[key]) continue;
			urlSearchParams.delete(key);
		}
		router.push(`?${urlSearchParams}`);
	}, [searchParams, attributeState]);

	useEffect(() => {
		const attribute = attributeState?.attribute;
		if (!attribute) return;

		const arr = [] as any[];

		for (const key in attribute) {
			const getSearchParams = searchParams.get(key);
			if (!getSearchParams) continue;
			const result = getSearchParams.split(",");

			const filter = attribute[key].filter((data) =>
				result.includes(data.id.toString()),
			);

			arr.push(...filter);
		}
		setFilter(arr);
	}, [searchParams, attributeState]);

	return (
		<div className={classes["filter-list"]}>
			{filter && filter.length > 0 && (
				<>
					{filter.map((item, i) => (
						<ButtonCustom
							key={i}
							className={`${classes["filter-list__button"]} ${TextClassList.SEMIBOLD_12}`}
							onClick={() =>
								buttonClickHandler(item.id.toString())
							}
							styleSettings={{
								color: "LIGHT",
								size: "X_SMALL",
								type: "DEFAULT",
								roundness: "ROUNDED",
								fill: "SOLID",
								icon: { left: "CLOSE" },
							}}
						>
							{capitalizeAndSeparateWords(item.type)}
						</ButtonCustom>
					))}
					<ButtonCustom
						className={classes["filter-list__button-clear"]}
						onClick={buttonClearAllClickHandler}
						styleSettings={{
							color: "DARK",
							size: "X_SMALL",
							type: "TEXT",
							roundness: "ROUNDED",
							fill: "SOLID",
							icon: { left: "CLOSE" },
						}}
					>
						Clear All
					</ButtonCustom>
				</>
			)}
		</div>
	);
};

export default FilterButtons;
