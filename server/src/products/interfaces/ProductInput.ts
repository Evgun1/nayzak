import { $Enums } from '@prisma/client';

export interface ProductInput {
	id: number;
	title: string;
	description: string;
	price: number;
	discount: number;
	status: $Enums.ProductsStatus;
	categoriesId: number;
	subcategoriesId: number;
	mediaId: number;
}
