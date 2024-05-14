import ProductList from "@/app/components/productsList/productList";

import classes from "./Products.module.scss";
import ProductsList from "./ProductsList";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import { ProductTypes } from "@/app/components/types/products";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { FilterContext, FilterProvider } from "./FilterCtx";

export default async function Products(props: PageProps) {
  const res = await fetch(`http://localhost:3030/products`, {
    method: "GET",
    cache: "no-cache",
  });

  const urlSearchParams = new URLSearchParams(props.searchParams);

  const result = await res.json();
  const products = result.products;
  const productCounts = result.productCounts;

  return (
    <FilterProvider>
      <div className={`container ${classes.wrapper}`}>
        <Sidebar />
        <div className={classes.wrapper__grid}>
          <Toolbar counts={productCounts} />
          <ProductsList
            objectArray={products}
            urlSearchParams={urlSearchParams}
          />
        </div>
      </div>
    </FilterProvider>
  );
}
