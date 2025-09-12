"use client";

import classes from "./Wishlist.module.scss";
import useFetchProductsById from "@/hooks/useFetchProductByID";
import { useAppSelector } from "@/redux/redux";

import WishlistPreview from "./WishlistPreview";
import { useEffect, useState } from "react";
import { ProductPreviewItem } from "@/components/product-preview/ProductPreview.types";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import Spinner from "@/components/loading/Spinner";

export default function Wishlist() {
	const [products, setProducts] = useState<ProductPreviewItem[]>([]);
	const [loading, setLoading] = useState(true);
	const wishlist = useAppSelector((state) => state.wishlist.productsArray);
	const productsById = useFetchProductsById(wishlist);

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const products = await Promise.all(
					productsById.map(async (product) => {
						const blur = await getPlaceholderImage(
							product.Media[0].src,
						);

						const newItem: ProductPreviewItem = {
							...product,
							Media: {
								...product.Media[0],
								blurImage: blur.placeholder,
							},
						};

						return newItem;
					}),
				);
				setProducts(products);
			} finally {
				setLoading(false);
			}
		})();
	}, [productsById]);

	return (
		<div className={classes.wishlist}>
			{loading ? (
				<div className={classes["wishlist__spinner--wrap"]}>
					<Spinner className={classes["wishlist__spinner"]} />
				</div>
			) : products.length < 0 && productsById.length < 0 ? (
				<div className={classes["wishlist__message"]}>
					Wishlist is empty
				</div>
			) : (
				products.map((product, index) => (
					<WishlistPreview
						product={product}
						key={index}
					/>
				))
			)}
		</div>
	);
}
