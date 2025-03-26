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

const NavigationActionDynamic = dynamic(
    () => import("./NavigationNavbar"),
    {
        ssr: true,
    }
);

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

    return (
        <nav className={classes["header-navigation"]}>
            <NavigationActionDynamic navigationData={categories} />
        </nav>
    );
};

export default Navigation;
