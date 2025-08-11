import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class GetAddressesOneParam {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	id: number;
}
