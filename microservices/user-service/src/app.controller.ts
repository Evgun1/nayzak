import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Request, Response } from "express";
import { ValidationRegistrationBodyDTO } from "./validation/validationRegistration.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ValidationChangePasswordBodyDTO } from "./validation/validationChangePassword.dto";
import { UserJwtDTO } from "./dto/userJwt.dto";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { ValidationCartAndAddressesPayloadDTO } from "./validation/validationCartAndAddressesKafka.dto";
import { validationExceptionFactory } from "./utils/validationExceptionFactory";
import { ValidationLoginBodyDTO } from "./validation/validationLogin.dto";

@Controller("/")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("health")
	@HttpCode(200)
	async health() {
		return "healthy";
	}

	@Get("auth/init")
	@UseGuards(JwtAuthGuard)
	async init(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const user = req.user as UserJwtDTO;
		const token = await this.appService.init(user);
		return { access_token: token };
	}

	@Get("auth/activation/:link")
	async activation(
		@Param("link", ParseUUIDPipe) param: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const credential = await this.appService.activation(param);
		res.setHeader("Authorization", credential);

		return JSON.stringify(credential);
	}

	@Post("auth/registration")
	async registration(@Body() body: ValidationRegistrationBodyDTO) {
		const result = await this.appService.registration(body);
		return result;
	}

	@Post("auth/login")
	async login(
		@Body() body: ValidationLoginBodyDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const userToken = await this.appService.login(body);
		res.setHeader("Authorization", userToken);

		return JSON.stringify(userToken);
	}

	@UseGuards(JwtAuthGuard)
	@Put("auth/change-password")
	async changePassword(
		@Body() body: ValidationChangePasswordBodyDTO,
		@Req() req: Request,
	) {
		const user = req.user as UserJwtDTO;

		try {
			return await this.appService.changePassword(body, user);
		} catch (error) {
			throw new UnauthorizedException();
		}
	}

	@MessagePattern("get.cart.and.addresses.user")
	async getCartAndAddressesUser(
		@Payload(
			new ValidationPipe({
				exceptionFactory: validationExceptionFactory,
			}),
		)
		payload: ValidationCartAndAddressesPayloadDTO,
	) {
		const result = await this.appService.getCartAndAddressesKafka(payload);
		return result;
	}

	// @MessagePattern("get.customers.data")
	// kafkaGetCustomerData(
	// 	@Payload()
	// 	payload: any,
	// ) {
	// 	console.log(payload);

	// 	return { message: "hello kafka" };
	// }
}
