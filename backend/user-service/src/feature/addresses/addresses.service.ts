import { ClientApiService } from "src/client-api/clientApi.service";
import { QueryService } from "src/query/query.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { QueryDTO } from "src/query/dto/query.dto";
import { UploadAddressesDTO } from "./dto/uploadAddresses.dto";
import { UpdateAddressesDTO } from "./dto/updateAddresses.dto";
import { DeleteAddressesDTO } from "./dto/deleteAddresses.dto";
import { IUserJwt } from "src/interface/credentialsJwt.interface";

@Injectable()
export class AddressesService {
	private readonly clearCacheToClient: Promise<any>;

	constructor(
		private readonly prisma: PrismaService,
		private readonly queryService: QueryService,
		private readonly clientApiService: ClientApiService,
	) {
		this.clearCacheToClient = this.clientApiService.clearCache("addresses");
	}

	async init(user: IUserJwt) {
		const addresses = await this.prisma.addresses.findMany({
			where: { customersId: user.customerId },
		});
		const addressesCount = await this.prisma.addresses.count({
			where: { customersId: user.customerId },
		});

		return { addresses, addressesCount };
	}

	async getOne(id: number) {
		const option: Prisma.AddressesFindUniqueArgs = {
			where: { id: id },
		};
		const address = await this.prisma.addresses.findUnique(option);
		return address;
	}

	async upload(body: UploadAddressesDTO, user: IUserJwt) {
		console.log(user);

		const addresses = await this.prisma.addresses.create({
			data: {
				city: body.city,
				postalCode: body.postalCode,
				street: body.street,
				customersId: user.customerId,
			},
		});

		await this.clearCacheToClient;
		return addresses;
	}

	async update(body: UpdateAddressesDTO, user: IUserJwt) {
		const { city, id, postalCode, street } = body;
		const { customerId } = user;

		try {
			const addresses = await this.prisma.addresses.update({
				where: { id, customersId: customerId },
				data: { city, postalCode, street },
			});

			return addresses;
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}
	async delete(body: DeleteAddressesDTO, user: IUserJwt) {
		try {
			const sqlQuery = await this.prisma.sqlQuery("Addresses");
			const sqlSelect = sqlQuery.select;
			const sqlDelete = sqlQuery.delete;

			sqlSelect.fields();
			sqlSelect.where({
				id: body.addressesId,
				customersId: user.customerId,
			});
			const selectQuery = await sqlSelect.query();

			sqlDelete.where({
				id: body.addressesId,
				customersId: user.customerId,
			});
			sqlDelete.query();

			await this.clearCacheToClient;
			return selectQuery;
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}
}
