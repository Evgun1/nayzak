'use client';

import Toolbar from './Toolbar';

import classes from './ProductsGrid.module.scss';
import { useProductsReducer } from '@/hooks/useProductsReducer';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { appProductsGet } from '@/utils/http/products';
import dynamic from 'next/dynamic';
import ProductsLoader from './products-loader/ProductsLoader';

const DynamicProductsLoader = dynamic(
	() => import('./products-loader/ProductsLoader'),
	{ loading: () => <span>Loading...</span>, ssr: false }
);

export default function ProductsGrid() {
	const { state, initData } = useProductsReducer();
	const params = useParams();

	const [loader, setLoader] = useState<boolean>(true);
	const slug = params.slug as string[];

	const searchParams = useSearchParams();

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());

		initData(appProductsGet, { params: slug, searchParams: urlSearchParams });
	}, [slug, initData, searchParams]);

	return (
		<div className={classes['products--grid']}>
			<Toolbar totalCount={state.totalCount} />
			<ProductsLoader products={state.products} totalCount={state.totalCount} />

			{/* <DynamicProductsLoader
				products={state.products}
				totalCount={state.totalCount}
			/> */}
		</div>
	);
}
