import { IsArray, IsNumber } from "class-validator";

export class ValidationGetSubcategoriesOne {
	@IsNumber()
	subcategoryId: number;
}
export class ValidationGetSubcategoriesAll {
	@IsNumber({}, { each: true })
	@IsArray()
	subcategoryIds: number[];
}
