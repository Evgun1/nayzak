"use client";

import dynamic from "next/dynamic";
import { ButtonClassList } from "@/types/buttonClassList";
import classes from "./ProductGrid.module.scss";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import DropDown from "@/lib/ui/drop-down/DropDown";
import { LinkCustom } from "@/lib/ui/custom-elemets/link-custom/LinkCustom";
import {
  Roundness,
  Size,
  Type,
} from "@/lib/ui/custom-elemets/button-custom/ButtonType";
import { useEffect, useState } from "react";
import { Category } from "@/types/categories";
import { Subcategory } from "@/types/subcategories";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/utils/http/categories";
import { appSubcategoriesGet } from "@/utils/http/subcategories";
import { appProductsGet } from "@/utils/http/products";

const DynamicProductsHero = dynamic(
  () => import("../products-hero/ProductsHero"),
  { loading: () => <span>Loading...</span>, ssr: false }
);

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(searchParams.toString());

      const categories = await appCategoriesGet();
      setCategories(categories);

      const subcategories = await appSubcategoriesGet(urlSearchParams);
      setSubcategories(subcategories);

    })();
  }, [searchParams]);

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
                  searchParams={searchParams}
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
                  searchParams={searchParams}
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
      <DynamicProductsHero />
    </div>
  );
}
