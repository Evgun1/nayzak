import { IsInt, IsString, Max, Min, MinLength } from "class-validator";

export class ValidationAddressesUploadBodyDTO {
	@IsString({ message: "City must be a string" })
	@MinLength(5, { message: "City less than five words" })
	city: string;

	@IsString({ message: "Street must be a string" })
	@MinLength(5, { message: "City less than five words" })
	street: string;

	@IsInt({ message: "The value must be a positive number" })
	@Max(6, { message: "Postal Code less than six words" })
	@Min(1, { message: "The value must be a positive number" })
	postalCode: number;
}
