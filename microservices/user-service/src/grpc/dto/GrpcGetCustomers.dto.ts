export class GrpcGetCustomersItem {
	customerId: number;
	firstName: string;
	lastName: string;
	image: Buffer;

	constructor(param: GrpcGetCustomersItem) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}

export class GrpcGetCustomers {
	customers: GrpcGetCustomersItem[];

	constructor(param: GrpcGetCustomers) {
		for (const key in param) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = param[key];
		}
	}
}
