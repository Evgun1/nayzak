import { IsNotEmpty, IsNumber } from "class-validator";

export class ValidationGrpcGetAvgRatingParamDTO {
	@IsNumber({}, { each: true })
	productIds: number[];
}
