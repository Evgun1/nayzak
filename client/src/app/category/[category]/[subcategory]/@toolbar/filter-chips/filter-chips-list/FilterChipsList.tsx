"use client";
import classes from "./FilterChipsList.module.scss";

import { TextClassList } from "@/types/textClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

export interface FilterChipsAttributesValueItem {
	type: string;
	id: number;
}

type FilterChipsPreviewProps = {
	attributesValue: FilterChipsAttributesValueItem[];
	attributesName: string[];
	searchParams: URLSearchParams;
};
const FilterChipsList: FC<FilterChipsPreviewProps> = (props) => {
	const router = useRouter();

	const buttonClearAllClickHandler = useCallback(() => {
		const urlSearchParams = new URLSearchParams(props.searchParams);

		const deleteKey = [] as string[];
		for (const [key, val] of urlSearchParams.entries()) {
			for (const element of props.attributesName)
				if (element === key) deleteKey.push(key);
		}
		for (const element of deleteKey) urlSearchParams.delete(element);
		router.push(`?${urlSearchParams}`);
	}, [props.searchParams]);

	const buttonClearClickHandler = useCallback(
		(id: string | number) => {
			const urlSearchParams = new URLSearchParams(props.searchParams);

			for (const [key, val] of urlSearchParams.entries()) {
				if (!props.attributesName.includes(key)) continue;

				urlSearchParams.delete(key, id.toString());
			}

			// router.push(`?${urlSearchParams}`);
		},
		[props.searchParams],
	);

	return (
		<div>
			{props.attributesValue && props.attributesValue.length > 0 && (
				<div className={classes["filter-buttons__list"]}>
					{props.attributesValue.map((item, i) => (
						<ButtonCustom
							key={i}
							className={`${classes["filter-buttons__list-item"]} ${TextClassList.SEMIBOLD_12}`}
							onClick={() => buttonClearClickHandler(item.id)}
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
						className={classes["filter-buttons__button-clear"]}
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
				</div>
			)}
		</div>
	);
};

export default FilterChipsList;
