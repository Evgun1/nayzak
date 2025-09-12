"use server";
import classes from "./Info.module.scss";
import { appAttributeByProductGet } from "@/lib/api/attribute";
import appColorGet from "@/lib/api/color";
import { TextClassList } from "@/types/textClassList.enum";
import { capitalizeAndSeparateWords } from "@/tools/capitalizeAndSeparateWords";
import groupAttributes from "@/tools/groupAttributes";
import React, { FC } from "react";

type PageProps = {
	params: { slug: string };
};

const Page: FC<PageProps> = async (props) => {
	const productId = props.params.slug
		.split("-")
		.find((i) => i.includes("p"))
		?.replaceAll("p", "");
	if (!productId) return;
	const attributeFetch = await appAttributeByProductGet({ param: productId });
	const attributes = groupAttributes(attributeFetch.attribute);

	const transformAttribute: { name: string; value: string }[] = [];

	for (const attribute of attributes) {
		if (!attribute.name.includes("color")) {
			transformAttribute.push({
				name: attribute.name,
				value: attribute.value.map((item) => item.type).join(" "),
			});
			continue;
		}

		const color = await Promise.all(
			attribute.value.map(async (item) => {
				const color = await appColorGet({ hex: item.type });
				return color.name.value as string;
			}),
		);

		transformAttribute.push({
			name: attribute.name,
			value: color.join(", "),
		});
	}

	return (
		<div className={classes["attributes"]}>
			{transformAttribute.map((item, i) => (
				<React.Fragment key={i}>
					<div
						className={`${classes["attributes__item"]} ${TextClassList.SEMIBOLD_18}`}
					>
						{capitalizeAndSeparateWords(item.name)}
					</div>
					<div
						className={`${classes["attributes__item"]} ${TextClassList.REGULAR_18}`}
					>
						{item.value}
					</div>
				</React.Fragment>
			))}
		</div>
	);
};
export default Page;
