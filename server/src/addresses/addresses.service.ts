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

	async getOne(addressParams: string) {
		const addressData = this.supportedMimeTypes.get(
			isNaN(Number(addressParams))
		);
		if (!addressData) return;

		const inputData = addressData(addressParams) as QueryParameterTypes;

		const where = this.queryParams.filter<Prisma.AddressesWhereInput>(
			inputData,
			Prisma.AddressesScalarFieldEnum
		);

		const option: Prisma.AddressesFindFirstArgs = {
			where,
		};

		const address = await prismaClient.addresses.findFirst(option);

		return address;
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
