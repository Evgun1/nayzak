"use server";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import Image from "next/image";
import { FC } from "react";

import classes from "./Subcategories.module.scss";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";

type SubcategoryPreviewProps = {
	params: { category?: string };
	subcategory: {
		id: number;
		title: string;
		categoriesId: number;
		Media: { src: string; name: string }[];
	};
};

const SubcategoryPreview: FC<SubcategoryPreviewProps> = async (props) => {
	const { params, subcategory } = props;
	const blur = await getPlaceholderImage(subcategory.Media[0].src);

	return (
		<div className={classes["subcategory__item"]}>
			<Image
				placeholder="blur"
				blurDataURL={blur.placeholder}
				loading="lazy"
				fill
				sizes="width:100%; height:100%;"
				className={classes["subcategory__item-image"]}
				src={subcategory.Media[0].src}
				alt={subcategory.Media[0].name}
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
					}/${subcategory.title.toLowerCase()}-s${subcategory.id}`,
				}}
				className={classes["subcategory__item-btn"]}
			>
				{subcategory.title}
			</LinkCustom>
		</div>
	);
};

export default SubcategoryPreview;
