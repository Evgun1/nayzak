import { $Enums, OrdersStatus } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from "class-validator";

export class ValidationOrderUploadBodyDTO {
	@ValidateIf((dto) => Object.values(OrdersStatus).includes(dto))
	@IsString()
	status?: OrdersStatus;

	@Min(1)
	@IsNotEmpty()
	@IsInt()
	amount: number;

	@IsInt()
	@Min(0)
	price: number;

	@IsNotEmpty()
	@IsInt()
	customersId: number;
	@IsNotEmpty()
	@IsInt()
	productsId: number;
	@IsNotEmpty()
	@IsInt()
	addressesId: number;
}
