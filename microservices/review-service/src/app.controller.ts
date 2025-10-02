import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ValidationUploadReviewsBodyDTO } from "./validation/validationUploadReviews.dto";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { Request, Response } from "express";
import { UserDTO } from "./dto/user.dto";
import { ValidationQueryDTO } from "./validation/validationQuery.dto";
import { ValidationGetReviewsQueryDTO } from "./validation/ValidationGetReviews.dto";
import { ValidationGetReviewByParamsParamDTO } from "./validation/ValidationGetReviewByParams.dto";
import { ValidationReviewsByProductParamsDTO } from "./validation/validationReviewsByProduct.dto";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getReviewsAll(
		@Query() query: ValidationQueryDTO & ValidationGetReviewsQueryDTO,
	) {
		const review = await this.appService.getReviewsAll(query);
		return review;
	}

	@Get(":id")
	async getReview(@Param() param: ValidationGetReviewByParamsParamDTO) {
		const review = await this.appService.getReview(param.id);
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
}
