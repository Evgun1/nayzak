import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class ValidationOrderKafkaBodyDTO {
	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true })
	cartId: number[];

	@IsNotEmpty()
	@IsInt()
	addressesId: number;
}
