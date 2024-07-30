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

export default async function ProductGrid(props: PageProps) {
  const urlSearchParams = new URLSearchParams(props.searchParams);

  const categoriesData = await fetchCategories({});
  const subcategoriesData = await fetchSubcategories({ urlSearchParams });

  return (
    <div className={`container ${classes.wrapper}`}>
      <div className={classes.wrapper__title}>
        <div className={ButtonClassList.BUTTON_XLARGE}>You’re browsing</div>
        <DropDownT
          btnCustomSettingth={{
            size: Size.XL,
            type: Type.underline,
            svg_right: IconsIdList.CHEVRONE,
          }}
          objectArray={categoriesData}
          titleBtn="Category"
          urlQueryName="category"
          deleteUrlQueryName="subcategory"
          searchParams={props.searchParams}
        />
        <div className={ButtonClassList.BUTTON_XLARGE}>In</div>
        <DropDownT
          btnCustomSettingth={{
            size: Size.XL,
            type: Type.underline,
            svg_right: IconsIdList.CHEVRONE,
          }}
          objectArray={subcategoriesData}
          titleBtn="Subcategory"
          urlQueryName="subcategory"
          searchParams={urlSearchParams}
        />
      </div>
      <FilterProvider>
        <ProductsHero />
      </FilterProvider>

      {/* <LoardMore initialProductsCount={products.length} /> */}
    </div>
  );
}
