export interface IProduct {
	id: number;
	title: string;
	description: string;
	discount: number;
	price: number;
	createdAt: Date;
	updatedAt: Date;
	status: string;
	categoriesId?: number;
	subcategoriesId?: number;
	Media: { src: string; name: string }[];
	rating: { avg: number; count: number };

	amount?: number;
}
