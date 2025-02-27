'use client';

import classes from './ProductsLoader.module.scss';

import { FC, useEffect, useState } from 'react';
import Loader from '@/components/elements/loader/Loader';
import { useProductsReducer } from '@/hooks/useProductsReducer';
import { appProductsGet } from '@/utils/http/products';
import { useSearchParams } from 'next/navigation';
import ProductPreview from '@/components/elements/product-preview/ProductPreview';

const ProductsLoader = () => {
	const searchParams = useSearchParams();

	const { state, loadMoreProducts, initData } =
		useProductsReducer(appProductsGet);

	const btnClickHandler = () => {
		loadMoreProducts(state.products.length);
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
		urlSearchParams.set('limit', '8');
		initData({ searchParams: urlSearchParams });
	}, [searchParams, initData]);

	return (
		<Loader
			style={classes['grid-hero']}
			count={state.products.length}
			totalCount={state.totalCount}
			btnClickHandler={btnClickHandler}
		>
			{state.products.map((product, i) => (
				<li key={i} className={classes['grid-li']}>
					<ProductPreview product={product}>
						<ProductPreview.Default />
					</ProductPreview>
				</li>
			))}
		</Loader>
	);
};

export default ProductsLoader;
