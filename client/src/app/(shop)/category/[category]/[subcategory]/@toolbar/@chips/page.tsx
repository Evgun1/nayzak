"use server";
import { FC } from "react";
import classes from "./FilterChips.module.scss";
import { appAttributesAllGet } from "@/lib/api/attribute";
import groupAttributes from "@/tools/groupAttributes";
import appColorGet from "@/lib/api/color";
import { capitalizeAndSeparateWords } from "@/tools/capitalizeAndSeparateWords";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { TextClassList } from "@/types/textClassList.enum";

type FilterButtonsProps = {
	searchParams: Record<string, any>;
};

const Page: FC<FilterButtonsProps> = async (props) => {
	const { searchParams } = props;
	const urlSearchParams = new URLSearchParams();

	if (searchParams.color) urlSearchParams.set("color", searchParams.color);
	if (searchParams.manufacturer)
		urlSearchParams.set("manufacturer", searchParams.manufacturer);
	if (searchParams.material)
		urlSearchParams.set("material", searchParams.material);

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
