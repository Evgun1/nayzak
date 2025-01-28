'use client';
import classes from './ProductsLoader.module.scss';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Loader from '@/components/elements/loader/Loader';
import { ProductItem } from '@/types/product.types';
import { useProductsReducer } from '@/hooks/useProductsReducer';
import ProductPreview from '@/components/elements/product-preview/ProductPreview';
import { headers } from 'next/headers';
import { useAppDispatch } from '@/lib/redux/redux';
import { popupActions } from '@/lib/redux/store/popup/popup';
import PopupLoading from '@/components/popup-loading/PopupLoading';

type ProductsLoaderProps = {
	products: ProductItem[];
	totalCount: number;
};

const ProductsLoader: FC<ProductsLoaderProps> = ({ products, totalCount }) => {
	const dispatch = useAppDispatch();
	const [currentProducts, setCurrentProducts] = useState<ProductItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const searchParams = useSearchParams();
	const urlSearchParams = new URLSearchParams(searchParams.toString());
	const { loadMoreProducts } = useProductsReducer();

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

	urlSearchParams.set('limit', getLimit);

	const btnClickHandler = () => {
		loadMoreProducts(products.length, +getLimit);
	};

	return (
		<Loader
			style={
				!classes[`${getListType}`]
					? classes['five_grid']
					: classes[`${getListType}`]
			}
			totalCount={totalCount}
			count={products?.length}
			btnClickHandler={btnClickHandler}
		>
			{products.map((product, i) => (
				<li key={i}>
					{getListType !== 'list' ? (
						<ProductPreview
							product={product}
							style={classes['custom-preview']}
							rating
						>
							<ProductPreview.Default />
						</ProductPreview>
					) : (
						<ProductPreview product={product} rating>
							<ProductPreview.List />
						</ProductPreview>
					)}
				</li>
			))}
		</Loader>
	);
};

export default ProductsLoader;
