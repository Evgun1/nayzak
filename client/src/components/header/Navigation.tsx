"use client";

import React, { ReactElement, ReactNode, useEffect, useState } from "react";

import DropDown from "@/lib/ui/drop-down/DropDown";
import classes from "./Navigation.module.scss";
import { CategoryItem } from "@/types/categories.types";
import { SubcategoryItem } from "@/types/subcategories.types";
import NavLink from "@/lib/ui/nav-link/NavLink";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs";

interface NavigationItem {
    label: string;
    url: string;
    active?: boolean;
    children?: NavigationItem[];
}

type AppNavigation = NavigationItem[];

export default function Navigation() {
    const [navigation, setNavigation] = useState<AppNavigation>([]);

    const buildNavItem = (category: {
        data: CategoryItem | SubcategoryItem;
        active?: boolean;
    }): NavigationItem => ({
        label: category.data.title,
        active: category.active,
        url: category.data.title.replaceAll(" ", "-").toLowerCase(),
    });

    useEffect(() => {
        (async () => {
            const categories = await appCategoriesGet();

            const navigation: AppNavigation = [];

            for await (const category of categories) {
                const navItem: NavigationItem = buildNavItem({
                    data: category,
                });

                const urlSearchParams = new URLSearchParams({
                    category: category.title,
                });

                const subCategories = await appSubcategoriesGet(
                    urlSearchParams
                );
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
                    navItem.children =
                        subCategoriesForDisplay.map(buildNavItem);
                }

                navigation.push(navItem);
            }

            setNavigation(navigation);
        })();
    }, []);

    if (!navigation || navigation.length === 0) {
        return "";
    }

    return (
        <nav className={classes["header-navigation"]}>
            {navigation.map((item, index) => (
                <DropDown
                    typeProperty='mouseenter'
                    key={index}
                    btnCustomSettings={{
                        color: "DARK",
                        size: "MEDIUM",
                        type: "TEXT",
                    }}
                    label={
                        <NavLink
                            classesName={classes["header-navigation__nav-link"]}
                            href={{ endpoint: `category/${item.url}` }}
                            styleSettings={{
                                color: "DARK",
                                roundness: "SHARP",
                                size: "X_SMALL",
                                type: "TEXT",
                                icon: { right: "CHEVRON" },
                            }}
                        >
                            {item.label}
                        </NavLink>
                    }
                >
                    {item.children &&
                        item.children.length > 0 &&
                        item.children.map((subItem, index) => (
                            <DropDown.Item key={index} active={subItem.active}>
                                <LinkCustom
                                    href={{
                                        endpoint: `/category/${item.url}/${subItem.url}`,
                                    }}
                                    // className={classes["navigation--link"]}
                                    styleSettings={{
                                        type: "TEXT",
                                        color: "DARK",
                                        roundness: "SHARP",
                                        size: "MEDIUM",
                                    }}
                                >
                                    {subItem.label}
                                </LinkCustom>
                            </DropDown.Item>
                        ))}
                </DropDown>
            ))}
        </nav>
    );
}
