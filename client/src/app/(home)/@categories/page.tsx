"use server";

import classes from "./CategoriesGrid.module.scss";
import Image from "next/image";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { appCategoriesGet } from "@/lib/api/categories";
import { ICategory } from "@/types/category/category.interface";
import { getImage, getPlaceholderImage } from "@/tools/getPlaceholderImage";
import { CSSProperties } from "react";
import CategoryPreview from "./components/CategoryPreview";

const Page = async () => {
	const categoriesFetch = await appCategoriesGet();

	const categories: Array<
		ICategory & {
			Media: { src: string; name: string; blurUrl: string };
		} & {
			ImageSize: { height: number; width: number };
		}
	> = await Promise.all(
		categoriesFetch.map(async (data) => {
			const image = await getImage(data.Media.src);

			return {
				...data,
				Media: { ...data.Media, blurUrl: image.base64 },
				ImageSize: { ...image.img },
			};
		}),
	);

	return (
		<ul className={classes["categories-grid"]}>
			{categories &&
				categories.length > 0 &&
				categories.map((category, i) => (
					<li key={i}>
						<CategoryPreview category={category} />
					</li>
				))}
		</ul>
	);
};

export default Page;
