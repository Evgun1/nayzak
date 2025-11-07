import * as bcrypt from "bcrypt";

import {
	HttpException,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ValidationRegistrationBodyDTO } from "./validation/validationRegistration.dto";
import { ClientKafka } from "@nestjs/microservices";
import { randomUUID } from "crypto";
import { RedisService } from "./redis/redis.service";
import { RegistrationCacheDTO } from "./dto/registrationCache.dto";
import { CustomersService } from "./feature/customers/customers.service";
import { JwtService } from "@nestjs/jwt";
import { ValidationLoginBodyDTO } from "./validation/validationLogin.dto";
import { UserJwtDTO } from "./dto/userJwt.dto";
import { ValidationChangePasswordBodyDTO } from "./validation/validationChangePassword.dto";
import { QueryDTO } from "./query/dto/query.dto";
import { PrismaService } from "./prisma/prisma.service";
import { QueryService } from "./query/query.service";
import { CartService } from "./feature/cart/cart.service";
import { AddressesService } from "./feature/addresses/addresses.service";
import { ValidationCartAndAddressesPayloadDTO } from "./validation/validationCartAndAddressesKafka.dto";

@Injectable()
export class AppService {
	constructor(
		private readonly cartService: CartService,
		private readonly addressesService: AddressesService,
		private readonly queryService: QueryService,
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly customersService: CustomersService,
		private readonly redisClient: RedisService,
		@Inject("MAIL_NOTIFICATION_SERVICE")
		private readonly mailKafkaClient: ClientKafka,
	) {}

	async validateCredential(body: ValidationLoginBodyDTO) {
		const { email, password } = body;

		const credential = await this.prisma.credentials
			.findFirst({
				where: { email },
				select: {
					id: true,
					email: true,
					password: true,
					role: true,
					Customers: {
						select: { id: true },
					},
				},
			})
			.then((data) =>
				!data
					? null
					: {
							id: data.id,
							email: data.email,
							role: data.role,
							password: data.password,
							customerId: data.Customers[0].id,
						},
			);

		const hashPassword = await bcrypt.compare(
			password,
			credential ? credential.password : "",
		);

		if (!credential || !hashPassword) {
			throw new UnauthorizedException("Incorrect email or password");
		}

		return new UserJwtDTO({
			customerId: credential.customerId,
			id: credential.id,
			email: credential.email,
			role: credential.role,
		});
	}

	async registration(body: ValidationRegistrationBodyDTO) {
		const { email, password, firstName, lastName } = body;

		const actionLink = randomUUID();
		const saltRounds = Math.floor(Math.random() * (10 - 1) + 1);
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const registrationValue = new RegistrationCacheDTO({
			email,
			firstName,
			lastName,
			password: hashPassword,
		});

		const validReg = await this.prisma.credentials.findFirst({
			where: { email },
		});

		if (validReg)
			throw new HttpException("The user is already registered", 401);

		const registerCache =
			await this.redisClient.hGetAll<RegistrationCacheDTO>(
				"registration-cache",
			);

		for (const element of registerCache) {
			for (const value of Object.values(element)) {
				if (value.email !== email) continue;
				throw new HttpException("User at the activation stage", 401);
			}
		}

		await this.redisClient.hSetEx(
			"registration-cache",
			{
				[actionLink]: registrationValue,
			},
			120,
		);

		this.mailKafkaClient.emit("send-mail-action-link", {
			email,
			activeLink: actionLink,
		});

		return { message: "To confirm, open the email." };
	}

	async login(body: ValidationLoginBodyDTO): Promise<string> {
		const user = await this.validateCredential(body);

		const jwtCredentials = await this.jwtService.signAsync({ ...user });
		return jwtCredentials;
	}

	async init(user: UserJwtDTO) {
		const credentials: UserJwtDTO | undefined =
			await this.prisma.credentials
				.findUnique({
					where: {
						email: user.email,
						Customers: {
							some: { id: user.customerId },
						},
					},
					include: { Customers: true },
				})
				.then((item) =>
					item
						? ({
								...item,
								customerId: item.Customers[0].id,
							} as UserJwtDTO)
						: undefined,
				);

		if (!credentials) return undefined;

		const jwtCredentials = await this.jwtService.signAsync(credentials);
		return jwtCredentials;
	}

	async activation(link: string): Promise<string> {
		const redisCacheKey = "registration-cache";

		const registrationCache =
			await this.redisClient.hGet<RegistrationCacheDTO>(
				redisCacheKey,
				link,
			);

		if (!registrationCache)
			throw new HttpException(
				"Activation time has passed or the link is invalid.",
				409,
			);

		const credentials = await this.prisma.credentials.create({
			data: {
				email: registrationCache.email,
				password: registrationCache.password,
			},
		});

		const customer = await this.customersService.uploadCustomer({
			credentialsId: credentials.id,
			firstName: registrationCache.information.firstName,
			lastName: registrationCache.information.lastName,
		});
		await this.redisClient.hDel(redisCacheKey, link);

		const credentialJwtDTO: UserJwtDTO = {
			id: credentials.id,
			email: credentials.email,
			role: credentials.role,
			customerId: customer.id,
		};

		const jwtCredentials =
			await this.jwtService.signAsync(credentialJwtDTO);

		return jwtCredentials;
	}

	async changePassword(body: ValidationChangePasswordBodyDTO) {
		const { email, newPassword } = body;

		const saltRounds = Math.floor(Math.random() * (10 - 1) + 1);
		const hashPassword = await bcrypt.hash(newPassword, saltRounds);

		await this.prisma.credentials.update({
			where: { email: email },
			data: { password: hashPassword },
		});

		return "Password successfully changed";
	}

	async getCartAndAddressesKafka(
		inputData: ValidationCartAndAddressesPayloadDTO,
	) {
		const cart = await this.cartService.getCartKafka(inputData);
		const addresses =
			await this.addressesService.getAddressesKafka(inputData);
		return { cart, addresses };
	}
}
