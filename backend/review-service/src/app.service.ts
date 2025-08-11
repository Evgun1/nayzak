import { log } from "util";
import {
	BadRequestException,
	HttpException,
	Inject,
	Injectable,
} from "@nestjs/common";
import { ReviewsMongoService } from "./mongo/reviews/reviewsMongo.service";
import { UploadReviewsDTO } from "./dto/uploadReviews.dto";
import { UserDTO } from "./dto/user.dto";
import { GetQueryDto } from "./dto/get-query-dto";
import { GetReviewsQueryDTO } from "./dto/getReviewsQuery.dto";
import { randomFillSync } from "crypto";
import { ClientKafka, KafkaContext } from "@nestjs/microservices";
import { KafkaModule } from "./kafka/kafka.module";
import { E } from "@faker-js/faker/dist/airline-BUL6NtOJ";

@Injectable()
export class AppService {
	constructor(
		private readonly reviewsMongo: ReviewsMongoService,
		@Inject("CATALOG_SERVICE") private readonly kafka: ClientKafka,
	) {}

	// async getAll(query: GetQueryDto) {
	// 	if (query.offset) this.skip = +query.offset;
	// 	if (query.limit) this.take = +query.limit;
	// 	if (query.sortBy && query.sort) this.orderBy[query.sortBy] = query.sort;

	// 	const options: Prisma.ReviewsFindManyArgs = {
	// 		where: this.where,
	// 		orderBy: this.orderBy,
	// 		take: this.take,
	// 		skip: this.skip,
	// 	};
	// 	const reviewsCount = await prismaClient.reviews.count({
	// 		where: options.where,
	// 	});
	// 	const reviews = await prismaClient.reviews.findMany(options);
	// 	return { reviews, reviewsCount };
	// }

	async getReviewsAll(query: GetQueryDto & GetReviewsQueryDTO) {
		const { sort, sortBy, limit, offset, page, productsId } = query;

		const reviews = await this.reviewsMongo.findAll({
			limit: limit ? limit : undefined,
			skip: offset ? offset : undefined,
			sort:
				sort && sortBy
					? ({ [`${sortBy}`]: sort.toLocaleLowerCase() } as any)
					: undefined,
			where: productsId ? { productsId } : undefined,
		});

		return reviews;
	}

	async getReview(id: string) {
		const review = await this.reviewsMongo.findOne(id);
		return review;
	}

	// 	async getAllReviewsByProduct(productParams: number) {
	// 		this.clearArgs();

	// 		this.orderBy.createdAt = "desc";
	// 		this.where = { productsId: productParams };

	// 		const reviews = await prismaClient.reviews.findMany({
	// 			orderBy: { createdAt: "desc" },
	// 			where: this.where,
	// 		});
	// 		const reviewsCount = await prismaClient.reviews.count({
	// 			where: this.where,
	// 		});
	// 		return { reviews, reviewsCount };
	// 	}

	// 	async getAllProductReviews(productsId: string) {
	// 		const reviews = await prismaClient.reviews.findMany({
	// 			where: { productsId: +productsId },
	// 		});
	// 		return reviews;
	// 	}

	async uploadReviews(body: UploadReviewsDTO & UserDTO) {
		const review = await this.reviewsMongo.create({
			customersId: body.customerId,
			productsId: body.productsId,
			rating: body.rating,
			text: body.text,
		});

		const reviewResult = await this.getReviewsAll({
			productsId: body.productsId,
		});

		const reviewObj = reviewResult
			.map((data) => {
				return { rating: data.rating, productsId: data.productsId };
			})
			.reduce((acc, curr) => {
				return {
					productsId: acc.productsId,
					rating: acc.rating + curr.rating,
				};
			});

		const ratingAvg = Math.round(reviewObj.rating / reviewResult.length);
		this.kafka
			.send("update.product.rating", {
				productsId: reviewObj.productsId,
				rating: ratingAvg,
			})
			.subscribe({
				error: (err) => {
					console.error(err);
				},
			});

		return review;
	}
}
