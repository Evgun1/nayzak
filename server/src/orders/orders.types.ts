import { Prisma, Products } from '@prisma/client';
import { ModelArg, ModelArgs, ModelKey } from '@prisma/client/runtime/library';

export interface OrdersUploadItem {
	addressesId: number;
	cartId: Array<number> | number;
	credentialsId: number;
	customersId: number;
}

export interface OrdersProductsItem extends Products {
	amount: number;
}
