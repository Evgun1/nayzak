"use server";
import Image from "next/image";
import classes from "./ImagePreview.module.scss";
import { FunctionComponent, use } from "react";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";

interface ImagePreviewProps {
	src: string;
	alt: string;
}

const ImagePreview: FunctionComponent<ImagePreviewProps> = async (props) => {
	const { alt, src } = props;
	const { placeholder } = await getPlaceholderImage(src);

	return (
		<div className={classes["image-preview"]}>
			<Image
				src={src}
				placeholder="blur"
				blurDataURL={placeholder}
				sizes="width: 100%; height:100%"
				objectFit="cover"
				priority
				fill
				alt={alt}
				className={classes["image-preview__image"]}
			/>
		</div>
	);
};

export default ImagePreview;
