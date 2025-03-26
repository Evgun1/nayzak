"use client";

import Navbar from "@/lib/ui/navbar/Navbar";
import { CategoryItem } from "@/types/categories.types";
import { appProductsGet } from "@/utils/http/products";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { url } from "inspector";
import { FC, useEffect, useState } from "react";

type NavigationNavbarBodyProps = {
    category: CategoryItem;
};
const NavigationNavbarBody: FC<NavigationNavbarBodyProps> = ({ category }) => {
    const [navigationItem, setNavigationItem] = useState<
        { title: string; url: string }[]
    >([]);

    useEffect(() => {
        const navigationItem: { title: string; url: string }[] = [];
        (async () => {
            const urlSearchParams = new URLSearchParams({});
            urlSearchParams.set("category", category.title);
            const subcategories = await appSubcategoriesGet(urlSearchParams);

            for (const subcategory of subcategories) {
                urlSearchParams.set("subcategory", subcategory.title);

                const { productCounts } = await appProductsGet({
                    searchParams: urlSearchParams,
                });

                if (productCounts > 0) {
                    navigationItem.push({
                        title: subcategory.title,
                        url: `category/${category.title.toLowerCase()}/${subcategory.title.toLowerCase()}`,
                    });
                }
            }

            setNavigationItem(navigationItem);
        })();
    }, []);

    return (
        <Navbar.Body>
            {navigationItem.length > 0 &&
                navigationItem.map((item, i) => (
                    <Navbar.Item href={{ endpoint: item.url }} key={i}>
                        {item.title}
                    </Navbar.Item>
                ))}
        </Navbar.Body>
    );
};

export default NavigationNavbarBody;
