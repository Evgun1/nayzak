import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Post,
	Put,
	Query,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { QueryDTO } from "src/query/dto/query.dto";
import { UploadCartDTO } from "./dto/uploadCart.dto";
import { UpdateCartDTO } from "./dto/updateCart.dto";
import { DeleteCartDTO } from "./dto/deleteCart.dto";
import { JwtAuthGuard } from "src/guard/jwtAuth.guard";
import { Request } from "express";
import { IUserJwt } from "src/interface/credentialsJwt.interface";
import { CartService } from "./cart.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { GetCartKafkaDTO } from "./dto/getCartKafka.dto";
import { validationExceptionFactory } from "src/utils/validationExceptionFactory";

@Controller("cart")
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	async getCarts(@Query() query: QueryDTO) {}

	@Get("init")
	@UseGuards(JwtAuthGuard)
	async initCart(@Req() req: Request) {
		const credential = req.user as IUserJwt;

		const cart = await this.cartService.init(credential);
		return cart;
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async uploadCart(@Req() req: Request<any, any, UploadCartDTO>) {
		const body = req.body;
		const credential = req.user as IUserJwt;
		return await this.cartService.uploadCart(body, credential);
	}

	@Put()
	@UseGuards(JwtAuthGuard)
	async updateCart(@Req() req: Request<any, any, UpdateCartDTO>) {
		const body = req.body;
		const credential = req.user as IUserJwt;
		return await this.cartService.updateCart(body, credential);
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	async deleteCart(@Req() req: Request<any, any, DeleteCartDTO>) {
		const body = req.body as DeleteCartDTO;
		return this.cartService.removeCart(body.id);
	}

	@UsePipes(
		new ValidationPipe({
			exceptionFactory: validationExceptionFactory,
		}),
	)
	@MessagePattern("get.cart.user")
	async getCartKafka(
		@Payload()
		payload: GetCartKafkaDTO,
	) {
		const cart = await this.cartService.getCartKafka(payload);
		const bufferArr = Buffer.from(JSON.stringify(cart));
		return bufferArr;
	}
}
