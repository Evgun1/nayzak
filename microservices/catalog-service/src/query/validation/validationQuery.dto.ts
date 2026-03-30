import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export class ValidationQuery {
	@IsOptional()
	@IsString()
	search?: string;
	@IsOptional()
	@IsString()
	searchBy?: string;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Transform(({ value }) => Number(value))
	page?: number;

	@IsOptional()
	@IsString()
	filter?: string;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	limit?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Transform(({ value }) => Number(value))
	offset?: number;

	@IsOptional()
	@Transform(({ value }) => value?.toUpperCase())
	@IsEnum(["ASC", "DESC"], {
		message: "sort must be either asc or desc",
	})
	@IsString()
	sort?: "ASC" | "DESC";

	@IsOptional()
	@IsString()
	sortBy?: string;
}

@ArgsType()
export class ValidationQueryArgs {
	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	search?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	searchBy?: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Transform(({ value }) => Number(value))
	page?: number;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	filter?: string;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	limit?: number;

	@Field(() => Int, { nullable: true })
	@IsOptional()
	@IsInt()
	@Transform(({ value }) => Number(value))
	offset?: number;

	@Field()
	@IsOptional()
	@Transform(({ value }) => value?.toUpperCase())
	@IsEnum(["ASC", "DESC"], {
		message: "sort must be either asc or desc",
	})
	@IsString()
	sort?: "ASC" | "DESC";

	@Field()
	@IsOptional()
	@IsString()
	sortBy?: string;
}
