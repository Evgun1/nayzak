"use server";

import classes from "./ProductImageSwiper.module.scss";
import { appMediaByProductGet } from "@/lib/api/media";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import Image from "next/image";
import { FC } from "react";
import ProductsSwiperPreview from "./swiper/ProductsSwiperPreview";
type PageProps = {
	params: { slug: string };
};

const ProductImageSwiper: FC<PageProps> = async (props) => {
	const productStringId = props.params.slug.split("-").at(-1) as string;
	const id = +productStringId.replaceAll("p", "");
	const mediaFetch = await appMediaByProductGet(id);

	const media: { src: string; name: string; blur: string }[] =
		await Promise.all(
			mediaFetch.map(async (media) => {
				const blur = await getPlaceholderImage(media.src);

				return { ...media, blur: blur.placeholder } as {
					src: string;
					name: string;
					blur: string;
				};
			}),
		);

	return (
		<div className={classes["product__image"]}>
			<ProductsSwiperPreview>
				{media.map((item, i) => (
					<Image
						key={i}
						placeholder="blur"
						blurDataURL={item.blur}
						sizes="width: 100%; height:100%"
						// objectFit="cover"
						priority
						fill
						alt={item.name}
						src={item.src}
						className={classes["product-slider__img"]}
					/>
				))}
			</ProductsSwiperPreview>
		</div>
	);
};

export default ProductImageSwiper;
