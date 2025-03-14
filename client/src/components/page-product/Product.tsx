"use server";

import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs.copy";
import ProductSlider from "./ProductSlider";
import Price from "../elements/price/Price";
import ProductActions from "./ProductActions";
import Rating from "../elements/rating/Rating";
import { TextClassList } from "@/types/textClassList.enum";
import { ReviewItem } from "@/types/reviews.types";
import { ProductItem } from "@/types/product.types";

import classes from "./Product.module.scss";
import Reviews from "./product-tab/product-reviews/ProductReviews";
import ProductsTabs, { ProductsTabsItem } from "./ProductTabs";
import ProductDescription from "./product-tab/ProductDescription";
import ProductInfo from "./product-tab/ProductInfo";
import dynamic from "next/dynamic";

const Product = async ({
    reviewsData,
    productData,
}: {
    reviewsData: {
        totalReviews: number;
        reviewsArray: ReviewItem[];
    };
    productData: ProductItem & { category: string; subcategory: string };
}) => {
    const ProductDescriptionDynamic = dynamic(
        () => import("./product-tab/ProductDescription")
    );
    const ProductInfoDynamic = dynamic(
        () => import("./product-tab/ProductInfo")
    );
    const ProductReviewsDynamic = dynamic(
        () => import("./product-tab/product-reviews/ProductReviews")
    );

    const arr: ProductsTabsItem[] = [
        {
            label: "Description",
            children: <ProductDescriptionDynamic productData={productData} />,
        },
        {
            label: "Additional Info",
            children: <ProductInfoDynamic />,
        },
        {
            label: "Reviews",
            children: (
                <ProductReviewsDynamic
                    totalReviews={reviewsData.totalReviews}
                    reviews={reviewsData.reviewsArray}
                />
            ),
        },
    ];

    return (
        <div>
            <div className={`${classes["product"]}`}>
                <ProductSlider />
                <div className={classes["product__loop"]}>
                    <div className={classes["product__loop-header"]}>
                        <div className={classes["product__info"]}>
                            <Breadcrumbs
                                path='category'
                                value={[
                                    productData.category,
                                    productData.subcategory,
                                    productData.title,
                                ]}

                                // product={productData}
                                // style={{ justifyContent: "flex-start" }}
                            />
                            <h5>{productData.title}</h5>
                            <p className={TextClassList.REGULAR_14}>
                                {productData.description}
                            </p>
                            <div className={classes["product__info-rating"]}>
                                <Rating
                                    rating={
                                        productData.rating
                                            ? +productData.rating
                                            : 0
                                    }
                                />
                                <span className={TextClassList.REGULAR_12}>
                                    {reviewsData.totalReviews} Reviews
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${classes["product__loop-price"]} ${TextClassList.SEMIBOLD_26}`}
                        >
                            <Price
                                discount={productData.discount}
                                mainPrice={productData.mainPrice}
                                price={productData.price}
                            />
                        </div>
                    </div>
                    <ProductActions
                        className={classes["product__loop-action"]}
                        productID={productData.id}
                    />
                </div>
            </div>
            <ProductsTabs data={arr} />
        </div>
    );
};

export default Product;
