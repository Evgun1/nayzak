import { AddressesService } from "./addresses.service";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";
import { LocalAuthGuard } from "src/guard/localAuth.guard";
import { IUserJwt } from "src/interface/credentialsJwt.interface";
import { GetAddressesOneParam } from "./dto/getAddressesOneParam.dto";
import { UploadAddressesDTO } from "./dto/uploadAddresses.dto";
import { UpdateAddressesDTO } from "./dto/updateAddresses.dto";
import { DeleteAddressesDTO } from "./dto/deleteAddresses.dto";

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

	@Get("/:id")
	async getAddressesOne(@Param() param: GetAddressesOneParam) {
		const address = await this.addressesService.getOne(param.id);

		return address;
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async uploadAddresses(@Req() req: Request<any, any, UploadAddressesDTO>) {
		const body = req.body;
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
	async updateAddresses(@Req() req: Request<any, any, UpdateAddressesDTO>) {
		const body = req.body;
		const user = req.user as IUserJwt;
		const addresses = await this.addressesService.update(body, user);
		return addresses;
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	async deleteAddresses(@Req() req: Request<any, any, DeleteAddressesDTO>) {
		const body = req.body;
		const user = req.user as IUserJwt;
		const address = await this.addressesService.delete(body, user);
		return address;
	}
}
