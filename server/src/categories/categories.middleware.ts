import getReqBody from '../tools/getReqBody';
import { CategoryGetDTO } from './categories.type';
import prismaClient from '../prismaClient';
import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { MainMiddleware } from '../utils/middleware/main.middleware';

class CategoriesMiddleware {
	private mainMiddleware: MainMiddleware;

	constructor() {
		this.mainMiddleware = new MainMiddleware();
	}

	public checkAdmin = () => this.mainMiddleware.checkAdmin;

	async create(c: Context, next: Next) {
		const body = (await getReqBody(c)) as CategoryGetDTO;

		const category = await prismaClient.categories.findFirst({
			where: { title: body.title },
		});

		if (category)
			throw new HTTPException(409, { message: 'Title already exists' });
	}
}

export default new CategoriesMiddleware();
