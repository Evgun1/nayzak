// "use server";

// import classes from "./ProductsGrid.module.scss";
// import { appProductsByParamsGet, appProductsGet } from "@/lib/api/products";
// import { url } from "inspector";
// import LoaderProducts from "@/components/loader/products/LoaderProducts";
// import { FC } from "react";
// import getIdCategoryOrSubcategory from "@/utils/getIdCategoryOrSubcategory";
// import Toolbar from "../toolbar/Toolbar";

// type ProductsGrid = {
// 	searchParams: URLSearchParams;
// 	params: { id: number }[];
// };
// const ProductsGrid: FC<ProductsGrid> = async ({ params, searchParams }) => {
// 	const { productCounts } = await appProductsGet({
// 		searchParams,
// 		params: params.map((val) => val.id),
// 	});

// 	return (
// 		<div className={classes["products-grid"]}>
// 			<Toolbar />
// 			<LoaderProducts
// 				searchParams={searchParams}
// 				params={params.map((val) => val.id)}
// 			/>
// 		</div>
// 	);
// };

// export default ProductsGrid;
