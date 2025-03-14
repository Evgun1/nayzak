"use server";

import ProductPreviewDefault from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefault";
import classes from "./ProductsSwiper.module.scss";

import { appProductsGet } from "@/utils/http/products";
import SwiperComponent from "./swiper/Swiper";
import { ReactElement, Suspense } from "react";
import dynamic from "next/dynamic";

const ProductsSwiper = async () => {
    const urlSearchParams = new URLSearchParams({
        limit: "8",
        sortBy: "createdAt",
        sort: "DESC",
    });
    const { products } = await appProductsGet({
        searchParams: urlSearchParams,
    });

    const SwiperComponentDynamic = dynamic(() => import("./swiper/Swiper"), {
        ssr: true,
    });

    const productsArr: ReactElement[] = [];

    productsArr.push(
        ...products.map((product) => (
            <ProductPreviewDefault
                showIcon
                className={classes["product-swiper__product"]}
                product={product}
            />
        ))
    );

    return (
        <div className='container'>
            <div className={classes["product-swiper"]}>
                <SwiperComponentDynamic
                    label='Latest Arrivals'
                    children={productsArr}
                />
            </div>
        </div>
    );
};

export default ProductsSwiper;
