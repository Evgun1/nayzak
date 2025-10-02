import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional } from "class-validator";

export class ValidationGetReviewsQueryDTO {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	productsId?: number;
}
