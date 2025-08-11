"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { appProductsGet } from "@/lib/api/products";
import { ProductBase } from "@/types/product/productBase";

type ProductsArrayData = {
	id?: number;
	amount?: number;
	productsId: number;
};

export interface ProductsById extends ProductBase {
	amount?: number;
}

const useFetchProductsById = (
	productsArray: ProductsArrayData[],
	returnAmount: boolean = true,
) => {
	const searchParams = useSearchParams();
	const [products, setProducts] = useState<ProductsById[]>([]);

	const fetchProduct = useCallback(async () => {
		if (!productsArray || !productsArray.length) {
			setProducts([]);
			return;
		}

		const productsId: number[] = productsArray.map(
			(element) => element.productsId,
		);

		const urlSearchParams = new URLSearchParams(searchParams?.toString());

		urlSearchParams.set(`productsId`, `${productsId}`);

		const productsFetch = await appProductsGet({
			searchParams: urlSearchParams,
		});

		const products = productsArray.map((data) => {
			const product = productsFetch.products.find(
				(product) => product.id === data.productsId,
			);

			if (product) {
				const obj: ProductsById = {
					amount: data.amount || 0,
					...product,
				};
				return obj;
			}
		});

		if (!returnAmount) {
			setProducts(productsFetch.products);

			return;
		}

		const output: ProductsById[] = productsFetch.products.map((item) => {
			const index = productsArray.findIndex(
				(element) => element.productsId === item.id,
			);

			const newItem: ProductsById = { ...item };
			if (index !== -1) {
				newItem.amount = productsArray[index].amount;
			}

			return newItem;
		});

		setProducts(output);
	}, [searchParams, productsArray, returnAmount]);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	return products;
};

export default useFetchProductsById;
