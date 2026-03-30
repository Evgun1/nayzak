import { IsArray, IsNumber } from "class-validator";

export class ValidationGetProductsOne {
	@IsNumber()
	productId: number;
}
export class ValidationGetProductsAll {
	@IsNumber({}, { each: true })
	@IsArray()
	productIds: number[];
}
