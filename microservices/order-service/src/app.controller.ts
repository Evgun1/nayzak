import {
	Body,
	Controller,
	Get,
	Header,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { Request, Response } from "express";
import { IUserJwt } from "./type/userJwt.interface";
import { ValidationOrderKafkaBodyDTO } from "./validation/validationOrderKafka.dto";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/init")
	@UseGuards(JwtAuthGuard)
	async init(@Req() req: Request) {
		const user = req.user as IUserJwt;
		const init = await this.appService.init(user);

		// if (init.length <= 0) return;
		return init;
	}

	@Post("/upload")
	@UseGuards(JwtAuthGuard)
	async create(
		@Req() req: Request,
		@Body() body: ValidationOrderKafkaBodyDTO,
	) {
		const user = req.user as IUserJwt;
		const order = await this.appService.create(body, user);

		return order;
	}

	@Get("health")
	@HttpCode(200)
	async health() {
		return "healthy";
	}
}
