import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { Request } from "express";
import { IUserJwt } from "./type/userJwt.interface";
import { ValidationOrderUploadBodyDTO } from "./validation/validationOrderUpload.dto";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/init")
	@UseGuards(JwtAuthGuard)
	async init(@Req() req: Request) {
		const user = req.user as IUserJwt;
		const init = await this.appService.init(user);

		console.log("init");

		return init;
	}

	@Post("/")
	@UseGuards(JwtAuthGuard)
	async create(
		@Req() req: Request,
		@Body() body: ValidationOrderUploadBodyDTO,
	) {
		const user = req.user as IUserJwt;
		const t = await this.appService.create(body, user);

		return "Hello world";
	}
}
