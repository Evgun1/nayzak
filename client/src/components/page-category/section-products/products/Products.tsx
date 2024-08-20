import classes from "./Products.module.scss";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import { FilterProvider } from "./FilterCtx";
import { PageProps } from "../../../../../.next/types/app/layout";
import ProductsShop from "../products-shop/ProductsShop";

export default async function Products(props: PageProps) {
  return (
    <FilterProvider>
      <div className={`container ${classes.wrapper}`}>
        <Sidebar props={props} />
        <div className={classes.wrapper__grid}>
          <Toolbar searchParams={props.searchParams} />
          <ProductsShop />
        </div>
      </div>
    </FilterProvider>
  );
}
