import { ArgsType } from "@nestjs/graphql";
import { ValidationQueryArgs } from "src/query/validation/validationQuery.dto";

@ArgsType()
export class ValidationCategoriesAllArgs extends ValidationQueryArgs {}
