import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { ValidationAttributeByParamQueryDTO } from "src/feature/attribute-definitions/validation/validationAttributeByParam.dto";
import {
	ValidationQuery,
	ValidationQueryArgs,
} from "src/query/validation/validationQuery.dto";

class ValidationProductsByParamsParamDTO {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	categoryId: number;

	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	subcategoryId: number;
}

class ValidationProductsByParamsQueryDTO extends IntersectionType(
	ValidationAttributeByParamQueryDTO,
	ValidationQuery,
) {}

export {
	ValidationProductsByParamsParamDTO,
	ValidationProductsByParamsQueryDTO,
};

@ArgsType()
export class ValidationProductsByParamsArgs extends ValidationQueryArgs {
	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	categoryId: number;

	@Field(() => Int)
	@IsNotEmpty()
	@IsInt()
	subcategoryId: number;
}
