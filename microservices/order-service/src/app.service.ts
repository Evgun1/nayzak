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

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
	private userKafka: ClientKafka;
	private catalogKafka: ClientKafka;

	constructor(
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

	async init(user: IUserJwt) {
		const order = await this.prisma.orders.findMany({
			where: { customersId: user.customerId },
		});

		const orderDTO = order.map((item) => new OrderDTO({ ...item }));

		return orderDTO;
	}

	async createAddresses(inputData: ValidationAddressesUploadBodyDTO) {
		const addresses = await this.prisma.addresses.create({
			data: { ...inputData },
		});

		return addresses;
	}
	async createOrderMany(inputData: ValidationOrderUploadBodyDTO[]) {
		const order = await this.prisma.orders.createManyAndReturn({
			data: inputData,
		});
		return order;
	}

	async create(body: ValidationOrderKafkaBodyDTO, user: IUserJwt) {
		const cartAndAddressesKafka = await lastValueFrom(
			this.userKafka.send<
				CartAndAddressesKafkaResult,
				CartAndAddressesKafkaInput
			>("get.cart.and.addresses.user", {
				addressesId: body.addressesId,
				cartId: body.cartId,
				customersId: user.customerId,
			}),
		);

		const productsKafka = await firstValueFrom(
			this.catalogKafka.send<ProductsKafkaResult, ProductsKafkaInput>(
				"get.products.catalog",
				{
					productsId: cartAndAddressesKafka.cart.map(
						(cart) => cart.productsId,
					),
				},
			),
		);

		if (!cartAndAddressesKafka.addresses) return;
		if (productsKafka.length <= 0) return;

		const addresses = await this.createAddresses(
			cartAndAddressesKafka.addresses,
		);

		const orderManyBody = productsKafka.reduce((acc, cur) => {
			const findCart = cartAndAddressesKafka.cart.find(
				(cart) => cart.productsId === cur.id,
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
				productsId: cur.id,
			});
			return acc;
		}, [] as ValidationOrderUploadBodyDTO[]);

		const order = await this.createOrderMany(orderManyBody);

		// console.log(orderManyBody, "orderManyBody");
		// console.log(order, "order");
		// console.log(cartAndAddressesKafka, "cartAndAddressesKafka");
		// console.log(productsKafka, "productsKafka");

		const orderDTO = order.map((item) => new OrderDTO({ ...item }));

		return orderDTO;
	}
}
