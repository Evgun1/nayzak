export interface ProductItem {
	id: number;
	title: string;
	description: string;
	discount: number;
	price: number;
	mainPrice: number;
	createdAt: string;
	updatedAt: string;
	status: string;
	categoriesId: number;
	subcategoriesId: number;
	mediaId: number;

	amount?: number;
}

export interface AllPriceItem {
	price: number;
	discount: number;
	mainPrice: number;
}
