"use client";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGrid.module.scss";

import { FC, useCallback, useEffect, useState } from "react";
import { CategoryItem } from "@/types/categories.types";
import { SubcategoryItem } from "@/types/subcategories.types";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import { Select, SelectItem } from "@/lib/ui/select/Select";

const ProductGridHeader: FC<{ searchParams: any }> = ({}) => {
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
                label={"Categories"}
                styleSetting={{
                    color: "DARK",
                    size: "X_LARGE",
                    fill: "SOLID",
                    type: "UNDERLINE",
                    icon: { right: "CHEVRON" },
                    roundness: "SHARP",
                }}
                defaultSelectKey={searchParams.get("category") ?? undefined}
            >
                {categories &&
                    categories.length > 0 &&
                    categories.map((category, i) => (
                        <SelectItem
                            textValue={category.title}
                            itemKey={category.title.toLowerCase()}
                            key={i}
                        >
                            <LinkCustom
                                styleSettings={{
                                    type: "TEXT",
                                    color: "DARK",
                                    size: "X_SMALL",
                                    fill: "SOLID",
                                    roundness: "SHARP",
                                }}
                                searchParams={searchParams}
                                href={{
                                    queryParams: {
                                        category: category.title.toLowerCase(),
                                    },
                                    deleteQueryParams: "subcategory",
                                }}
                            >
                                {category.title}
                            </LinkCustom>
                        </SelectItem>
                    ))}
            </Select>
            <div className={ButtonClassList.BUTTON_X_LARGE}>In</div>
            <Select
                defaultSelectKey={searchParams.get("subcategory") ?? undefined}
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
                    subcategories.map((subcategory, i) => (
                        <SelectItem
                            textValue={subcategory.title}
                            itemKey={subcategory.title.toLowerCase()}
                            key={i}
                        >
                            <LinkCustom
                                searchParams={searchParams}
                                styleSettings={{
                                    color: "DARK",
                                    size: "X_SMALL",
                                    type: "TEXT",
                                    roundness: "SHARP",
                                }}
                                href={{
                                    queryParams: {
                                        subcategory:
                                            subcategory.title.toLowerCase(),
                                    },
                                }}
                            >
                                {subcategory.title}
                            </LinkCustom>
                        </SelectItem>
                    ))}
            </Select>
        </div>
    );
};

export default ProductGridHeader;
