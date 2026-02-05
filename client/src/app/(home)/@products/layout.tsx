"use server";
import dynamic from "next/dynamic";
import { FunctionComponent, ReactNode, Suspense } from "react";
import ProductsGridHeaderSkeleton from "./skeleton/ProductsGridHeaderSkeleton";
import Loading from "./loading";
import ProductGridHeader from "./components/ProductGridHeader";
import { SearchParams } from "next/dist/server/request/search-params";

interface LayoutProductsProps {
	children: ReactNode;
}

// const ProductGridHeaderDynamic = dynamic(
// 	() => import("./components/ProductGridHeader"),
// 	{ ssr: false, loading: () => <ProductsGridHeaderSkeleton /> },
// );

const LayoutProducts: FunctionComponent<LayoutProductsProps> = async (
	props,
) => {
	const { children } = props;
	return (
		<section>
			<div className="container">
				<Suspense fallback={<ProductsGridHeaderSkeleton />}>
					<ProductGridHeader />
				</Suspense>
				{children}
			</div>
		</section>
	);
};

export default LayoutProducts;
