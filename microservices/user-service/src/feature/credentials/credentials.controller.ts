import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import { QueryDTO } from "src/query/dto/query.dto";
import { CredentialsService } from "./credentials.service";
import { Response } from "express";

@Controller("credentials")
export class CredentialsController {
	constructor(private readonly credentialsServices: CredentialsService) {}

	@Get()
	async getAll(
		@Query() query: QueryDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const { credentials, totalCount } =
			await this.credentialsServices.getAll(query);
		res.setHeader("X-Total-Count", totalCount);
		return credentials;
	}

	@Get(":params")
	async getOne(@Param("params", ParseIntPipe) params: number) {
		return await this.credentialsServices.getOne(params);
	}
}
