import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	Max,
	Min,
} from "class-validator";
import { PickType } from "@nestjs/mapped-types";
import { ValidationUploadCustomerBodyDTO } from "./validationUploadCustomer.dto";

export class ValidationChangeCustomerBodyDTO extends PickType(
	ValidationUploadCustomerBodyDTO,
	["firstName", "lastName"] as const,
) {
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsInt()
	@Min(9, { message: "Phone less than nine characters" })
	@Max(20, { message: "Postal code is more than twenty characters" })
	phone?: number;
}
