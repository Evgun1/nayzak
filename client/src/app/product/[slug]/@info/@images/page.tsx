"use server";

import classes from "./ProductImageSwiper.module.scss";
import { appMediaByProductGet } from "@/lib/api/media";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import Image from "next/image";
import { FC, Suspense, useEffect, useState } from "react";
import ProductsSwiperPreview from "./swiper/ProductsSwiperPreview";
import dynamic from "next/dynamic";
import ProductsImageSkeleton from "./skeleton/ProductsImageSkeleton";
type PageProps = {
	params: { slug: string };
};

const ProductsSwiperPreviewDynamic = dynamic(
	() => import("./swiper/ProductsSwiperPreview"),
	{ ssr: false, loading: () => <ProductsImageSkeleton /> },
);

const Page: FC<PageProps> = async (props) => {
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
		<div className={classes["product-image"]}>
			<ProductsSwiperPreviewDynamic>
				{media.map((item, i) => (
					<div className={classes["product-image__image-wrap"]}>
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
							className={classes["product-image__image"]}
						/>
					</div>
				))}
			</ProductsSwiperPreviewDynamic>
		</div>
	);
};

export default Page;
