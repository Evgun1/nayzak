import { Context, Next } from 'hono';
import { decode } from 'hono/jwt';
import { HTTPException } from 'hono/http-exception';
import credentialsService from '../credentials/credentials.service';

class ProductMiddleware {
	async delete(c: Context, next: Next) {
		const token = c.req.header('Authorization');

		if (!token) throw new HTTPException(401, { message: 'Not authorization' });
		const credentials = await credentialsService.findCredentials({
			token,
		});

		if (credentials.role !== 'admin') {
			throw new HTTPException(403, {
				message: 'The client cannot delete the data',
			});
		}
		await next();
	}

	async create(c: Context, next: Next) {
		const token = c.req.header('Authorization');

		if (!token) throw new HTTPException(401, { message: 'Not authorization' });
		const credentials = await credentialsService.findCredentials({
			token,
		});

		if (credentials.role !== 'admin') {
			throw new HTTPException(403, {
				message: 'The client cannot create the data',
			});
		}
		await next();
	}
}

export default new ProductMiddleware();
