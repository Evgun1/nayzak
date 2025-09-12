export interface ReviewItem {
	rating: number;
	text: string;
	createdAt: string;
	customersId: number;
	fullName?: string;
}
export interface ReviewItemPost {
	rating: number;
	text: string;
	customersId: number;
	productsId: number;
}
