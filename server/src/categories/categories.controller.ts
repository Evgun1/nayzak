import { Context } from 'hono';
import categoriesService from './categories.service';
import getReqBody from '../tools/getReqBody';
import { CategoriesGetParam, CategoryGetDTO } from './categories.type';
import { QueryParameterTypes } from '../utils/service/service.type';

class CategoriesController {
	async getAll(c: Context) {
		const inputQuery = c.req.query() as QueryParameterTypes;

		const { categories, categoriesCounts } =
			await categoriesService.getAllCategories(inputQuery);

		c.res.headers.append('X-Total-Count', categoriesCounts.toString());
		return c.json(categories);
	}

	async getOne(c: Context) {
		const inputData = c.req.param() as CategoriesGetParam;
		const result = await categoriesService.getOne(inputData);

		return c.json(result);
	}

	async create(c: Context) {
		const body = (await getReqBody(c)) as CategoryGetDTO;
		const category = await categoriesService.create(body);

		return c.json(category);
	}

	async change(c: Context) {
		const params = c.req.param();
		const body = (await getReqBody(c)) as CategoryGetDTO;

		const categoryDTO = { ...params, ...body } as CategoriesGetParam &
			CategoryGetDTO;

		const category = await categoriesService.change(categoryDTO);

		return c.json(category);
	}
}

export default new CategoriesController();
