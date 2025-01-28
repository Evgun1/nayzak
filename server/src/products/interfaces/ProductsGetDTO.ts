import { $Enums } from '@prisma/client';

export interface ProductsGetDTO {
	id: number;
	title: string;
	description: string;
	price: number;
	discount: number;
	status: $Enums.ProductsStatus;
	categoriesId: number;
	subcategoriesId: number;
	// brandsId: number;
	mediaId: number;
}
