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
	const attributeFetch = await appAttributeByProductGet({
		param: { slug: props.params.slug },
	});

	const attributes = groupAttributes(attributeFetch.attributes);

	const transformAttribute = await attributes.reduce(
		async (accPromise, cur) => {
			const acc = await accPromise;

			if (!cur.name.includes("color")) {
				acc.push({
					name: cur.name,
					value: cur.value.map((item) => item.type).join(" "),
				});
			} else {
				const color = await Promise.all(
					cur.value.map(async (item) => {
						return appColorGet({ hex: item.type }).then(
							(color) => color.name.value as string,
						);
					}),
				);
				acc.push({
					name: cur.name,
					value: color.join(", "),
				});
			}
			return acc;
		},
		Promise.resolve([] as { name: string; value: string }[]),
	);

	return (
		<div className={classes["attributes"]}>
			{transformAttribute &&
				transformAttribute.length > 0 &&
				transformAttribute.map((item, i) => (
					<React.Fragment key={i}>
						<div className={`${classes["attributes__name"]}`}>
							{capitalizeAndSeparateWords(item.name)}
						</div>
						<div className={`${classes["attributes__value"]}`}>
							{item.value}
						</div>
					</React.Fragment>
				))}
		</div>
	);
};
export default Page;
