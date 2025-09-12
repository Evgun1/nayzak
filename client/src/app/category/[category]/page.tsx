"use server";

import { FC } from "react";

import classes from "./Subcategories.module.scss";
import { appSubcategoryByCategoryGet } from "@/lib/api/subcategories";
import { ISubcategory } from "@/types/subcategories.interface";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import SubcategoryPreview from "./SubcategoryPreview";

type SubcategoriesGridProps = {
	params: { category: string };
};

const Page: FC<SubcategoriesGridProps> = async ({ params }) => {
	const subcategoriesFetch = await appSubcategoryByCategoryGet(
		params.category,
	);

	const subcategories: Array<
		ISubcategory & {
			Media: { blurSrc: string; src: string; name: string };
		}
	> = await Promise.all(
		subcategoriesFetch.map(async (subcategory) => {
			const blur = await getPlaceholderImage(subcategory.Media[0].src);
			return {
				...subcategory,
				Media: {
					blurSrc: blur.placeholder,
					name: subcategory.Media[0].name,
					src: subcategory.Media[0].src,
				},
			} as ISubcategory & {
				Media: { blurSrc: string; src: string; name: string };
			};
		}),
	);

	return (
		<div className={classes["subcategory"]}>
			{subcategoriesFetch &&
				subcategoriesFetch.length > 0 &&
				subcategoriesFetch.map((subcategory, index) => (
					<SubcategoryPreview
						params={params}
						subcategory={subcategory}
					/>
				))}
		</div>
	);
};

export default Page;
