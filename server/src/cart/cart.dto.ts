export interface CartModel {
	productID: number;
	id: number;
	amount: number;
}

export class CartDTO {
	productID;
	id;
	amount;
	constructor({ amount, productID, id }: CartModel) {
		this.id = id;
		this.productID = productID;
		this.amount = amount;
	}
}
