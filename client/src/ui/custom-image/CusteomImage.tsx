"use client";

import { getPlaceholderImage } from "@/utils/getPlaceholderImage";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

type CustomImageProps = {
	className: string;
	src: string;
	alt: string;
};

const CustomImage: FC<CustomImageProps> = (props) => {
	const [src, setSrc] = useState<string>(props.src);
	const [blur, setBlur] = useState<string>();

	useEffect(() => {
		setSrc(props.src);
	}, [props.src]);

	useEffect(() => {
		(async () => {
			const {} = getPlaceholderImage(src);
			setBlur(src);
		})();
	}, [src]);

	// const blur = await getPlaceholderImage(src);

	return (
		<Image
			placeholder={blur ? "blur" : "empty"}
			blurDataURL={blur || undefined}
			fill
			sizes="width:100%; height:100%"
			// className={className}
			src={src}
			alt={props.alt}
		/>
	);
};

export default CustomImage;
