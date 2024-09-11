"use client";

import { PageProps } from "../../../../.next/types/app/layout";

import { ButtonClassList } from "@/types/buttonClassList";
import classes from "./ProductGrid.module.scss";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import { FilterProvider } from "../../page-shop/products/FilterCtx";
import DropDown from "@/lib/ui/drop-down/DropDown";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import { useCallback, useEffect, useState } from "react";
import { Category } from "@/types/categories";
import { Subcategory } from "@/types/subcategories";
import ProductsHero from "../products-hero/ProductsHero";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useFetchCategoriesall as useFetchCategoriesAll } from "@/hooks/useFetchCategories";
import { useFetchSubcategoryAll } from "@/hooks/useFetchSubcategories";

export default function ProductGrid(props: PageProps) {
  const searchParams = useSearchParams();

  const useFethcData = (searchParams: ReadonlyURLSearchParams) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    useEffect(() => {
      const useFetchHandler = async () => {
        const categories = await useFetchCategoriesAll(searchParams);
        setCategories(categories);

        const subcategories = await useFetchSubcategoryAll(searchParams);
        setSubcategories(subcategories);
      };

      useFetchHandler();
    }, [searchParams]);

    return { categories, subcategories };
  };

  // const useFetchData = async () => {
  //   const categories = await useFetchCategoriesAll(searchParams);
  //   setCategories(categories);

  //   const subcategories = await useFetchSubcategoryAll(searchParams);
  //   setSubcategories(subcategories);
  // };

  // useEffect(() => {
  //   useFetchData();
  // }, [searchParams]);

  return (
    <div className={`container ${classes.wrapper}`}>
      <div className={classes.wrapper__title}>
        <div className={ButtonClassList.BUTTON_XLARGE}>You’re browsing</div>
        <DropDown
          typeProperty="click"
          lable={"Category"}
          btnCustomSettingth={{
            color: { dark: true },

            size: Size.XL,
            type: Type.underline,
            icon: { right: IconsIdList.CHEVRONE },
            roundess: Roundness.sharp,
          }}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <DropDown.Item key={index}>
                <LinkCustom.SiteLink
                  styleSettings={{
                    size: LinkCustom.Size.S,
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                  }}
                  href={{
                    queryParams: { category: category.title },
                    deleteQuertParams: "subcategory",
                  }}
                >
                  {category.title}
                </LinkCustom.SiteLink>
              </DropDown.Item>
            ))}
        </DropDown>
        <div className={ButtonClassList.BUTTON_XLARGE}>In</div>
        <DropDown
          typeProperty="click"
          lable={"Subcategory"}
          btnCustomSettingth={{
            color: { dark: true },
            size: Size.XL,
            type: Type.underline,
            icon: { right: IconsIdList.CHEVRONE },
            roundess: Roundness.sharp,
          }}
        >
          {subcategories &&
            subcategories.length > 0 &&
            subcategories.map((subcategory, index) => (
              <DropDown.Item key={index}>
                <LinkCustom.SiteLink
                  styleSettings={{
                    size: LinkCustom.Size.S,
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                  }}
                  href={{
                    queryParams: { subcategory: subcategory.title },
                  }}
                >
                  {subcategory.title}
                </LinkCustom.SiteLink>
              </DropDown.Item>
            ))}
        </DropDown>
      </div>
      <FilterProvider>
        <ProductsHero />
      </FilterProvider>
    </div>
  );
}
