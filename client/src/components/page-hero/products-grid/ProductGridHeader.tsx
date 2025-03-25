"use server";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGrid.module.scss";

import { FC, ReactNode, useEffect, useState } from "react";
import { CategoryItem } from "@/types/categories.types";
import { SubcategoryItem } from "@/types/subcategories.types";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";
import Select from "@/lib/ui/select/Select";

type ProductGridHeaderProps = {
    searchParams: Record<string, any>;
};

const ProductGridHeader: FC<ProductGridHeaderProps> = async ({
    searchParams,
}) => {
    const urlSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        urlSearchParams.set(key, value);
    }

    const categories = await appCategoriesGet();

    const subcategories = await appSubcategoriesGet(urlSearchParams);

    const subcategoriesForDisplay: Array<{
        subcategory: SubcategoryItem;
        active: boolean;
    }> = [];

    for await (const subcategory of subcategories) {
        const insUrlSearchParams = new URLSearchParams({
            subcategory: subcategory.title,
        });

        if (searchParams.category) {
            insUrlSearchParams.set("category", searchParams.category as string);
        }

        const { productCounts } = await appProductsGet({
            searchParams: insUrlSearchParams,
        });

        if (productCounts > 0) {
            subcategoriesForDisplay.push({
                subcategory: subcategory,
                active: productCounts > 0 ? true : false,
            });
        }
    }

    console.log(categories);

    return (
        <div className={classes["product-grid__header"]}>
            <div className={ButtonClassList.BUTTON_X_LARGE}>
                You’re browsing
            </div>
            <Select
                trackByQuery
                label={"Categories"}
                styleSetting={{
                    color: "DARK",
                    size: "X_LARGE",
                    fill: "SOLID",
                    type: "UNDERLINE",
                    icon: { right: "CHEVRON" },
                    roundness: "SHARP",
                }}
            >
                {categories &&
                    categories.length > 0 &&
                    categories.map((category, index) => (
                        <Select.OptionLink
                            key={index}
                            href={{
                                queryParams: { category: category.title },
                                deleteQueryParams: "subcategory",
                            }}
                        >
                            {category.title}
                        </Select.OptionLink>
                    ))}
            </Select>
            <div className={ButtonClassList.BUTTON_X_LARGE}>In</div>
            <Select
                label={"Subcategories"}
                styleSetting={{
                    color: "DARK",
                    fill: "SOLID",
                    size: "X_LARGE",
                    type: "UNDERLINE",
                    icon: { right: "CHEVRON" },
                    roundness: "SHARP",
                }}
            >
                {subcategoriesForDisplay &&
                    subcategoriesForDisplay.length > 0 &&
                    subcategoriesForDisplay.map((subcategory, index) => (
                        <Select.OptionLink
                            acton={subcategory.active}
                            key={index}
                            href={{
                                queryParams: {
                                    subcategory: subcategory.subcategory.title,
                                },
                            }}
                        >
                            {subcategory.subcategory.title}
                        </Select.OptionLink>
                    ))}
            </Select>
        </div>
    );
};

export default ProductGridHeader;
