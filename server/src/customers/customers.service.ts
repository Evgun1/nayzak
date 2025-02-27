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
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();

	private supportedMimeTypes: Map<boolean, (data: string) => object> =
		new Map();

	private setupMimeTypes() {
		this.supportedMimeTypes.set(false, (data: string) => ({
			id: data,
		}));
		this.supportedMimeTypes.set(true, (data: string) => ({
			title: data.replaceAll('_', ' '),
		}));
	}

	constructor() {
		this.setupMimeTypes();
	}

	async getAll(queryParams: QueryParameterTypes) {
		const where = this.queryParams.filter<Prisma.CustomersWhereInput>(
			queryParams,
			Prisma.CustomersScalarFieldEnum
		);
		const take = this.queryParams.limit(queryParams);
		const skip = this.queryParams.offset(queryParams);
		const orderBy =
			this.queryParams.orderBy<Prisma.CustomersOrderByWithRelationInput>(
				queryParams,
				Prisma.CustomersScalarFieldEnum
			);

		const queryOptions: Prisma.CustomersFindManyArgs = {
			where,
			take,
			orderBy,
			skip,
		};

		const customers = await prismaClient.customers.findMany(queryOptions);
		const totalCount = await prismaClient.customers.count();
		return { customers, totalCount };
	}

	async getOne(customerId: string) {
		const customer = await prismaClient.customers.findFirst({
			where: { id: +customerId },
		});

		return customer;
	}

	async create({ firstName, lastName, credentialsId }: CustomerFormDTO) {
		return prismaClient.customers.create({
			data: {
				firstName: firstName as string,
				lastName: lastName as string,
				phone: 0,
				credentialsId: parseInt(credentialsId as string),
			},
		});
	}

	async change(data: CustomerFormDTO) {
		const { firstName, id, lastName, phone } = data;
		console.log(data);

		const customer = await prismaClient.customers.update({
			where: { id: parseInt(id?.toString()) },
			data: {
				firstName: firstName,
				lastName: lastName,
				phone: phone ? parseInt(phone.toString()) : 0,
			},
		});

		console.log(customer);

		return customer;
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
