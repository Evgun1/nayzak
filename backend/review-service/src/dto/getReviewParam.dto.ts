import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class GetReviewParamDTO {
	@IsNotEmpty()
	@Type(() => String)
	@IsString()
	id: string;
}
