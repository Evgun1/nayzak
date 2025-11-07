import { $Enums } from "@prisma/client";

export interface IProductCache {
	id: number;
	title: string;
	price: number;
	createdAt: Date | string;
	description: string;
	discount: number;
	Categories: { id: number; title: string };
	Subcategories: { id: number; title: string };
	Media: { src: string; name: string }[];
	status: $Enums.ProductsStatus;
	rating: { avg: number; count: number };
}
