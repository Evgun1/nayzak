'use client';

import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import ProductPreviewDefault from './ProductsPreviewDefault';
import { ProductItem } from '@/types/product.types';
import { appReviewsGet } from '@/utils/http/reviews';
import { ProductPreviewTypes } from './ProductPreview.types';
import ProductPreviewList from './ProductPreviewList';
import { appMediaOneGet } from '@/utils/http/media';
import { ReviewItem } from '@/types/reviews.types';
import { MediaItem } from '@/types/media.types';

type ProductPreviewProps = {
	children: ReactNode;
	product: ProductItem;
	rating?: boolean;
	style?: string;
	stylePrice?: string;
};

function ProductPreviewComponent(props: ProductPreviewProps) {
	const { children, product, rating, style, stylePrice } = props;

	const [reviews, setReviews] = useState<ReviewItem[]>([]);
	const [media, setMedia] = useState<MediaItem>();

	const productTitle = product.title.replaceAll(' ', '_');
	const href = `/product/${productTitle}`;

	useEffect(() => {
		appReviewsGet(product.id).then((data) => setReviews(data));
		appMediaOneGet(product.id).then((data) => setMedia(data));
	}, [product.id]);

	const src = media?.src ? media.src : 'https://placehold.co/652x889';

	return (
		<>
			{React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) {
					return child;
				}
				const currentChildren = child as ReactElement<ProductPreviewTypes>;
				return React.cloneElement(currentChildren, {
					href,
					rating,
					reviewsArray: reviews,
					src,
					style,
					stylePrice,
					product: product,
				});
			})}
		</>
	);
}

const ProductPreviewT = Object.assign(ProductPreviewComponent, {
	Default: (props: any) => <ProductPreviewDefault {...props} />,
	List: (props: any) => <ProductPreviewList {...props} />,
});

export default ProductPreviewT;
