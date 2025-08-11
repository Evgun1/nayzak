import { PickType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty } from "class-validator";
import { UploadAddressesDTO } from "./uploadAddresses.dto";

export class UpdateAddressesDTO extends PickType(UploadAddressesDTO, [
	"city",
	"postalCode",
	"street",
] as const) {
	@IsNotEmpty()
	@IsInt()
	id: number;
}
