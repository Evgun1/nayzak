export interface OrdersItem {
	id: number;
	amount: number;
	price: number;
	status: string;
	customersId: number;
	productsId: number;
	createdAt: number;
	addressesId: number;
}
