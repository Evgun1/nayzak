import classes from "./Products.module.scss";
import Toolbar from "./grid/Toolbar";
import { FilterProvider } from "./filter/FilterCtx";
import Sidebar from "./filter/Sidebar";
import ProductsGrid from "./grid/ProductsGrid";

export default async function Products() {
  return (
    <FilterProvider>
      <div className={`container ${classes.wrapper}`}>
        <Sidebar />
        {/* <div className={classes.wrapper__grid}>
          <Toolbar />
          <ProductsShop />
        </div> */}

        <ProductsGrid />
      </div>
    </FilterProvider>
  );
}
