import ProductList from "@/app/components/productsList/productList";

import classes from "./Products.module.scss";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { FilterProvider } from "./FilterCtx";
import { fetchProducts } from "@/app/components/utils/fetchProducts";
import {
  fetchReviews,
  fetchReviewsProduct,
} from "@/app/components/utils/fetchReviews";

export default async function Products(props: PageProps) {

  return (
    <FilterProvider >
      <div className={`container ${classes.wrapper}`}>
        <Sidebar props={props} />
        <div className={classes.wrapper__grid}>
          <Toolbar />
          <ProductList page={{ shop: true }} />
        </div>
      </div>
    </FilterProvider>
  );
}
