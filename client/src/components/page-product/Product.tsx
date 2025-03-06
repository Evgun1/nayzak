"use server";

import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs";
import ProductSlider from "./ProductSlider";
import Price from "../elements/price/Price";
import ProductActions from "./ProductActions";
import Rating from "../elements/rating/Rating";
import { TextClassList } from "@/types/textClassList.enum";
import { ReviewItem } from "@/types/reviews.types";
import { ProductItem } from "@/types/product.types";

import classes from "./Product.module.scss";
import Reviews from "./product-tab/product-reviws/ProductReviews";
import ProductsTabs, { ProductsTabsItem } from "./ProductTabs";
import ProductDescription from "./product-tab/ProductDescription";
import ProductInfo from "./product-tab/ProductInfo";

const Product = async ({
    totalReviews,
    productData,
    reviewsArray,
}: {
    totalReviews: number;
    reviewsArray: ReviewItem[];
    productData: ProductItem;
}) => {
    const arr: ProductsTabsItem[] = [
        {
            label: "Description",
            children: <ProductDescription productData={productData} />,
        },
        {
            label: "Additional Info",
            children: <ProductInfo />,
        },
        {
            label: "Reviews",
            children: (
                <Reviews totalReviews={totalReviews} reviews={reviewsArray} />
            ),
        },
    ];

    return (
        <>
            <div className={`${classes["product"]}`}>
                <ProductSlider />
                <div className={classes["product__loop"]}>
                    <div className={classes["product__loop-header"]}>
                        <div className={classes["product__info"]}>
                            <Breadcrumbs
                                product={productData}
                                style={{ justifyContent: "flex-start" }}
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
                                    {totalReviews} Reviews
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
        </>
    );
};

export default Product;
