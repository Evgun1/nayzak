import classes from "./ProductImage.module.scss";
import { getImage } from "@/tools/getPlaceholderImage";
import Image from "next/image";
import { FunctionComponent, use } from "react";

interface ProductImageProps {
	src: string;
	alt: string;
}

const ProductImage: FunctionComponent<ProductImageProps> = (props) => {
	const { alt, src } = props;

	const { base64, img } = use(getImage(src));

	return (
		<Image
			placeholder={"blur"}
			blurDataURL={base64}
			fill
			sizes="width:100%; height:100%"
			className={classes["product-image"]}
			src={img.src}
			alt={alt}
		/>
	);
};

export default ProductImage;
