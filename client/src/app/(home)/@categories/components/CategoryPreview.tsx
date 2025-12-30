"use client";
import { ICategory } from "@/types/category/category.interface";
import classes from "./CategoryPreview.module.scss";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import Image from "next/image";
import React, { CSSProperties, RefObject, useEffect, useRef } from "react";

interface CategoryPreviewItem {
	id: number;
	title: string;
	Media: { src: string; name: string; blurUrl: string };
	ImageSize: { height: number; width: number };
}

type CategoryPreviewProps = {
	category: CategoryPreviewItem;
};

const CategoryPreview: React.FC<CategoryPreviewProps> = (props) => {
	const { category } = props;
	const ref = useRef() as RefObject<HTMLDivElement>;

	useEffect(() => {
		const current = ref.current;
		if (!current) return;

		const currentStyle = current.style;

		if (document.documentElement.clientWidth <= category.ImageSize.width) {
			currentStyle;
		}

		current.style = `--image-ratio: ${
			(document.documentElement.clientWidth <= category.ImageSize.width
				? document.documentElement.clientWidth
				: category.ImageSize.width) / category.ImageSize.height
		} auto`;
	}, [ref]);

	return (
		<div
			ref={ref}
			className={classes["category-preview"]}
		>
			<Image
				placeholder="blur"
				blurDataURL={category.Media.blurUrl}
				loading="lazy"
				fill
				sizes="width:100%; height:100%;"
				className={classes["category-preview__image"]}
				src={category.Media.src}
				alt={category.Media.name}
			/>

			<LinkCustom
				className={classes["category-preview__link"]}
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
	);
};

export default CategoryPreview;
