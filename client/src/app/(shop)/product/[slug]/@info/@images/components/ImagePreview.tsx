"use server";
import Image from "next/image";
import classes from "./ImagePreview.module.scss";
import { FunctionComponent, use } from "react";
import { getImage } from "@/tools/getPlaceholderImage";

interface ImagePreviewProps {
	src: string;
	alt: string;
}

const ImagePreview: FunctionComponent<ImagePreviewProps> = async (props) => {
	const { alt, src } = props;
	const { base64, img } = await getImage(src);

	return (
		<div className={classes["image-preview"]}>
			<Image
				src={img.src}
				placeholder="blur"
				blurDataURL={base64}
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
