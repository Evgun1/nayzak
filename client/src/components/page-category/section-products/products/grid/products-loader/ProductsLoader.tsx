'use client';
import classes from './ProductsLoader.module.scss';
import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Loader from '@/components/elements/loader/Loader';
import { useProductsReducer } from '@/hooks/useProductsReducer';
import ProductPreview from '@/components/elements/product-preview/ProductPreview';
import { appProductsGet } from '@/utils/http/products';
import ProductPreviewDefaultClient from '@/components/elements/product-preview/product-preview-default/ProductsPreviewDefaultClient';
import ProductPreviewList from '@/components/elements/product-preview/product-preview-list/ProductPreviewList';

type ProductsLoaderProps = {
	setState: React.Dispatch<React.SetStateAction<number>>;
};

const ProductsLoader: FC<ProductsLoaderProps> = ({ setState }) => {
	const searchParams = useSearchParams();
	const { state, initData, loadMoreProducts } =
		useProductsReducer(appProductsGet);
	const params = useParams();

	const getListType = searchParams.get('list_type');

	const listTypeLimits = new Map([
		['default', '15'],
		[null, '15'],
		['five_grid', '15'],
		['four_grid', '12'],
		['three_grid', '9'],
		['two_grid', '8'],
		['list', '8'],
	]);

	const getLimit = listTypeLimits.get(getListType) as string;

	const btnClickHandler = () => {
		loadMoreProducts(state.products.length, +getLimit,  params.slug);
	};

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(searchParams.toString());
		urlSearchParams.set('limit', getLimit);

		initData({
			params: params.slug as string[],
			searchParams: urlSearchParams,
		});
	}, [initData, searchParams]);

	useEffect(() => {
		setState(state.totalCount);
	}, [state]);

	return (
		<Loader
			style={
				!classes[`${getListType}`]
					? classes['five_grid']
					: classes[`${getListType}`]
			}
			totalCount={state.totalCount}
			count={state.products?.length}
			btnClickHandler={btnClickHandler}
		>
			{state.products.map((product, i) => (
				<li key={i}>
					{getListType !== 'list' ? (
						<ProductPreviewDefaultClient
							product={product}
							style={classes['custom-preview']}
							rating
						/>
					) : (
						<ProductPreviewList product={product} rating />
					)}
				</li>
			))}
		</Loader>
	);
};

export default ProductsLoader;
