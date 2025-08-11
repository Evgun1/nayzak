import {
	Body,
	Controller,
	Get,
	Inject,
	OnModuleDestroy,
	OnModuleInit,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import {
	ClientKafka,
	EventPattern,
	MessagePattern,
	Payload,
} from "@nestjs/microservices";
import { UploadReviewsDTO } from "./dto/uploadReviews.dto";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "./dto/user.dto";
import query from "utils/query-params/query";
import { GetQueryDto } from "./dto/get-query-dto";
import { GetReviewsQueryDTO } from "./dto/getReviewsQuery.dto";
import { GetReviewParamDTO } from "./dto/getReviewParam.dto";

@Controller()
export class AppController implements OnModuleInit {
	constructor(
		private readonly jwtService: JwtService,
		private readonly appService: AppService,
		@Inject("CATALOG_SERVICE") private readonly catalogKafka: ClientKafka,
	) {}

	async onModuleInit() {
		this.catalogKafka.subscribeToResponseOf("update.product.rating");
		await this.catalogKafka.connect();
	}

	@Get()
	async getReviewsAll(@Query() query: GetQueryDto & GetReviewsQueryDTO) {
		const review = await this.appService.getReviewsAll(query);

		return review;
	}

	@Get(":id")
	async getReview(@Param() param: GetReviewParamDTO) {
		const review = await this.appService.getReview(param.id);
		return review;
	}

	@Get("/by-products/:productPrams")
	getReviewsByProducts() {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async uploadReview(
		@Req() request: Request,
		@Body() body: UploadReviewsDTO,
	) {
		const user = request.user as UserDTO;
		const review = await this.appService.uploadReviews({
			...body,
			...user,
		});

		return review;
	}

	// @Put()
	// changeReview() {}

	// @Delete()
	// deleteReview() {}
}
