import { IProduct } from "@/types/product/product.interface";
import { ProductBase } from "@/types/product/productBase";

export interface ProductPreviewItem
	extends Pick<
		IProduct,
		| "id"
		| "discount"
		| "price"
		| "title"
		| "rating"
		| "createdAt"
		| "description"
	> {
	Media: { src: string; name: string; blurImage: string };
}

export type ProductPreviewProps = {
	className?: string;
	product: ProductPreviewItem;
	showIcon?: boolean;
	// reviewsArray: ReviewItem[];
	showRating?: boolean;
	stylePrice?: string;
};
