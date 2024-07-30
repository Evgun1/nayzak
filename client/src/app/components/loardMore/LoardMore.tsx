// "use client";

// import { ProductTypes } from "@/app/components/types/products";
// import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
// import { fetchProducts } from "@/app/components/utils/fetchProducts";
// import Link from "next/link";
// import { ButtonClassList } from "@/app/components/types/buttonClassList";
// import { TextClassList } from "@/app/components/types/textClassList";

// import classes from "../../../productsList/productList.module.scss";
// import ProductList from "@/app/components/productsList/productList";
// import page from "@/app/shop/page";
// import { PageProps } from "../../../../.next/types/app/layout";
// import { FilterContext } from "../elemets/shop/products/FilterCtx";

// type LoadMorePropd = {
//   // initialProductsCount: number;
//   // searchParams: URLSearchParams;
// };

// // type RESPONSEdATA = {
// //   products: ProductTypes[];
// //   productCounts: number;
// // };

// const LoardMore: FC<LoadMorePropd> = (
//   {
//     // initialProductsCount,
//     // searchParams,
//   }
// ) => {
//   const { productsArray, setPoductsArray, count, setCount } =
//     useContext(FilterContext);
//   const limit = 8;

//   // searchParams.append("limit", "2");

//   const updateData = async (searchParams: URLSearchParams) => {
//     const { products } = await fetchProducts({
//       urlSearchParams: searchParams,
//     });

//     setPoductsArray(productsArray.concat(products));
//     setCount(count + products.length);
//   };

//   const btnClickHandler: MouseEventHandler = () => {
//     const urlSearchParams = new URLSearchParams({
//       limit: limit.toString(),
//       offset: count.toString(),
//     });

//     updateData(urlSearchParams);
//   };

//   return (
//     <>
//       <ProductList productsArray={productsArray} page={{ home: true }} />
//       {productsPerPage < 100 && (
//         <button onClick={btnClickHandler}>Loard More</button>
//       )}
//     </>
//   );
// };

// export default LoardMore;
