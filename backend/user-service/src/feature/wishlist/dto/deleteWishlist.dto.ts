import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteWishlistDTO {
	@IsNotEmpty()
	@IsNumber()
	id: number;
}
