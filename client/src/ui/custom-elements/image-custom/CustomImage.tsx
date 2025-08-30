"use client";
import { getPlaceholderImage } from "@/utils/getPlaceholderImage";
import Image from "next/image";
import { FC, useLayoutEffect, useState } from "react";

type CustomImageProps = {
	className?: string;
	src: string;
	alt: string;
	blur?: string;
};

const ImageCustom: FC<CustomImageProps> = (props) => {
	// const blur = await getPlaceholderImage(props.src);
	const [imageState, setImageState] = useState<{
		src: string;
		alt: string;
		blur?: string;
	}>({ ...props });

	useLayoutEffect(() => {
		(async () => {
			const { placeholder } = await getPlaceholderImage(props.src);

			setImageState((prev) => ({ ...prev, blur: placeholder }));
		})();
	}, [props]);

	return (
		<>
			<Image
				placeholder={imageState.blur ? "blur" : "empty"}
				blurDataURL={imageState.blur || undefined}
				fill
				sizes="width:100%; height:100%"
				className={props.className ? props.className : ""}
				src={imageState.src}
				alt={imageState.alt}
			/>
		</>
	);
};

export default ImageCustom;
