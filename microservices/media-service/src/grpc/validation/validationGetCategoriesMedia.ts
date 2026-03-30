import { IsArray, IsNumber } from "class-validator";

export class ValidationGetCategoriesOne {
	@IsNumber()
	categoryId: number;
}
export class ValidationGetCategoriesAll {
	@IsNumber({}, { each: true })
	@IsArray()
	categoryIds: number[];
}
