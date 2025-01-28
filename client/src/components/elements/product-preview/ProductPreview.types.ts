import { ProductItem } from '@/types/product.types';
import { ReviewItem } from '@/types/reviews.types';

export type ProductPreviewTypes = {
	product: ProductItem;
	src: string;
	reviewsArray: ReviewItem[];
	href: string;
	rating?: boolean;
	style?: string;
	stylePrice?: string;
};
