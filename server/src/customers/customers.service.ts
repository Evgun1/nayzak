import { decode } from 'hono/jwt';
import prismaClient from '../prismaClient';
import CustomerFormDTO from './interfaces/PersonalDataForm';
import credentialsService from '../credentials/credentials.service';
import { Prisma } from '@prisma/client';
import { UserDto } from '../credentials/credentials.dto';
import { MainService } from '../utils/service/main.service';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';
import { QueryParameterTypes } from '../utils/service/service.type';

class CustomersOptions {
	whereCustomerOne(id: number) {
		const where: Prisma.CustomersWhereUniqueInput = { id };
		return where;
	}

	whereCustomerMany(ids: number[]) {
		const where: Prisma.CustomersWhereInput = {};
		where.id = { in: ids };

		return where;
	}
}

class CustomerServer {
	private customerOptions = new CustomersOptions();
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	async getAll(queryParams: QueryParameterTypes) {
		const take = this.queryParams.limit(queryParams);
		const skip = this.queryParams.offset(queryParams);
		const orderBy =
			this.queryParams.orderBy<Prisma.CustomersOrderByWithRelationInput>(
				queryParams,
				Prisma.CustomersScalarFieldEnum
			);

		const queryOptions: Prisma.CustomersFindManyArgs = {
			take,
			orderBy,
			skip,
		};

		const customers = await prismaClient.customers.findMany(queryOptions);
		const totalCount = await prismaClient.customers.count();
		return { customers, totalCount };
	}

	async getOne(customerId: string) {
		return prismaClient.customers.findFirst({ where: { id: +customerId } });
	}

	async create({ firstName, lastName, credentialsID }: CustomerFormDTO) {
		return prismaClient.customers.create({
			data: {
				firstName: firstName as string,
				lastName: lastName as string,
				phone: 0,
				credentialsId: parseInt(credentialsID as string),
			},
		});
	}

	async change({ firstName, lastName, id, phone }: CustomerFormDTO) {
		return prismaClient.customers.update({
			where: { id: parseInt(id as string) },
			data: {
				firstName: firstName,
				lastName: lastName,
				phone: +phone,
			},
		});
	}

	async init(token: string) {
		const credentials = await credentialsService.findCredentials({ token });

		const customer = await prismaClient.customers.findFirst({
			where: { credentialsId: credentials.id },
		});

		return customer;
	}

	async delete<T>(customerId: number | number[]) {
		return await this.mainService.delete('Customers', customerId);
	}
}

export default new CustomerServer();
