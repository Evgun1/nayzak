import { IProduct } from "./product.interface";

export interface ProductDetails
	extends Pick<
		IProduct,
		| "id"
		| "amount"
		| "discount"
		| "price"
		| "Media"
		| "rating"
		| "status"
		| "title"
		| "createdAt"
		| "description"
	> {
	Categories: { id: number; title: string };
	Subcategories: { id: number; title: string };
}
