import { PartialType } from "@nestjs/swagger";
import {
	ValidationProductsByParamsArgs,
	ValidationProductsByParamsParamDTO,
} from "./validationProductsByParams";
import { ArgsType } from "@nestjs/graphql";

export class ValidationMinMaxPriceParamDTO extends PartialType(
	ValidationProductsByParamsParamDTO,
) {}

@ArgsType()
export class ValidationMinMaxPriceArgs extends PartialType(
	ValidationProductsByParamsArgs,
) {}
