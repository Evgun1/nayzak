export interface CartProductData {
	id: string;
	productID: string;
	amount: string;
	[key: string]: any;
}

export interface CartGetDTO {
	product: CartProductData;
	customerID: number;
}
