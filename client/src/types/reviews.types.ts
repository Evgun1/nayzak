export interface ReviewItem {
	id: number;
	rating: number;
	text: string;
	customersId: number;
	productsId: number;
	createdAt: string;

	customerName?: string;
}
export interface ReviewItemPost {
	rating: number;
	text: string;
	customersId: number;
	productsId: number;

}
