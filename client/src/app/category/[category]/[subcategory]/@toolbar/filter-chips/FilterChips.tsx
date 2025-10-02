"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import classes from "./FilterChips.module.scss";
import { FilterAttributesState } from "../../@filter/filter-list/FilterList";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { TextClassList } from "@/types/textClassList.enum";
import { capitalizeAndSeparateWords } from "@/tools/capitalizeAndSeparateWords";
import appColorGet from "@/lib/api/color";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { isRSCRequestCheck } from "next/dist/server/base-server";
import Link from "next/link";
import { appAttributesAllGet } from "@/lib/api/attribute";
import filterAttributesHandler from "../../(filter-tools)/tools/filterAttributesHandler";
import { useFilterContext } from "../../(filter-tools)/context/useFilterContext";

type FilterButtonsProps = {
	searchParams: URLSearchParams;
};

const FilterChips: FC<FilterButtonsProps> = (props) => {
	const { filterChips } = useFilterContext();

	const [attributesState, setAttributesState] = useState<
		{ name: string; href: Record<string, string> }[]
	>([]);

	const deleteAllUrlsSearchParams = useMemo(() => {
		const urlSearchParams = new URLSearchParams(props.searchParams);
		const obj = {} as Record<string, string>;
		for (const [key, value] of urlSearchParams.entries()) {
			if (filterChips.some((item) => item.name === key)) continue;
			obj[key] = value;
		}
		return obj;
	}, [props.searchParams, filterChips]);

	const deleteUlrSearchParams = (name: string, value: string) => {
		const urlSearchParams = new URLSearchParams(props.searchParams);
		const urlValue = urlSearchParams.get(name);
		if (!urlValue) return urlSearchParams;
		const updated = urlValue
			.split(",")
			.filter((item) => item !== value)
			.join(",");

		if (updated) {
			urlSearchParams.set(name, updated);
		} else {
			urlSearchParams.delete(name);
		}

		return urlSearchParams;
	};

	useEffect(() => {
		(async () => {
			const attributes: { name: string; href: Record<string, string> }[] =
				[];

			for (const attribute of filterChips) {
				if (attribute.name !== "color") {
					for (const element of attribute.value) {
						const urlSearchParams = deleteUlrSearchParams(
							attribute.name,
							element.id.toString(),
						);

						const href = {} as Record<string, string>;

						for (const [key, val] of urlSearchParams.entries()) {
							href[key] = val;
						}

						attributes.push({ name: element.type, href });
					}
				} else {
					for (const element of attribute.value) {
						const urlSearchParams = deleteUlrSearchParams(
							attribute.name,
							element.id.toString(),
						);

						const result = await appColorGet({
							hex: element.type.replaceAll("#", "").toUpperCase(),
						});

						const href = {} as Record<string, string>;

						for (const [key, val] of urlSearchParams.entries()) {
							href[key] = val;
						}

						attributes.push({
							name: result.name.value,
							href: href,
						});
					}
				}
			}

			setAttributesState(attributes);
		})();
	}, [filterChips]);

	return (
		<div className={classes["filter-buttons"]}>
			{attributesState && attributesState.length > 0 && (
				<div className={classes["filter-buttons__list"]}>
					{attributesState.map((item, i) => (
						<LinkCustom
							href={{ queryParams: item.href }}
							key={i}
							className={`${classes["filter-buttons__list-item"]} ${TextClassList.SEMIBOLD_12}`}
							styleSettings={{
								color: "LIGHT",
								size: "X_SMALL",
								type: "DEFAULT",
								roundness: "ROUNDED",
								fill: "SOLID",
								icon: { left: "CLOSE" },
							}}
						>
							{capitalizeAndSeparateWords(item.name)}
						</LinkCustom>
					))}
					<LinkCustom
						href={{ queryParams: deleteAllUrlsSearchParams }}
						// href={{ endpoint: "#" }}
						className={classes["filter-buttons__button-clear"]}
						// onClick={buttonClearAllClickHandler}
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
					</LinkCustom>
				</div>
			)}
		</div>
	);
};

export default FilterChips;
