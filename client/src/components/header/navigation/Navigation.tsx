"use server";

import React, { FC } from "react";

import classes from "./Navigation.module.scss";
import { CategoryItem } from "@/types/categories.types";
import { SubcategoryItem } from "@/types/subcategories.types";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
interface NavigationItem {
    label: string;
    url: string;
    active?: boolean;
    children?: NavigationItem[];
}

type AppNavigation = NavigationItem[];

const NavigationActionDynamic = dynamic(() => import("./NavigationAction"), {
    // ssr: true,
});

const Navigation: FC = async () => {
    const navigation: AppNavigation = [];

    const buildNavItem = (category: {
        data: CategoryItem | SubcategoryItem;
        active?: boolean;
    }): NavigationItem => ({
        label: category.data.title,
        active: category.active,
        url: category.data.title.replaceAll(" ", "-").toLowerCase(),
    });

    const categories = await appCategoriesGet();

    for await (const category of categories) {
        const navItem: NavigationItem = buildNavItem({
            data: category,
        });

        const urlSearchParams = new URLSearchParams({
            category: category.title,
        });

        const subCategories = await appSubcategoriesGet(urlSearchParams);
        const subCategoriesForDisplay = [];

        for (const subcategory of subCategories) {
            urlSearchParams.set("subcategory", subcategory.title);

            const { productCounts } = await appProductsGet({
                searchParams: urlSearchParams,
            });

            subCategoriesForDisplay.push({
                active: productCounts > 0,
                data: subcategory,
            });
        }

        if (subCategoriesForDisplay && subCategoriesForDisplay.length) {
            navItem.children = subCategoriesForDisplay.map(buildNavItem);
        }

        navigation.push(navItem);
    }

    if (!navigation || navigation.length === 0) {
        return "";
    }

    return (
        <nav className={classes["header-navigation"]}>
            <NavigationActionDynamic navigationData={navigation} />
        </nav>
    );
};

export default Navigation;
