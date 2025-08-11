import { IsArray, IsIn, IsInt, IsNumber } from "class-validator";

export class ValidationOrderUploadBodyDTO {
	@IsArray()
	@IsNumber({}, { each: true })
	cartId: number[];
	@IsInt()
	customersId: number;
	@IsInt()
	addressesId: number;
}
