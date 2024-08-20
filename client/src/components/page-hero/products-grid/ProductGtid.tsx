"use client";

import { PageProps } from "../../../../.next/types/app/layout";

import { ButtonClassList } from "@/types/buttonClassList";
import classes from "./ProductGrid.module.scss";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import { FilterProvider } from "../../page-shop/products/FilterCtx";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import DropDown from "@/lib/ui/drop-down/DropDown";
import LinkCustom from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import { useEffect, useState } from "react";
import { Category } from "@/types/categories";
import { Subcategory } from "@/types/subcategories";
import { useFetchSubcategories } from "@/hooks/useFetchSubcategories";
import ProductsHero from "../products-hero/ProductsHero";

export default function ProductGrid(props: PageProps) {
  const urlSearchParams = new URLSearchParams(props.searchParams);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    useFetchCategories({ urlSearchParams }).then((data) => {
      setCategories(data);
    });
    useFetchSubcategories({ urlSearchParams }).then((data) => {
      setSubcategories(data);
    });
  }, [urlSearchParams]);

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
            icon: IconsIdList.CHEVRONE,
            roundess: Roundness.sharp,
          }}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <DropDown.Item key={index}>
                <LinkCustom.SiteLinkCustom
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
                  searchParams={props.searchParams}
                >
                  {category.title}
                </LinkCustom.SiteLinkCustom>
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
            icon: IconsIdList.CHEVRONE,
            roundess: Roundness.sharp,
          }}
        >
          {subcategories &&
            subcategories.length > 0 &&
            subcategories.map((subcategory, index) => (
              <DropDown.Item key={index}>
                <LinkCustom.SiteLinkCustom
                  styleSettings={{
                    size: LinkCustom.Size.S,
                    type: LinkCustom.Type.text,
                    color: { dark: true },
                    roundess: LinkCustom.Roundness.sharp,
                  }}
                  href={{
                    queryParams: { subcategory: subcategory.title },
                  }}
                  searchParams={props.searchParams}
                >
                  {subcategory.title}
                </LinkCustom.SiteLinkCustom>
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
