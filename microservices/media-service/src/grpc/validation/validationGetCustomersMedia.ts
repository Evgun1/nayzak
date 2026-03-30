import { IsArray, IsNumber } from "class-validator";

export class ValidationGetCustomersOne {
	@IsNumber()
	customerId: number;
}
export class ValidationGetCustomersAll {
	@IsNumber({}, { each: true })
	@IsArray()
	customerIds: number[];
}
