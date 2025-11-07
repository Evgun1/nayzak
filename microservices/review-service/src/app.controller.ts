import {
	Body,
	Controller,
	Get,
	Header,
	HttpCode,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ValidationUploadReviewsBodyDTO } from "./validation/validationUploadReviews.dto";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { Request, Response } from "express";
import { UserDTO } from "./dto/user.dto";
import { ValidationQueryDTO } from "./validation/validationQuery.dto";
import { ValidationGetReviewsQueryDTO } from "./validation/validationGetReviews.dto";
import { ValidationGetReviewByParamsParamDTO } from "./validation/validationGetReviewByParams.dto";
import { ValidationReviewsByProductParamsDTO } from "./validation/validationReviewsByProduct.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ValidationKafkaGetRatingByProductPayloadDTO } from "./validation/validationKafkaGetRatingByProduct.dto";
import { validationExceptionFactory } from "./utils/validationExceptionFactory";

@Controller("/")
export class AppController {
	constructor(private readonly appService: AppService) {}
	@Get("/health")
	@HttpCode(200)
	health() {
		return "health";
	}

	@Get("/")
	async getReviewsAll(
		@Query() query: ValidationQueryDTO & ValidationGetReviewsQueryDTO,
	) {
		const review = await this.appService.getReviewsAll(query);
		return review;
	}

	@Get("/by-product/:productsId")
	async getReviewsByProducts(
		@Res({ passthrough: true }) res: Response,
		@Param() param: ValidationReviewsByProductParamsDTO,
	) {
		const { reviews, totalCount } =
			await this.appService.getReviewByProduct(param);
		res.setHeader("X-Total-Count", totalCount);

		return reviews;
	}

	@Post("/")
	@UseGuards(JwtAuthGuard)
	async uploadReview(
		@Req() request: Request,
		@Body() body: ValidationUploadReviewsBodyDTO,
	) {
		const user = request.user as UserDTO;
		const review = await this.appService.uploadReviews({
			...body,
			...user,
		});
		return review;
	}

	@Get("/:id")
	async getReview(@Param() param: ValidationGetReviewByParamsParamDTO) {
		const review = await this.appService.getReview(param.id);
		return review;
	}

	@MessagePattern("get.rating.by.products")
	async getRatingByProduct(
		@Payload(
			new ValidationPipe({
				exceptionFactory: validationExceptionFactory,
			}),
		)
		payload: ValidationKafkaGetRatingByProductPayloadDTO,
	) {
		return await this.appService.kafkaGetRatingByProducts(payload);
	}
}
