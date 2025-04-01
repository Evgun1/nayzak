import { ProductItem } from "@/types/product.types";

import { FC } from "react";

import classes from "./productList.module.scss";
import "./style.scss";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import ProductPreviewDefault from "../product-preview/product-preview-default/ProductsPreviewDefault";

type ProductListProps = {
    productsArray: ProductItem[];
    rating?: boolean;
    style: any;
    stylePrice?: string;
    stylePreview?: string;
    totalCount: number;
    count: number;
    btnClickHandler?: () => void;
};

const ProductList: FC<ProductListProps> = ({
    productsArray,
    rating,
    style,
    stylePrice,
    stylePreview,
    totalCount,
    count,
    btnClickHandler,
}) => {
    return (
        <>
            <ul className={`${style} ${classes.grid}`}>
                {productsArray &&
                    productsArray.length > 0 &&
                    productsArray.map((product, index) => (
                        <li key={index}>
                            <ProductPreviewDefault
                                rating={rating}
                                product={product}
                                className={stylePreview}
                                stylePrice={stylePrice}
                            />
                        </li>
                    ))}
            </ul>
            {totalCount > count && (
                <ButtonCustom
                    onClick={btnClickHandler}
                    styleSettings={{
                        fill: "SOLID",
                        size: "MEDIUM",
                        type: "DEFAULT",
                        color: "DARK",
                        roundness: "SHARP",
                    }}
                >
                    Load More
                </ButtonCustom>
            )}
        </>
    );
};

export default ProductList;
