"use server";
import { FC } from "react";
import classes from "./FilterChips.module.scss";
import { appAttributesAllGet } from "@/lib/api/attribute";
import groupAttributes from "@/tools/groupAttributes";
import appColorGet from "@/lib/api/color";
import { capitalizeAndSeparateWords } from "@/tools/capitalizeAndSeparateWords";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { TextClassList } from "@/types/textClassList.enum";
import { SearchParams } from "next/dist/server/request/search-params";

type FilterButtonsProps = {
	searchParams: Promise<SearchParams>;
};

const Page: FC<FilterButtonsProps> = async (props) => {
	const searchParams = await props.searchParams;
	const urlSearchParams = new URLSearchParams();

	const getStringSearchParams = (searchParams: SearchParams, key: string) => {
		if (!searchParams[key]) return;
		if (typeof searchParams[key] === "string") return searchParams[key];
		return searchParams[key].join(",");
	};

	const searchParamsColor = getStringSearchParams(searchParams, "color");
	if (searchParamsColor) urlSearchParams.set("color", searchParamsColor);

	const searchParamsManufacturer = getStringSearchParams(
		searchParams,
		"manufacturer",
	);
	if (searchParamsManufacturer)
		urlSearchParams.set("manufacturer", searchParamsManufacturer);

	const searchParamsMaterial = getStringSearchParams(searchParams, "color");
	if (searchParamsMaterial)
		urlSearchParams.set("material", searchParamsMaterial);

	if (urlSearchParams.size === 0) return;

	const attributesFetch = await appAttributesAllGet({
		searchParams: urlSearchParams,
	});

	const groupAttributesFetch = groupAttributes(attributesFetch);

	const attributes: { name: string; href: Record<string, string> }[] = [];
	for (const attribute of groupAttributesFetch) {
		if (attribute.name !== "color") {
			for (const element of attribute.value) {
				const urlSearchParams = deleteUrlSearchParams(
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
				const urlSearchParams = deleteUrlSearchParams(
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

	function deleteUrlSearchParams(name: string, value: string) {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
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
	}

	function deleteAllUrlsSearchParams() {
		const obj = {} as Record<string, string>;
		for (const [key, value] of urlSearchParams.entries()) {
			if (attributes.some((item) => item.name !== key)) continue;
			obj[key] = value;
		}
		return obj;
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
						href={{ queryParams: deleteAllUrlsSearchParams() }}
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

export default Page;
