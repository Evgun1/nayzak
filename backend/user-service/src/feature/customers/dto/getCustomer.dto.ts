import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumberString } from "class-validator";

export class GetCustomerDTO {
	@IsNotEmpty()
	@IsInt()
	@Type(() => Number)
	parma: number;
}
