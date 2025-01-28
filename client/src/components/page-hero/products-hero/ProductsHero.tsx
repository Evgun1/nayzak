'use client';

import classes from './ProductsHero.module.scss';

import { FC, useEffect, useState } from 'react';
import Loader from '@/components/elements/loader/Loader';
import { useProductsReducer } from '@/hooks/useProductsReducer';
import { appProductsGet } from '@/utils/http/products';
import { useSearchParams } from 'next/navigation';
import ProductPreview from '@/components/elements/product-preview/ProductPreview';
import { ProductItem } from '@/types/product.types';
import PopupLoading from '@/components/popup-loading/PopupLoading';

const ProductsHero = () => {
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState<boolean>(true);

	const { state, loadMoreProducts, initData } = useProductsReducer();

	const btnClickHandler = () => {
		loadMoreProducts(state.products.length);
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
		urlSearchParams.set('limit', '8');
		initData(appProductsGet, { searchParams: urlSearchParams });
	}, [searchParams, initData]);

	useEffect(() => {
		setLoading(false);
	}, [state.products]);

	if (loading) {
		return <PopupLoading />;
	}

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

export default ProductsHero;
