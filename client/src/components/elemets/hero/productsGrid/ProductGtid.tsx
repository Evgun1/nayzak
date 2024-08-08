"use client";

import { PageProps } from "../../../../../.next/types/app/layout";

import { ButtonClassList } from "@/components/types/buttonClassList";
import classes from "./ProductGrid.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import { FilterProvider } from "../../shop/products/FilterCtx";
import ProductsHero from "@/components/products-hero/ProductsHero";
import { fetchSubcategories } from "@/components/utils/fetchSubcategories";
import { fetchCategories } from "@/components/utils/fetchCategories";
import DropDown from "@/components/drop-down/DropDown";
import LinkCustom from "@/components/custom-elemets/link-custom/LinkCustom";
import {
  Roundness,
  Size,
  Type,
} from "@/components/custom-elemets/button-custom/ButtonType";

export default async function ProductGrid(props: PageProps) {
  const urlSearchParams = new URLSearchParams(props.searchParams);

  const categoriesData = await fetchCategories({});
  const subcategoriesData = await fetchSubcategories({ urlSearchParams });

  return (
    <div className={`container ${classes.wrapper}`}>
      <div className={classes.wrapper__title}>
        <div className={ButtonClassList.BUTTON_XLARGE}>You’re browsing</div>
        <DropDown
          title="Category"
          btnCustomSettingth={{
            color: { dark: true },

            size: Size.XL,
            type: Type.underline,
            icon: IconsIdList.CHEVRONE,
            roundess: Roundness.sharp,
          }}
        >
          <DropDown.Item>
            <LinkCustom.SiteLinkCustom
              href={{ deleteQuertParams: "category" }}
              searchParams={props.searchParams}
              styleSettings={{
                size: LinkCustom.Size.S,
                type: LinkCustom.Type.text,
                color: { dark: true },
                roundess: LinkCustom.Roundness.sharp,
              }}
            >
              Show all
            </LinkCustom.SiteLinkCustom>
          </DropDown.Item>
          {categoriesData &&
            categoriesData.length > 0 &&
            categoriesData.map((category, index) => (
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
          title="Subcategory"
          btnCustomSettingth={{
            color: { dark: true },
            size: Size.XL,
            type: Type.underline,
            icon: IconsIdList.CHEVRONE,
            roundess: Roundness.sharp,
          }}
        >
          <DropDown.Item>
            <LinkCustom.SiteLinkCustom
              href={{ deleteQuertParams: "subcategory" }}
              searchParams={props.searchParams}
              styleSettings={{
                size: LinkCustom.Size.S,
                type: LinkCustom.Type.text,
                color: { dark: true },
                roundess: LinkCustom.Roundness.sharp,
              }}
            >
              Show all
            </LinkCustom.SiteLinkCustom>
          </DropDown.Item>
          {subcategoriesData &&
            subcategoriesData.length > 0 &&
            subcategoriesData.map((subcategory, index) => (
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
