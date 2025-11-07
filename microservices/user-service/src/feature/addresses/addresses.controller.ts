import { AddressesService } from "./addresses.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";
import { IUserJwt } from "src/interface/credentialsJwt.interface";
import { ValidationAddressesUploadBodyDTO } from "./validation/validationAddressesUpload.dto";
import { ValidationAddressesUpdateBodyDTO } from "./validation/validationAddressesUpdate.dto";
import { ValidationAddressesDeleteBodyDTO } from "./validation/validationAddressesDelete.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { validationExceptionFactory } from "src/utils/validationExceptionFactory";
import { ValidationAddressesKafkaPayloadDTO } from "./validation/validationAddressesKafka.dto";
import { use } from "passport";

@Controller("addresses")
export class AddressesController {
	constructor(private readonly addressesService: AddressesService) {}

	@Get("init")
	@UseGuards(JwtAuthGuard)
	async initAddresses(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = req.user as IUserJwt;

		if (!user) throw new UnauthorizedException();
		const { addresses, addressesCount } =
			await this.addressesService.init(user);

		res.setHeader("X-Total-Count", addressesCount);

		return addresses;
	}

	@Post("/")
	@UseGuards(JwtAuthGuard)
	async uploadAddresses(
		@Req() req: Request,
		@Body() body: ValidationAddressesUploadBodyDTO,
	) {
		const user = req.user as IUserJwt;

		try {
			const addresses = await this.addressesService.upload(body, user);

			return addresses;
		} catch (error) {
			console.log(error);
		}
	}

	@Put()
	@UseGuards(JwtAuthGuard)
	async updateAddresses(
		@Req() req: Request<any, any, ValidationAddressesUpdateBodyDTO>,
	) {
		const body = req.body;
		const user = req.user as IUserJwt;
		const addresses = await this.addressesService.update(body, user);
		return addresses;
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	async deleteAddresses(
		@Req() req: Request,
		@Body() body: ValidationAddressesDeleteBodyDTO,
	) {
		const user = req.user as IUserJwt;
		const address = await this.addressesService.delete(body, user);
		return address;
	}

	@Get(":id")
	async getAddressesOne(@Param("id", ParseIntPipe) id: number) {
		const address = await this.addressesService.getOne(id);

		return address;
	}

	@MessagePattern("get.addresses.user")
	async getAddressesKafka(
		@Payload(
			new ValidationPipe({
				exceptionFactory: validationExceptionFactory,
			}),
		)
		payload: ValidationAddressesKafkaPayloadDTO,
	) {
		return "addresses  true";
	}
}
