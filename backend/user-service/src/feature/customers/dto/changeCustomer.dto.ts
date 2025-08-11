import { IsNotEmpty, IsNumber } from "class-validator";
import { CustomerBaseDTO } from "./customerBase.dto";
import { PickType } from "@nestjs/mapped-types";
import { UploadCustomerDTO } from "./uploadCustomer.dto";

export class ChangeCustomerDTO extends PickType(UploadCustomerDTO, [
	"firstName",
	"lastName",
] as const) {
	@IsNotEmpty()
	@IsNumber()
	id: number;
}
