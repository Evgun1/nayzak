import { IsInt, IsNumber } from "class-validator";

export class ValidationGrpcGetCatsAndAddress {
	@IsInt()
	addressId: number;

	@IsNumber({}, { each: true })
	cartIds: number[];
}
