import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class ValidationReviewsByProductParamsDTO {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	productsId: number;
}
