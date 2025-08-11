import { Context } from "hono";
import subcategoryService from "./subcategory.service";
import {
	SubcategoriesGeDTO,
	SubcategoriesGetParams,
	SubcategoriesGetQuery,
	SubcategoryByCategoryGetParams,
} from "./subcategories.type";
import getReqBody from "../tools/getReqBody";
import { QueryParameterTypes } from "../utils/service/service.type";
import clearCache from "../utils/clear-cache/ClearCache";

class SubcategoriesController {
	async getAll(c: Context) {
		const query = c.req.query() as QueryParameterTypes;

		delete query.id;

		const { subcategories, totalCount } =
			await subcategoryService.getAllSubcategories(query);

		c.res.headers.append("X-Total-Count", totalCount.toString());
		return c.json(subcategories);
	}

	async getOne(c: Context) {
		const inputData = c.req.param() as SubcategoriesGetParams;

		const subcategory = await subcategoryService.getOne(inputData);

		return c.json(subcategory);
	}

	async getSubcategoryByCategory(c: Context) {
		const inputData = c.req.param() as SubcategoryByCategoryGetParams;

		const { subcategories, totalCount } =
			await subcategoryService.getSubcategoryByCategory(inputData);

		c.res.headers.append("X-Total-Count", totalCount.toString());

		return c.json(subcategories);
	}

	async create(c: Context) {
		const body = (await getReqBody(c)) as SubcategoriesGeDTO;

		const subcategories = await subcategoryService.create(body);

		await clearCache("subcategories");
		return c.json(subcategories);
	}

	async delete(c: Context) {
		const subcategoriesId = (await getReqBody(c)) as number | number[];

		const id =
			await subcategoryService.deleteSubcategories(subcategoriesId);

		await clearCache("subcategories");
		return c.json(id);
	}
}

export default new SubcategoriesController();
