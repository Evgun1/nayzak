import ProductList from "@/app/components/ProductsList/ProductList";

import classes from "./Products.module.scss";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { FilterProvider } from "./FilterCtx";
import ProductsShop from "@/app/components/ProductsShop/ProductsShop";

export default async function Products(props: PageProps) {
  return (
    <FilterProvider>
      <div className={`container ${classes.wrapper}`}>
        <Sidebar props={props} />
        <div className={classes.wrapper__grid}>
          <Toolbar />
          <ProductsShop />
        </div>
      </div>
    </FilterProvider>
  );
}
