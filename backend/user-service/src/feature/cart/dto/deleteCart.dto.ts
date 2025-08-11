import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCartDTO {
	@IsNotEmpty()
	@IsNumber()
	id: number;
}
