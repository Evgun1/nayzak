import { ArgsType, Field, Int } from "@nestjs/graphql";
import { PartialType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional } from "class-validator";
import {
	ValidationQuery,
	ValidationQueryArgs,
} from "src/query/validation/validationQuery.dto";

export class ValidationProductsAllQueryDTO extends ValidationQuery {
	@IsOptional()
	@IsArray()
	@Transform(({ value }) => (value as string).split(",").map((item) => +item))
	@IsNumber({}, { each: true })
	productsId?: number[];

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	categoryId?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	subcategoryId?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	minPrice?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	maxPrice?: number;
}

@ArgsType()
export class ValidationProductsAllArgs extends ValidationQueryArgs {
	@Field(() => [Int], { nullable: true })
	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	productsId?: number[];

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	categoryId?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	subcategoryId?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	minPrice?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	maxPrice?: number;
}
