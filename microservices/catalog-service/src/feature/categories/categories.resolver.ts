import { Res } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Response } from "express";
import { CategoriesService } from "./categories.service";
import {
	ValidationCategoryParamArgs,
	ValidationCategoryParamParam,
} from "./validation/validationCategoryByParam.dto";
import { CategoriesModel } from "./categories.model";
import { ValidationCategoriesAllArgs } from "./validation/validationCategoriesAll";

@Resolver()
export class CategoriesResolver {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Query(() => [CategoriesModel])
	async getCategoriesAll(
		@Args() args: ValidationCategoriesAllArgs,
		@Res({ passthrough: true }) res: Response,
	) {
		const { categories, categoriesCount } =
			await this.categoriesService.getCategoriesAll();

		res.setHeader("X-Total-Count", categoriesCount.toString());
		return categories;
	}

	@Query(() => CategoriesModel)
	async getCategory(@Args() args: ValidationCategoryParamArgs) {
		const categories = await this.categoriesService.getCategory(args);

		return categories;
	}
}
