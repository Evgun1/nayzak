import Banner from "@/components/page-hero/banner/Banner";
import ProductsSwiper from "@/components/page-hero/products-swiper/ProductsSwiper";
import CategoryGrid from "@/components/page-hero/categories/CategoryGrid";
import ProductGrid from "@/components/page-hero/products-grid/ProductGrid";
import Feature from "@/components/page-hero/feature/Feature";
import FeatureTwo from "@/components/page-hero/feature-two/FeatureTwo";
import IconsBox from "@/components/page-hero/iconsBox/IconsBox";
import React from "react";
import { PageProps } from "../../.next/types/app/page";

export default async function Home(props: PageProps) {
    return (
        <main>
            <Banner />
            <ProductsSwiper />
            <CategoryGrid />
            <ProductGrid searchParams={props.searchParams} />
            <Feature />
            <FeatureTwo />
            <IconsBox />
        </main>
    );
}
