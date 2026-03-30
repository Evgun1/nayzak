import { Injectable } from "@nestjs/common";
import { ValidationGrpcGetCustomers } from "./validation/validationGrpcGetCustomers";
import { PrismaClient } from "@prisma/client";
import {
	GrpcGetCustomers,
	GrpcGetCustomersItem,
} from "./dto/GrpcGetCustomers.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ValidationGrpcGetCatsAndAddress } from "./validation/validationGrpcGetCartsAndAddress";
import {
	GrpcAddressDTO,
	GrpcCartDTO,
	GrpcGetCartsAndAddress,
} from "./dto/GrpcGetCartsAndAddress.dto";
import { GetCartsAndAddress } from "./type/getCartsAndAddress.type";

@Injectable()
export class GrpcService {
	constructor(private readonly prisma: PrismaService) {}

	async getCustomers(customerIds: ValidationGrpcGetCustomers) {
		const customers = await this.prisma.customers.findMany({
			where: { id: { in: customerIds.customerIds } },
		});

		const bufferImage = Buffer.from("https://placehold.co/100");

		const grpcCustomersItemDTO = customers.map((customer) => {
			return new GrpcGetCustomersItem({
				customerId: customer.id,
				firstName: customer.firstName,
				lastName: customer.lastName,
				image: bufferImage,
			});
		});
		const grpcCustomersDTO = new GrpcGetCustomers({
			customers: grpcCustomersItemDTO,
		});

		return grpcCustomersDTO;
	}

	async getCartsAndAddress(
		data: ValidationGrpcGetCatsAndAddress,
	): Promise<GetCartsAndAddress> {
		const { addressId, cartIds } = data;

		const address = await this.prisma.addresses
			.findUnique({
				where: { id: addressId },
			})
			.then((item) => {
				if (!item) return null;
				return new GrpcAddressDTO({
					...item,
				});
			});

		const carts = await this.prisma.cart
			.findMany({
				where: { id: { in: cartIds } },
			})
			.then((cart) =>
				cart.map(
					(item) =>
						new GrpcCartDTO({
							amount: item.amount,
							productId: item.productsId,
						}),
				),
			);

		if (!address || carts.length <= 0) return;

		const result = new GrpcGetCartsAndAddress({
			carts: carts,
			address: address,
		});

		return result;
	}
}
