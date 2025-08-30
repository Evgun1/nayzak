"use server";

import { FC } from "react";

import classes from "./Subcategories.module.scss";
import { appSubcategoryByCategoryGet } from "@/lib/api/subcategories";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { ISubcategory } from "@/types/subcategories.interface";
import { getPlaceholderImage } from "@/utils/getPlaceholderImage";
import Image from "next/image";
import SubcategoryPreview from "./SubcategoryPreview";

type SubcategoriesGridProps = {
	params: { category?: string };
};

const Page: FC<SubcategoriesGridProps> = async ({ params }) => {
	const { categoryId } = getIdCategoryOrSubcategory({ params });
	if (!categoryId) return;

	const subcategoriesFetch = await appSubcategoryByCategoryGet(categoryId);

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
