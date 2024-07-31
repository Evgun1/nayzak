"use client";

import { PageProps } from "../../../../../../.next/types/app/layout";

import { ButtonClassList } from "@/app/components/types/buttonClassList";
import classes from "./ProductGrid.module.scss";
import { fetchProducts } from "@/app/components/utils/fetchProducts";
import { Size, Type } from "@/app/components/button-custom/ButtonCustom";
import IconsIdList from "@/app/components/icons/IconsIdList";
import { FilterProvider } from "../../shop/products/FilterCtx";
import ProductsHero from "@/app/components/ProductsHero/ProductsHero";
import { fetchSubcategories } from "@/app/components/utils/fetchSubcategories";
import { fetchCategories } from "@/app/components/utils/fetchCategories";
import ProductsShop from "@/app/components/ProductsShop/ProductsShop";
import DropDownT from "@/app/components/dropDown/DropDownT";
import DropDown from "@/app/components/dropDown/DropDown";
import LinkItem from "@/app/components/LinkItem/LinkItem";

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
            size: Size.XL,
            type: Type.underline,
            icon_right: IconsIdList.CHEVRONE,
          }}
        >
          <DropDown.Item>
            <LinkItem
              linkName={"All"}
              deleteUrlQueryName="category"
              searchParams={props.searchParams}
            />
          </DropDown.Item>
          {categoriesData &&
            categoriesData.length > 0 &&
            categoriesData.map((category, index) => (
              <DropDown.Item key={index}>
                <LinkItem
                  linkName={category.title}
                  urlQueryName="category"
                  deleteUrlQueryName="subcategory"
                  searchParams={props.searchParams}
                />
              </DropDown.Item>
            ))}
        </DropDown>
        <div className={ButtonClassList.BUTTON_XLARGE}>In</div>
        <DropDown
          title="Subcategory"
          btnCustomSettingth={{
            size: Size.XL,
            type: Type.underline,
            icon_right: IconsIdList.CHEVRONE,
          }}
        >
          <DropDown.Item>
            <LinkItem
              linkName={"All"}
              deleteUrlQueryName="subcategory"
              searchParams={props.searchParams}
            />
          </DropDown.Item>
          {subcategoriesData &&
            subcategoriesData.length > 0 &&
            subcategoriesData.map((subcategory, index) => (
              <DropDown.Item key={index}>
                <LinkItem
                  linkName={subcategory.title}
                  urlQueryName="subcategory"
                  searchParams={props.searchParams}
                />
              </DropDown.Item>
            ))}
        </DropDown>
      </div>
      <FilterProvider>
        <ProductsHero />
      </FilterProvider>

      {/* <LoardMore initialProductsCount={products.length} /> */}
    </div>
  );
}
