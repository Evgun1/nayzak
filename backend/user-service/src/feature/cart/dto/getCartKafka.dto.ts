import { Transform } from "class-transformer";
import { IsArray, IsInt, IsNumber } from "class-validator";

export class GetCartKafkaDTO {
	@IsArray()
	@IsNumber({}, { each: true })
	cartId: number[];

	@IsInt()
	customerId: number;
}
