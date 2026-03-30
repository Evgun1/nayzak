import { IsNotEmpty, IsNumber } from "class-validator";

export class ValidationGrpcGetProductReviewsParamDTO {
	@IsNumber({}, { each: true })
	productId: number;
}
