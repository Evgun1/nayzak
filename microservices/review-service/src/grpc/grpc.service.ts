import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { IReviewServices } from "./types/IReviewService";
import { ReviewStatsMongoService } from "src/mongo/review_stats/reviewStatsMongo.service";
import { ValidationGrpcGetAvgRatingParamDTO } from "./validation/validationGrpcGetAvgRating";
import {
	ReviewAvgRatingDTO,
	ReviewAvgRatingItemDTO,
} from "./dto/ReviewAvgRating.dto";
import { $ } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { ValidationGrpcGetProductReviewsParamDTO } from "./validation/validationGrpcGetProductReviews";
import { ReviewMongo } from "src/mongo/reviews/type/reviews.type";
import { ReviewsMongoService } from "src/mongo/reviews/reviewsMongo.service";
import { ReviewDTO } from "src/dto/reviews.dto";
import {
	ProductReviewsDTO,
	ProductReviewsItemDTO,
} from "./dto/ProductReviews.dto copy";
import { RetryThrottler } from "@grpc/grpc-js/build/src/retrying-call";
import { GrpcUserServices } from "./types/userServices.type";
import { ValidationGrpcGetCustomersParamsDTO } from "./validation/validationGrpcGetCustomers";
import { firstValueFrom } from "rxjs";
// import { ReviewsMongoService } from "src/mongo/reviews/reviewsMongo.service";

@Injectable()
export class GrpcService implements OnModuleInit {
	private grpcUserService: GrpcUserServices;

	constructor(
		@Inject("USER_PACKAGE") private readonly userGrpc: ClientGrpc,
		private readonly mongoReviewStats: ReviewStatsMongoService,
		private readonly mongoReview: ReviewsMongoService,
	) {}

	onModuleInit() {
		return (this.grpcUserService =
			this.userGrpc.getService<GrpcUserServices>("UserServices"));
	}

	// constructor(private readonly reviewsMongo: ReviewsMongoService) {}
	async getAvgRating(param: ValidationGrpcGetAvgRatingParamDTO) {
		const result = await this.mongoReviewStats.findAll({
			where: { productId: { $all: param.productIds } },
		});

		const reviewAvgRatingItemsDTO = result.map((item) => {
			return new ReviewAvgRatingItemDTO({
				productId: item.productId,
				avgRating: item.avgRating,
			});
		});

		const count = await this.mongoReviewStats.count({
			where: { productId: { $all: param.productIds } },
		});

		const reviewAvgRatingDTO = new ReviewAvgRatingDTO({
			items: reviewAvgRatingItemsDTO,
			count: count,
		});
		return reviewAvgRatingDTO;
	}
	async getProductReviews(param: ValidationGrpcGetProductReviewsParamDTO) {
		const reviews = await this.mongoReview.findAll({
			where: { productId: param.productId },
		});

		const avgRating = await this.mongoReviewStats.findOne({
			where: { productId: param.productId },
		});

		const customerIds = reviews.map((item) => item.customersId);
		const customers = await this.getCustomers({ customerIds });

		const productReviewsItemDTO: ProductReviewsItemDTO[] = [];

		for (const review of reviews) {
			const customer = customers.find(
				(item) => item.customerId === review.customersId,
			);

			if (review.customersId && customer) {
				productReviewsItemDTO.push(
					new ProductReviewsItemDTO({
						fullName: `${customer.firstName} ${customer.lastName}`,
						image: Buffer.from("test"),
						createdAt: review.createAt,
						rating: review.rating,
						text: review.text,
					}),
				);
			}
		}

		const productReviewsDTO = new ProductReviewsDTO({
			reviews: productReviewsItemDTO,
			avgRating: avgRating?.avgRating || 0,
			totalCount: reviews.length,
		});

		return productReviewsDTO;
	}

	async getCustomers(param: ValidationGrpcGetCustomersParamsDTO) {
		const result = await firstValueFrom(
			this.grpcUserService.getCustomers({
				customerIds:param.customerIds,
			}),
		);
		
		return result.customers;
	}
}
