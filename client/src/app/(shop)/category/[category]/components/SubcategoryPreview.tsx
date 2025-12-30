"use client";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import Image from "next/image";
import { CSSProperties, FC, RefObject, useEffect, useRef } from "react";

import classes from "./SubcategoryPreview.module.scss";
import { getImage, getPlaceholderImage } from "@/tools/getPlaceholderImage";

export interface SubcategoryPreviewItem {
	id: number;
	title: string;
	categoriesId: number;
	Media: { src: string; name: string; base64: string };
	ImageSize: { width: number; height: number };
}

type SubcategoryPreviewProps = {
	params: { category?: string };
	subcategory: SubcategoryPreviewItem;
};

const SubcategoryPreview: FC<SubcategoryPreviewProps> = async (props) => {
	const { params, subcategory } = props;
	const ref = useRef() as RefObject<HTMLDivElement>;

	useEffect(() => {
		const current = ref.current;
		if (!current) return;

		current.style = `--image-ratio: ${
			document.documentElement.clientWidth <= subcategory.ImageSize.width
				? document.documentElement.clientWidth /
				  subcategory.ImageSize.height
				: subcategory.ImageSize.width / subcategory.ImageSize.height
		} auto`;
	}, [ref]);

	return (
		<div
			ref={ref}
			className={classes["subcategory-preview"]}
		>
			<Image
				placeholder="blur"
				blurDataURL={subcategory.Media.base64}
				loading="lazy"
				fill
				sizes="width:100%; height:100%;"
				className={classes["subcategory-preview__image"]}
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
					}/${subcategory.title.toLowerCase()}-s${subcategory.id}`,
				}}
				className={classes["subcategory-preview__btn"]}
			>
				{subcategory.title}
			</LinkCustom>
		</div>
	);
};

export default SubcategoryPreview;
