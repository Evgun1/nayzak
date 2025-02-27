"use client";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGrid.module.scss";

import { ReactNode, useEffect, useState } from "react";
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
    const [subcategories, setSubcategories] = useState<
        { subcategory: SubcategoryItem; active: boolean }[]
    >([]);

    useEffect(() => {
        (async () => {
            const urlSearchParams = new URLSearchParams(
                searchParams.toString()
            );

            const categories = await appCategoriesGet();

            setCategories(categories);

            const subcategories = await appSubcategoriesGet(urlSearchParams);

            const subCategoriesForDisplay: Array<{
                subcategory: SubcategoryItem;
                active: boolean;
            }> = [];

            for await (const subcategory of subcategories) {
                const insUrlSearchParams = new URLSearchParams({
                    subcategory: subcategory.title,
                });

                if (searchParams.has("category")) {
                    insUrlSearchParams.set(
                        "category",
                        searchParams.get("category") as string
                    );
                }

                const { productCounts, products } = await appProductsGet({
                    searchParams: insUrlSearchParams,
                });

                if (productCounts > 0) {
                    subCategoriesForDisplay.push({
                        subcategory: subcategory,
                        active: productCounts > 0 ? true : false,
                    });
                }
            }
            setSubcategories(subCategoriesForDisplay);
        })();
    }, [searchParams]);

    return (
        <div className={classes["product-grid-header"]}>
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
