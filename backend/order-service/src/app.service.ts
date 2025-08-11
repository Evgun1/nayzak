import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { IUserJwt } from "./type/userJwt.interface";
import { PrismaService } from "./prisma/prisma.service";
import { KafkaService } from "./kafka/kafka.service";
import { ClientKafka } from "@nestjs/microservices";
import { ValidationOrderUploadBodyDTO } from "./validation/validationOrderUpload.dto";
import { lastValueFrom } from "rxjs";
import { CartKafkaInput, CartKafkaResult } from "./type/cartKafka.type";
import {
	ProductsKafkaInput,
	ProductsKafkaResult,
} from "./type/productsKafka.type";

@Injectable()
export class AppService implements OnModuleInit {
	private userKafka: ClientKafka;
	// private catalogKafka: ClientKafka;

	constructor(
		private readonly prisma: PrismaService,
		private readonly kafka: KafkaService,
		@Inject("CATALOG_SERVICE") private readonly catalogKafka: ClientKafka,
	) {
		this.userKafka = kafka.userService();
		// this.catalogKafka = kafka.catalogService();
	}

	async onModuleInit() {
		this.userKafka.subscribeToResponseOf("cart.user");
		await this.userKafka.connect();

		this.catalogKafka.subscribeToResponseOf("get.products.catalog");
		await this.catalogKafka.connect();
	}

	async init(user: IUserJwt) {
		const order = await this.prisma.orders.findMany({
			where: { customersId: user.customerId },
		});
		return order;
	}

	async create(body: ValidationOrderUploadBodyDTO, user: IUserJwt) {
		try {
			const cartKafka = await lastValueFrom(
				this.userKafka.send<CartKafkaResult, CartKafkaInput>(
					"get.cart.user",
					{
						cartId: body.cartId,
						customerId: user.customerId,
					},
				),
			);

			const addressesKafka = await lastValueFrom(
				this.userKafka.send("get.addresses.user", {}),
			);

			if (cartKafka.length <= 0) return;

			this.catalogKafka
				.send<ProductsKafkaResult, ProductsKafkaInput>(
					"get.products.catalog",
					{
						// productsId: cartKafka.map((cart) => cart.productsId),
						productsId: [1],
					},
				)
				.subscribe((e) => {
					console.log(e);
					return e;
				});

			return "";
		} catch (error) {
			console.log(error);
		}
	}
}
