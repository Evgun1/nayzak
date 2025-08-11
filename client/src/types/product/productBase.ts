import { exportTraceState } from "next/dist/trace";
import { IProduct } from "./product.interface";

// export interface ProductItem {
// 	id: number;
// 	title: string;
// 	description?: string;
// 	discount: number;
// 	price: number;
// 	createdAt?: Date;
// 	updatedAt?: Date;
// 	status?: string;
// 	categoriesId?: number;
// 	subcategoriesId?: number;
// 	mediaId?: number;
// 	rating?: number;

// 	src?: string;

// 	amount?: number;
// }

export interface ProductBase
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
	Media: { src: string; name: string }[];
}

// export interface AllPriceItem {
// 	price: number;
// 	discount: number;
// 	mainPrice: number;
// }
