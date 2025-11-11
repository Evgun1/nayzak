"use server";

import classes from "./ProductImageSwiper.module.scss";
import { appMediaByProductGet } from "@/lib/api/media";
import Image from "next/image";
import { FC } from "react";
import dynamic from "next/dynamic";
import ProductsImageSkeleton from "./skeleton/ProductsImageSkeleton";
import ImagePreview from "./components/ImagePreview";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
type PageProps = {
	params: { slug: string };
};

const ProductsSwiperPreviewDynamic = dynamic(
	() => import("./components/ProductsSwiperPreview"),
	{ ssr: false, loading: () => <ProductsImageSkeleton /> },
);

const Page: FC<PageProps> = async (props) => {
	const productStringId = props.params.slug.split("-").at(-1) as string;
	const id = +productStringId.replaceAll("p", "");
	const mediaFetch = await appMediaByProductGet(id);

	return (
		<div className={classes["product-image"]}>
			<ProductsSwiperPreviewDynamic>
				{mediaFetch.map((media, i) => (
					<ImagePreview
						key={i}
						alt={media.name}
						src={media.src}
					/>
				))}
			</ProductsSwiperPreviewDynamic>
		</div>
	);
};

export default Page;
