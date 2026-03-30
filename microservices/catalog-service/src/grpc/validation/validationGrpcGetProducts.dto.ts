import { IsNumber } from "class-validator";

export class ValidationGrpcGetProductsDTO {
	@IsNumber({}, { each: true })
	productIds: number[];
}
