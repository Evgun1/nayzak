"use server";

import classes from "./CategoriesGrid.module.scss";
import Image from "next/image";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { appCategoriesGet } from "@/lib/api/categories";
import { ICategory } from "@/types/category/category.interface";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";

const CategoryGrid = async () => {
	const categoriesFetch = await appCategoriesGet();

	const categories: Array<
		ICategory & { Media: { src: string; name: string; blurUrl: string } }
	> = await Promise.all(
		categoriesFetch.map(async (data) => {
			const blur = await getPlaceholderImage(data.Media.src);

			return {
				...data,
				Media: { ...data.Media, blurUrl: blur.placeholder },
			};
		}),
	);

	return (
		<section className="section">
			<div className="container">
				<ul className={classes["categories-grid"]}>
					{categories &&
						categories.length > 0 &&
						categories.map((category, i) => (
							<li key={i}>
								<div
									className={
										classes["categories-grid__content"]
									}
								>
									<Image
										placeholder="blur"
										blurDataURL={category.Media.blurUrl}
										loading="lazy"
										fill
										sizes="width:100%; height:100%;"
										className={
											classes["categories-grid__image"]
										}
										src={category.Media.src}
										alt={category.Media.name}
									/>

									<LinkCustom
										className={
											classes["categories-grid__link"]
										}
										href={{
											endpoint: `/category/${category.title.toLowerCase()}-c${
												category.id
											}`,
										}}
										styleSettings={{
											color: "LIGHT",
											fill: "SOLID",
											roundness: "ROUNDED",
											size: "MEDIUM",
											type: "DEFAULT",
										}}
									>
										{category.title}
									</LinkCustom>
								</div>
							</li>
						))}
				</ul>
			</div>
		</section>
	);
};

export default CategoryGrid;
