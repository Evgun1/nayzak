import { Controller } from "@nestjs/common";
import { OrdersStatus } from "@prisma/client";

export class OrderDTO {
	id: number;
	createdAt: Date;
	status: OrdersStatus;
    productsId:number;
	price: number;

	constructor(params: OrderDTO) {
		for (const key in params) {
			if (!Object.keys(this).includes(key)) continue;
			this[key] = params[key];
		}
	}
}
