"use server";

import ProductPreviewDefault from "@/components/elements/product-preview/product-preview-default/ProductsPreviewDefault";
import classes from "./ProductsSwiper.module.scss";

import { appProductsGet } from "@/utils/http/products";
import SwiperComponent from "./swiper/Swiper";

const ProductsSwiper = async () => {
    const urlSearchParams = new URLSearchParams({
        limit: "8",
        sortBy: "createdAt",
        sort: "DESC",
    });
    const { products } = await appProductsGet({
        searchParams: urlSearchParams,
    });

    return (
        <div className={`container  ${classes.wrapper}`}>
            <SwiperComponent
                label='Latest Arrivals'
                children={
                    <>
                        {products.map((product) => (
                            <ProductPreviewDefault
                                showIcon
                                className={classes["wrapper__product"]}
                                product={product}
                            />
                        ))}
                    </>
                }
            />
        </div>
    );
};

export default ProductsSwiper;
