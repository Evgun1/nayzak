// "use client";
// import classes from "./ProductsShop.module.scss";

// import { FC, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import ProductList from "@/components/elemets/products-list/ProductList";
// import { FilterContext } from "../products/FilterCtx";
// import { useFetchProductsAll } from "@/hooks/useFetchProducts";
// import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";
// import { updateProducts } from "@/lib/redux/store/product/action";

// const ProductsShop: FC = () => {
//   const [style, setStyle] = useState<any>();
//   const [isHydrated, setIsHydrated] = useState(false);

//   const { count, productsArray, totalCount } = useAppSelector(
//     (state) => state.products
//   );
//   const dispatch = useAppDispatch();
//   const searchParams = useSearchParams();

//   const limit = 12;

//   useEffect(() => {
//     const classListType = searchParams.get("list_type");
//     classListType
//       ? setStyle(classes[classListType])
//       : setStyle(classes["five_grid"]);
//   }, [searchParams]);

//   const UpdateData = async (searchParams: URLSearchParams) => {
//     const { products } = await useFetchProductsAll({
//       urlSearchParams: searchParams,
//     });

//     dispatch(updateProducts(products, products.length));
//   };

//   const btnClickHandler = () => {
//     const urlSearchParams = new URLSearchParams(searchParams.toString());
//     urlSearchParams.append("limit", limit.toString());
//     urlSearchParams.append("offset", count.toString());
//     UpdateData(urlSearchParams);
//   };

//   if (!isHydrated) return;

//   return (
//     <ProductList
//       rating
//       productsArray={productsArray}
//       style={style}
//       stylePreview={classes["custom-preview"]}
//       totalCount={totalCount}
//       count={count}
//       btnClickHandler={btnClickHandler}
//     />
//   );
// };

// export default ProductsShop;
