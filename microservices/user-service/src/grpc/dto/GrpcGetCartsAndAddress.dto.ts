export class GrpcCartDTO {
	productId: number;
	amount: number;

	constructor(param: GrpcCartDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}

export class GrpcAddressDTO {
	city: string;
	street: string;
	postalCode: number;

	constructor(param: GrpcAddressDTO) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}

export class GrpcGetCartsAndAddress {
	carts: GrpcCartDTO[];
	address: GrpcAddressDTO;

	constructor(param: GrpcGetCartsAndAddress) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
