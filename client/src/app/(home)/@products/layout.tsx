import dynamic from "next/dynamic";
import { FunctionComponent, ReactNode } from "react";
import ProductsGridHeaderSkeleton from "./skeleton/ProductsGridHeaderSkeleton";
import Loading from "./loading";

interface LayoutProductsProps {
	children: ReactNode;
}

const ProductGridHeaderDynamic = dynamic(
	() => import("./components/ProductGridHeader"),
	{ ssr: false, loading: () => <ProductsGridHeaderSkeleton /> },
);

const LayoutProducts: FunctionComponent<LayoutProductsProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className="container">
				<ProductGridHeaderDynamic />
				{children}
			</div>
		</section>
	);
};

export default LayoutProducts;
