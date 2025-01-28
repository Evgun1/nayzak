'use client';

import { useEffect, useState } from 'react';
import { ProductItem } from '@/types/product.types';
import { useSearchParams } from 'next/navigation';
import { appProductsGet } from '@/utils/http/products';

type ProductsArrayData = {
	id?: number;
	amount?: number;
	productID: number;
};

const useFetchProductsById = (
	productsArray: ProductsArrayData[],
	returnAmount: boolean = true
) => {
	const searchParams = useSearchParams();
	const [products, setProducts] = useState<ProductItem[]>([]);

	const fetchProduct = async () => {
		if (!productsArray || !productsArray.length) {
			setProducts([]);
			return;
		}

		const productsID: number[] = productsArray.map(
			(element) => element.productID
		);

		const urlSearchParams = new URLSearchParams(searchParams.toString());

		urlSearchParams.set(`id`, `${productsID}`);

		const productsData = await appProductsGet({
			searchParams: urlSearchParams,
		});

		if (!returnAmount) {
			setProducts(productsData.products);
			return;
		}

		const output: ProductItem[] = productsData.products.map((item) => {
			const index = productsArray.findIndex(
				(element) => element.productID === item.id
			);

			const newItem = { ...item };

			if (index !== -1) {
				newItem.amount = productsArray[index].amount;
			}

			return newItem;
		});

		setProducts(output);
	};

	useEffect(() => {
		fetchProduct();
	}, [productsArray]);

	return products;
};

export default useFetchProductsById;
