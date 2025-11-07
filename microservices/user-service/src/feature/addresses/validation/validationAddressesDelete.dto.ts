import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, Validate } from "class-validator";
import { IsNumberOrArray } from "src/feature/customers/validation/validationDeleteCustomers.dto";

export class ValidationAddressesDeleteBodyDTO {
	// @Transform(({ value }) => {
	// 	if (Array.isArray(value)) return value.map(Number);
	// 	return Number(value);
	// })
	// @Validate(IsNumberOrArray)
	@IsInt()
	@IsNotEmpty()
	addressesId: number;
}
