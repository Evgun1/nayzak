"use server";
import { FC } from "react";
import classes from "./FilterChips.module.scss";
import { FilterAttributesArray } from "../../@filter/(filter-list)/FilterList";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { TextClassList } from "@/types/textClassList.enum";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import appColorGet from "@/lib/api/color";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { isRSCRequestCheck } from "next/dist/server/base-server";
import Link from "next/link";

type FilterButtonsProps = {
	attributes: FilterAttributesArray;
	searchParams: URLSearchParams;
};

const FilterButtons: FC<FilterButtonsProps> = async (props) => {
	const attributes: { name: string; href: Record<string, string> }[] = [];
	const urlSearchParams = new URLSearchParams(props.searchParams);

	const hrefClearAll = {} as Record<string, string>;

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

	const deleteAllUrlsSearchParams = (name: string) => {
		const urlSearchParams = new URLSearchParams(props.searchParams);
		const urlObj = {} as Record<string, string>;

		for (const [key, val] of urlSearchParams.entries()) {
			if (key === name) continue;
			urlObj[key] = val;
		}
		return urlObj;
	};

	for (const attribute of props.attributes) {
		const data = deleteAllUrlsSearchParams(attribute.name);
		for (const key in data) hrefClearAll[key] = data[key];

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

	return (
		<div className={classes["filter-buttons"]}>
			{attributes && attributes.length > 0 && (
				<div className={classes["filter-buttons__list"]}>
					{attributes.map((item, i) => (
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
						href={{ queryParams: hrefClearAll }}
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

export default FilterButtons;
