import { ClientApiService } from "./../../client-api/clientApi.service";
import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomerBaseDTO } from "./dto/customerBase.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { QueryService } from "src/query/query.service";
import { QueryDTO } from "src/query/dto/query.dto";
import { Prisma } from "@prisma/client";
import { UploadCustomerDTO } from "./dto/uploadCustomer.dto";
import { ChangeCustomerDTO } from "./dto/changeCustomer.dto";
import { UserJwtDTO } from "src/dto/userJwt.dto";
import { GetCustomerDTO } from "./dto/getCustomer.dto";
import { DeleteCustomersDTO } from "./dto/deleteCustomers.dto";
import { IUserJwt } from "src/interface/credentialsJwt.interface";

@Injectable()
export class CustomersService {
	private readonly clearCacheToClient: Promise<any>;
	constructor(
		private readonly prisma: PrismaService,
		private readonly queryService: QueryService,
		private readonly jwtService: JwtService,
		private readonly clientApiService: ClientApiService,
	) {
		this.clearCacheToClient = this.clientApiService.clearCache("customers");
	}

	async getAll(query: QueryDTO) {
		const { orderBy, skip, take, where } = this.queryService.getQuery(
			"Customers",
			query,
		);

		const queryOptions: Prisma.CustomersFindManyArgs = {
			where,
			take,
			orderBy,
			skip,
		};

		const customers = await this.prisma.customers.findMany(queryOptions);
		const totalCount = await this.prisma.customers.count();
		return { customers, totalCount };
	}

	async getOne(param: GetCustomerDTO) {
		const customer = await this.prisma.customers.findFirst({
			where: { id: param.parma },
		});
		return customer;
	}

	async uploadCustomer({
		firstName,
		lastName,
		credentialsId,
	}: UploadCustomerDTO) {
		const customers = this.prisma.customers.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				credentialsId: credentialsId,
			},
		});

		await this.clearCacheToClient;
		return customers;
	}

	async change(body: ChangeCustomerDTO, credential: IUserJwt) {
		const { firstName, id, lastName, phone } = body;

		try {
			const customer = await this.prisma.customers.update({
				where: { id: id, credentialsId: credential.id },
				data: {
					firstName,
					lastName,
					phone,
				},
			});

			await this.clearCacheToClient;
			return customer;
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}

	async init(credential: IUserJwt) {
		const { id } = credential;
		const customer = await this.prisma.customers.findFirst({
			where: { credentialsId: id },
		});
		return customer;
	}

	async delete(body: DeleteCustomersDTO) {
		try {
			const sqlQuery = await this.prisma.sqlQuery("Customers");
			const sqlSelect = sqlQuery.select;
			sqlSelect.fields();
			sqlSelect.where({ id: body.customersId });
			const selectQuery = await sqlSelect.query();

			const sqlDelete = sqlQuery.delete;
			sqlDelete.where({ id: body.customersId });
			await sqlDelete.query();

			await this.clearCacheToClient;
			return selectQuery;
		} catch (error) {}
	}
}
