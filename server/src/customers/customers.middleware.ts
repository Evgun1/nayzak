import { Context, Next } from 'hono';
import PersonalDataFormDTO from './interfaces/PersonalDataForm';
import { HTTPException } from 'hono/http-exception';
import { createAdaptorServer } from '@hono/node-server';
import credentialsService from '../credentials/credentials.service';
import prismaClient from '../prismaClient';

class CustomersMiddleware {
	async create(c: Context, next: Next) {
		const { firstName, lastName, phone, credentialsId } =
			(await c.req.parseBody()) as PersonalDataFormDTO;

		if (!credentialsId) return;
		const customers = await prismaClient.customers.findFirst({
			where: { credentialsId: parseInt(credentialsId) },
		});

		if (customers)
			throw new HTTPException(409, {
				message: "This user already has data filled in. Use: 'Put'",
			});

		await next();
	}

	async change(c: Context, next: Next) {
		const { firstName, lastName, id, credentialsId } =
			(await c.req.parseBody()) as PersonalDataFormDTO;

		if (!id)
			throw new HTTPException(409, {
				message: 'There is no customer id',
			});

		const customer = await prismaClient.customers.findFirst({
			where: { id: parseInt(id) },
		});

		if (!customer)
			throw new HTTPException(409, {
				message: "This user's data is not filled in to be updated..",
			});

		await next();
	}

	async init(c: Context, next: Next) {
		const token = c.req.header('authorization');
		if (!token)
			throw new HTTPException(401, { message: 'User is unauthorized' });

		await next();
	}
}

export default new CustomersMiddleware();
