export interface IOrder {
	id: number;
	productsId: number;
	createdAt: Date;
	status: string;
	price: number;
}
