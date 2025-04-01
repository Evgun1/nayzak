"use client";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGrid.module.scss";

import { useCallback, useEffect, useState } from "react";
import { CategoryItem } from "@/types/categories.types";
import { SubcategoryItem } from "@/types/subcategories.types";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";
import Select from "@/lib/ui/select/Select";

const ProductGridHeader = () => {
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([]);

    const fetchData = useCallback(async () => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());

        const [categoriesFetch, subcategoriesFetch] = await Promise.all([
            appCategoriesGet(),
            appSubcategoriesGet(
                urlSearchParams.has("category") ? urlSearchParams : undefined
            ),
        ]);

        setCategories(categoriesFetch);
        setSubcategories(subcategoriesFetch);

        if (
            !urlSearchParams.has("category") &&
            !urlSearchParams.has("subcategory")
        ) {
            return;
        }

        const productsCount = await Promise.all([
            appProductsGet({
                searchParams: urlSearchParams,
            }).then((res) => res.productCounts),
        ]).then((res) => res[0]);

        if (productsCount > 0) {
            setSubcategories(subcategoriesFetch);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                {subcategories &&
                    subcategories.length > 0 &&
                    subcategories.map((subcategory, index) => (
                        <Select.OptionLink
                            // acton={subcategory.active}
                            key={index}
                            href={{
                                queryParams: {
                                    subcategory: subcategory.title,
                                },
                            }}
                        >
                            {subcategory.title}
                        </Select.OptionLink>
                    ))}
            </Select>
        </div>
    );
};

export default ProductGridHeader;
