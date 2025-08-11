"use server";

import { FC } from "react";

import classes from "./Subcategories.module.scss";
import { appSubcategoryByCategoryGet } from "@/lib/api/subcategories";
import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { ISubcategory } from "@/types/subcategories.interface";
import { getPlaceholderImage } from "@/utils/getPlaceholderImage";
import Image from "next/image";

type SubcategoriesGridProps = {
	params: { category?: string };
};

const SubcategoriesSection: FC<SubcategoriesGridProps> = async ({ params }) => {
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
		<div className="container">
			<div className={classes.subcategories}>
				{subcategories &&
					subcategories.length > 0 &&
					subcategories.map((subcategory, index) => (
						<div
							key={index}
							className={classes["subcategories__item"]}
						>
							<Image
								placeholder="blur"
								blurDataURL={subcategory.Media.blurSrc}
								loading="lazy"
								fill
								sizes="width:100%; height:100%;"
								className={classes["subcategories__item-image"]}
								src={subcategory.Media.src}
								alt={subcategory.Media.name}
							/>

							<LinkCustom
								styleSettings={{
									color: "LIGHT",
									roundness: "ROUNDED",
									fill: "SOLID",
									size: "MEDIUM",
									type: "DEFAULT",
								}}
								href={{
									endpoint: `${
										params.category
									}/${subcategory.title.toLowerCase()}-s${
										subcategory.id
									}`,
								}}
								className={classes["subcategories__item-btn"]}
							>
								{subcategory.title}
							</LinkCustom>
						</div>
					))}
			</div>
		</div>
	);
};

export default SubcategoriesSection;
