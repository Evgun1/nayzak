"use server";

import classes from "./ProductImageSwiper.module.scss";
import { appMediaByProductGet } from "@/lib/api/media";
import Image from "next/image";
import { FC } from "react";
import dynamic from "next/dynamic";
import ProductsImageSkeleton from "./skeleton/ProductsImageSkeleton";
import ImagePreview from "./components/ImagePreview";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import ProductsSwiperPreview from "./components/ProductsSwiperPreview";
type PageProps = {
	params: Promise<{ slug: string }>;
};

// const ProductsSwiperPreviewDynamic = dynamic(
// 	() => import("./components/ProductsSwiperPreview"),
// 	{ ssr: false, loading: () => <ProductsImageSkeleton /> },
// );

const Page: FC<PageProps> = async (props) => {
	const slug = (await props.params).slug;
	const productStringId = slug.split("-").at(-1) as string;
	const id = +productStringId.replaceAll("p", "");
	const mediaFetch = await appMediaByProductGet(id);

	return (
		<div className={classes["product-image"]}>
			<ProductsSwiperPreview>
				{mediaFetch.map((media, i) => (
					<ImagePreview
						key={i}
						alt={media.name}
						src={media.src}
					/>
				))}
			</ProductsSwiperPreview>
		</div>
	);
};

export default Page;
