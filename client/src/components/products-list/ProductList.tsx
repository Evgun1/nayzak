import { FC, useEffect, useState } from "react";

import classes from "./productList.module.scss";
import "./style.scss";
import ProductPreviewDefault from "../product-preview/product-preview-default/ProductsPreviewDefault";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { ProductBase } from "@/types/product/productBase";
import { ProductPreviewItem } from "../product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/utils/getPlaceholderImage";

type ProductListProps = {
	productsArray: ProductBase[];
	rating?: boolean;
	style: any;
	stylePrice?: string;
	stylePreview?: string;
	totalCount: number;
	count: number;
	btnClickHandler?: () => void;
};

const ProductList: FC<ProductListProps> = ({
	productsArray,
	rating,
	style,
	stylePrice,
	stylePreview,
	totalCount,
	count,
	btnClickHandler,
}) => {
	const [products, setProducts] = useState<ProductPreviewItem[]>();
	useEffect(() => {
		(async () => {
			const products = await Promise.all(
				productsArray.map(async (product) => {
					const placeholder = await getPlaceholderImage(
						product.media.src,
					);

					const obj: ProductPreviewItem = {
						...product,
						media: {
							src: product.media.name,
							name: product.media.name,
							blurImage: placeholder.placeholder,
						},
					};
					return obj;
				}),
			);

			setProducts(products);
		})();
	}, [productsArray]);

	return (
		<>
			<ul className={`${style} ${classes.grid}`}>
				{products &&
					products.length > 0 &&
					products.map((product, index) => (
						<li key={index}>
							<ProductPreviewDefault
								showRating={rating}
								product={product}
								className={stylePreview}
								stylePrice={stylePrice}
							/>
						</li>
					))}
			</ul>
			{totalCount > count && (
				<ButtonCustom
					onClick={btnClickHandler}
					styleSettings={{
						fill: "SOLID",
						size: "MEDIUM",
						type: "DEFAULT",
						color: "DARK",
						roundness: "SHARP",
					}}
				>
					Load More
				</ButtonCustom>
			)}
		</>
	);
};

export default ProductList;
