"use client";

import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import { useEffect, useState } from "react";

import DropDown from "@/lib/ui/drop-down/DropDown";
import classes from "./Navigation.module.scss";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import { Category } from "@/types/categories";
import { Subcategory } from "@/types/subcategories";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchSubcategories } from "@/hooks/useFetchSubcategories";
import NavLink from "@/lib/ui/nav-link/NavLink";

interface NavigationItem {
  label: string;
  url: string;
  children?: NavigationItem[];
}
type AppNavigation = NavigationItem[];

export default function Navigation() {
  const [navigation, setNavigation] = useState<AppNavigation>([]);

  const buildNavItem = (
    category: Category | Subcategory
  ): NavigationItem => ({
    label: category.title,
    url: category.title.replaceAll(" ", "-").toLowerCase(),
  });

  const setupData = async () => {
    try {
      const categories = await useFetchCategories({});

      const navigation: AppNavigation = [];

      for await (const category of categories) {
        const navItem: NavigationItem = buildNavItem(category);

        const urlSearchParams = new URLSearchParams({
          category: category.title,
        });

        const subCategories = await useFetchSubcategories({ urlSearchParams });

        if (subCategories && subCategories.length) {
          navItem.children = subCategories.map(buildNavItem);
        }

        navigation.push(navItem);
      }

      setNavigation(navigation);
    } catch (error) {}
  };

  useEffect(() => {
    setupData().catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {navigation && navigation.length > 0 ? (
        <nav className={classes.navigation}>
          {navigation.map((item, index) => (
            <DropDown
              typeProperty="mouseover"
              key={index}
              btnCustomSettingth={{
                color: { dark: true },
                roundess: Roundness.sharp,
                size: Size.M,
                type: Type.text,
              }}
              lable={
                <NavLink href={{ endpoint: `category/${item.url}` }}>
                  {item.label}
                </NavLink>
              }
            >
              {item.children &&
                item.children.length > 0 &&
                item.children.map((subItem, index) => (
                  <DropDown.Item key={index}>
                    <LinkCustom.SiteLinkCustom
                      href={{
                        endpoint: `/category/${item.url}/${subItem.url}`,
                      }}
                      styleSettings={{
                        type: LinkCustom.Type.text,
                        color: { dark: true },
                        roundess: LinkCustom.Roundness.sharp,
                        size: LinkCustom.Size.M,
                      }}
                    >
                      {subItem.label}
                    </LinkCustom.SiteLinkCustom>
                  </DropDown.Item>
                ))}
            </DropDown>
          ))}
        </nav>
      ) : (
        ""
      )}
    </div>
  );
}
