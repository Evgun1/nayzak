import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
import { IUserJwt } from "./type/userJwt.interface";
import { PrismaService } from "./prisma/prisma.service";
import { KafkaService } from "./kafka/kafka.service";
import { ClientKafka } from "@nestjs/microservices";
import { ValidationOrderKafkaBodyDTO } from "./validation/validationOrderKafka.dto";
import { firstValueFrom, from, lastValueFrom } from "rxjs";
import { CartKafkaInput, CartKafkaResult } from "./type/cartKafka.type";
import {
	ProductsKafkaInput,
	ProductsKafkaResult,
} from "./type/productsKafka.type";
import {
	CartAndAddressesKafkaInput,
	CartAndAddressesKafkaResult,
} from "./type/cartAndAddressesKafka.type";
import { ValidationAddressesUploadBodyDTO } from "./validation/validationAddressesUpload.dto";
import { ValidationOrderUploadBodyDTO } from "./validation/validationOrderUpload.dto";
import { OrderDTO } from "./dto/order.dto";
import { GrpcService } from "./grpc/grpc.service";

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
	private userKafka: ClientKafka;
	private catalogKafka: ClientKafka;

	constructor(
		private readonly grpc: GrpcService,
		private readonly prisma: PrismaService,
		private readonly kafka: KafkaService,
	) {
		this.userKafka = kafka.userService();
		this.catalogKafka = kafka.catalogService();
	}

	async onModuleInit() {
		this.userKafka.subscribeToResponseOf("get.cart.and.addresses.user");
		await this.userKafka.connect();

		this.catalogKafka.subscribeToResponseOf("get.products.catalog");
		await this.catalogKafka.connect();
	}
	async onModuleDestroy() {
		await this.catalogKafka.close();
		await this.userKafka.close();
	}

	private async createAddresses(inputData: ValidationAddressesUploadBodyDTO) {
		const addresses = await this.prisma.addresses.create({
			data: { ...inputData },
		});

		return addresses;
	}

	async init(user: IUserJwt) {
		const order = await this.prisma.orders.findMany({
			where: { customersId: user.customerId },
		});

		const orderDTO = order.map((item) => new OrderDTO({ ...item }));

		return orderDTO;
	}
	async createOrderMany(inputData: ValidationOrderUploadBodyDTO[]) {
		const order = await this.prisma.orders.createManyAndReturn({
			data: inputData,
		});
		return order;
	}

	async create(body: ValidationOrderKafkaBodyDTO, user: IUserJwt) {
		const cartsAndAddress = await this.grpc.getCartsAndAddress({
			addressId: body.addressesId,
			cartIds: body.cartId,
		});

		const products = await this.grpc.getProducts({
			productIds: cartsAndAddress.carts.map((cart) => cart.productId),
		});

		// const cartAndAddressesKafka = await lastValueFrom(
		// 	this.userKafka.send<
		// 		CartAndAddressesKafkaResult,
		// 		CartAndAddressesKafkaInput
		// 	>("get.cart.and.addresses.user", {
		// 		addressesId: body.addressesId,
		// 		cartId: body.cartId,
		// 		customersId: user.customerId,
		// 	}),
		// );

		// const productsKafka = await firstValueFrom(
		// 	this.catalogKafka.send<ProductsKafkaResult, ProductsKafkaInput>(
		// 		"get.products.catalog",
		// 		{
		// 			productsId: cartAndAddressesKafka.cart.map(
		// 				(cart) => cart.productsId,
		// 			),
		// 		},
		// 	),
		// );

		if (!cartsAndAddress.address) return;
		if (products.length <= 0) return;

		const addresses = await this.createAddresses(cartsAndAddress.address);

		const orderManyBody = products.reduce((acc, cur) => {
			const findCart = cartsAndAddress.carts.find(
				(cart) => cart.productId === cur.productId,
			);
			if (!findCart) return acc;
			const totalPrice =
				Math.round(cur.price - cur.price * (cur.discount / 100)) *
				findCart?.amount;

			acc.push({
				addressesId: addresses.id,
				amount: findCart.amount,
				customersId: user.customerId,
				price: totalPrice,
				productsId: cur.productId,
			});
			return acc;
		}, [] as ValidationOrderUploadBodyDTO[]);

		const order = await this.createOrderMany(orderManyBody);
		const orderDTO = order.map((item) => new OrderDTO({ ...item }));

		return orderDTO;
	}
}
