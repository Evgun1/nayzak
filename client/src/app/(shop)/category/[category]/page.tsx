"use server";

import { FC } from "react";

import classes from "./SubcategoriesLayout.module.scss";
import { appSubcategoryByCategoryGet } from "@/lib/api/subcategories";
import { ISubcategory } from "@/types/subcategories.interface";
import { getImage, getPlaceholderImage } from "@/tools/getPlaceholderImage";
import { SubcategoryPreviewItem } from "./components/SubcategoryPreview";
import dynamic from "next/dynamic";
import SubcategoriesSkeleton from "./components/SubcategoriesSkeleton";

const SubcategoryPreviewDynamic = dynamic(
	() => import("./components/SubcategoryPreview"),
	{ ssr: false, loading: () => <SubcategoriesSkeleton /> },
);

type SubcategoriesGridProps = {
	params: { category: string };
};

const Page: FC<SubcategoriesGridProps> = async ({ params }) => {
	const subcategoriesFetch = await appSubcategoryByCategoryGet(
		params.category,
	);

	const subcategories: Array<SubcategoryPreviewItem> = await Promise.all(
		subcategoriesFetch.map(async (subcategory) => {
			const image = await getImage(subcategory.Media[0].src);

			return {
				id: subcategory.id,
				title: subcategory.title,
				categoriesId: subcategory.categoriesId,
				Media: {
					base64: image.base64,
					name: subcategory.Media[0].name,
					src: subcategory.Media[0].src,
				},
				ImageSize: { height: image.img.height, width: image.img.width },
			};
		}),
	);

	return (
		<div className={classes["subcategory"]}>
			{subcategories &&
				subcategories.length > 0 &&
				subcategories.map((subcategory, index) => (
					<SubcategoryPreviewDynamic
						key={index}
						params={params}
						subcategory={subcategory}
					/>
				))}
		</div>
	);
};

export default Page;
