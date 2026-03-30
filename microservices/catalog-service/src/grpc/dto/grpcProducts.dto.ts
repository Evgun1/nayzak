export class GrpcProductsDTO {
	productId: number;
	price: number;
	discount: number;

	constructor(param: GrpcProductsDTO) {
		for (const key in param) {
			if (Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
