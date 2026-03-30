import { ArgsType, Field } from "@nestjs/graphql";
import { Transform, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ValidationCategoryParamParam {
	@IsNotEmpty()
	param: any;
}
@ArgsType()
export class ValidationCategoryParamArgs {
	@Field()
	param: string;
}
