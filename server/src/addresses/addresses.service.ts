import { number, string } from 'zod';
import prismaClient from '../prismaClient';
import { QueryParameterTypes } from '../utils/service/service.type';
import { MainService } from '../utils/service/main.service';
import { Addresses, Prisma } from '@prisma/client';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';
import { AddressInputDTO } from './addresses.types';
import { AddressesDTO } from './addresses.dto';

class AddressesOptions {
	getAll() {}
}

class AddressesService {
	private mainService = new MainService();
	private queryParams = new QueryParamHandler();
	private options = new AddressesOptions();

	async getAll(queryParams: QueryParameterTypes) {
		const take = this.queryParams.limit(queryParams);
		const skip = this.queryParams.offset(queryParams);
		const where = this.queryParams.filter<Prisma.AddressesWhereInput>(
			queryParams,
			Prisma.AddressesScalarFieldEnum
		);
		const orderBy =
			this.queryParams.orderBy<Prisma.AddressesOrderByWithRelationInput>(
				queryParams,
				Prisma.AddressesScalarFieldEnum
			);

		const option: Prisma.AddressesFindManyArgs = {
			take,
			skip,
			where,
			orderBy,
		};

		const addresses = await prismaClient.addresses.findMany(option);
		const addressesCount = await prismaClient.addresses.count({
			where: option.where,
		});

		return { addresses, addressesCount };
	}

	async create(inputData: AddressInputDTO) {
		const data: Record<string, any> = {};


		for (const key in inputData) {
			const typeKey = key as keyof AddressInputDTO;
			const typeValue = inputData[typeKey];

			if (!isNaN(Number(typeValue))) {
				data[typeKey] = parseInt(typeValue.toString());
				continue;
			}

			data[typeKey] = typeValue;
		}

		const address = await prismaClient.addresses.create({
			data: data as AddressInputDTO,
		});

		const addressesDTO = new AddressesDTO(address);

		return addressesDTO;
	}

	async update(inputData: AddressInputDTO) {
		const where: Prisma.AddressesWhereUniqueInput = { id: inputData.id };
		const data: Prisma.AddressesUpdateInput = inputData;

		const option: Prisma.AddressesUpdateArgs = {
			where,
			data,
		};

		const addresses = await prismaClient.addresses.update(option);
		const addressesDTO = new AddressesDTO(addresses);

		return addressesDTO;
	}

	async delete(addressesId: number | number[]) {
		return await this.mainService.delete<Prisma.AddressesScalarFieldEnum>(
			'Addresses',
			addressesId
		);
	}
}

export default new AddressesService();
