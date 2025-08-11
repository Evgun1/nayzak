// "use client";

// import classes from "./ProductsLoader.module.scss";

// import React, { ReactElement, ReactNode, useCallback, useEffect } from "react";
// import LoadMore from "@/components/load-more/LoadMore";
// import { useLoadMoreReducer } from "@/hooks/useProductsReducer";
// import { appProductsGet } from "@/lib/api/products";
// import { useSearchParams } from "next/navigation";
// import ProductPreviewList from "@/components/product-preview/product-preview-list/ProductPreviewList";
// import ProductPreviewDefault from "../../product-preview/product-preview-default/ProductsPreviewDefault";

// export interface ListType {
// 	five_grid: string;
// 	four_grid: string;
// 	three_grid: string;
// 	two_grid: string;
// 	list: string;
// }

// const ProductsLoaderClient = ({
// 	children,
// 	totalCount,
// 	listType = "five_grid",
// 	params,
// 	className,
// 	rating = false,
// }: {
// 	rating?: boolean;
// 	listType?: keyof ListType;
// 	children?: ReactNode;
// 	totalCount?: number;
// 	className?: string;
// 	params?: string | string[];
// }) => {
// 	const searchParams = useSearchParams();
// 	const childrenArr = children as ReactElement[];

// 	const {
// 		state,
// 		loadMore: loadMore,
// 		initData,
// 	} = useLoadMoreReducer(appProductsGet);

// 	const listTypeLimits = new Map([
// 		["default", "15"],
// 		[null, "15"],
// 		["five_grid", "15"],
// 		["four_grid", "12"],
// 		["three_grid", "9"],
// 		["two_grid", "8"],
// 		["list", "8"],
// 	]);
// 	const newSearchParams = searchParams as Record<string, any> | null;

// 	const getListType = newSearchParams?.get("list_type");

// 	const getLimit = getListType
// 		? (listTypeLimits.get(getListType) as string)
// 		: (listTypeLimits.get(listType) as string);

// 	const btnClickHandler = () => {
// 		loadMore(
// 			children ? state.fullData.length + parseInt(getLimit) : +getLimit,
// 			+getLimit,
// 			params,
// 		);
// 	};

// 	useEffect(() => {
// 		const urlSearchParams = new URLSearchParams(searchParams?.toString());

// 		if (children) {
// 			urlSearchParams.set("limit", "0");
// 			initData({ searchParams: urlSearchParams });
// 			return;
// 		}
// 		urlSearchParams.set("limit", getLimit.toString());
// 		initData({ searchParams: urlSearchParams });
// 	}, [children, initData, getLimit, searchParams]);

// 	return (
// 		<LoadMore
// 			className={`${classes["grid"]} ${
// 				listType
// 					? classes[listType]
// 					: getListType
// 					? classes[getListType]
// 					: ""
// 			}`}
// 			totalCount={totalCount ? totalCount : state.totalCount}
// 			btnClickHandler={btnClickHandler}
// 		>
// 			{childrenArr &&
// 				childrenArr.map((child, i) => (
// 					<li
// 						key={i}
// 						className={classes["grid-li"]}
// 					>
// 						{child}
// 					</li>
// 				))}

// 			{state.fullData.map((product, i) => (
// 				<li
// 					key={i}
// 					className={classes["grid-li"]}
// 				>
// 					{getListType === "list" ? (
// 						<ProductPreviewList
// 							product={{
// 								createdAt: product.createdAt,
// 								discount: product.discount,
// 								id: product.id,
// 								media: product.media,
// 							}}
// 							showRating={rating}
// 						/>
// 					) : (
// 						<ProductPreviewDefault
// 							className={className}
// 							showRating={rating}
// 							product={product}
// 						/>
// 					)}
// 				</li>
// 			))}
// 		</LoadMore>
// 	);
// };

// export default ProductsLoaderClient;
