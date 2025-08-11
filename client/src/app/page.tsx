import Banner from "@/page/hero/banner/Banner";
import ProductsSwiper from "@/page/hero/products-swiper/ProductsSwiper";
import CategoryGrid from "@/page/hero/categories/CategoryGrid";
import ProductGrid from "@/page/hero/products-grid/ProductGrid";
import Feature from "@/page/hero/feature/Feature";
import FeatureTwo from "@/page/hero/feature-two/FeatureTwo";
import IconsBox from "@/page/hero/iconsBox/IconsBox";
import React from "react";
import { PageProps } from "../../.next/types/app/(home)/layout";

export default async function Home(props: PageProps) {
	return (
		<main>
			<Banner />
			{/* <ProductsSwiper /> */}
			<CategoryGrid />
			<ProductGrid searchParams={props.searchParams} />
			<Feature />
			<FeatureTwo />
			<IconsBox />
		</main>
	);
}
