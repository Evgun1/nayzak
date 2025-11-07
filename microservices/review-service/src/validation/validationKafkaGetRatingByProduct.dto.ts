import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class ValidationKafkaGetRatingByProductPayloadDTO {
	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true })
	ids: number[];
}
