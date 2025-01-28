import { Context, Next } from 'hono';
import { CredentialsChangeGetDTO, UserGetDTO } from './interface/UserGetInput';
import getReqBody from '../tools/getReqBody';
import credentialsService from './credentials.service';
import { QueryParameterTypes } from '../utils/service/service.type';

class CredentialsController {
	async getAll(c: Context) {
		const queryParams = c.req.query() as QueryParameterTypes;

		const { credentials, count } = await credentialsService.getAll(queryParams);

		c.res.headers.append('X-Total-Count', count.toString());
		return c.json(credentials);
	}

	async getOne(c: Context) {
		const { credentialsId } = c.req.param() as { credentialsId: string };

		const result = await credentialsService.getOne(+credentialsId);

		return c.json(result);
	}

	async registration(c: Context) {
		// const token = c.req.header("authorization");
		const data = (await getReqBody(c)) as UserGetDTO;

		try {
			const credentials = await credentialsService.registration(data);
			return c.json(credentials);
		} catch (e) {
			console.log(e);
		}
	}

	async login(c: Context) {
		const data = (await getReqBody(c)) as UserGetDTO;
		const userToken = await credentialsService.login(data);

		return c.json(userToken);
	}

	async active(c: Context) {
		const { link } = c.req.param();
		await credentialsService.activate(link);

		return c.redirect(`${process.env.CLIENT_URL}`);
	}

	async check(c: Context) {
		const authorization = c.req.header('Authorization');

		const newToken = await credentialsService.init(authorization as string);

		return c.json(newToken);
	}

	async changePassword(c: Context, next: Next) {
		const token = c.req.header('authorization');

		await credentialsService.changePassword(token as string);

		return c.json({ message: 'Password successfully changed' });
	}

	async change(c: Context) {
		const data = (await getReqBody(c)) as CredentialsChangeGetDTO;
		const { credentialsId } = c.req.param() as { credentialsId: string };

		const credentials = await credentialsService.change(data, credentialsId);

		return c.json(credentials);
	}

	async delete(c: Context) {
		const credentialId = (await getReqBody(c)) as number | number[];

		const id = await credentialsService.delete(credentialId);

		return c.json(id);
	}
}

export default new CredentialsController();
