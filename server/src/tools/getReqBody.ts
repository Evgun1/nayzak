import { Context } from 'hono';

const getReqBody = async <T>(c: Context): Promise<T | undefined> => {
	const contentTypeStrategy = new Map()
		.set('application/json', c.req.json)
		.set('application/x-www-from-urlencoded', c.req.parseBody)
		.set('multipart/form-data', c.req.parseBody);

	for (const [key, value] of contentTypeStrategy.entries()) {
		if (c.req.header('Content-Type')?.includes(key)) {
			return await value.bind(c.req)();
		}
	}
};
export default getReqBody;
