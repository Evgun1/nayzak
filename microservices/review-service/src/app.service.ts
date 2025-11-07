import { CacheService } from "./cache/cache.service";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ValidationUploadReviewsBodyDTO } from "./validation/validationUploadReviews.dto";
import { UserDTO } from "./dto/user.dto";
import { ValidationQueryDTO } from "./validation/validationQuery.dto";
import { ValidationGetReviewsQueryDTO } from "./validation/validationGetReviews.dto";
import { ClientKafka } from "@nestjs/microservices";
import { ValidationReviewsByProductParamsDTO } from "./validation/validationReviewsByProduct.dto";
import { firstValueFrom } from "rxjs";
import {
	CustomerKafkaInput,
	CustomerKafkaResult,
} from "./type/kafkaGetCustomerData.type";
import {
	ReviewMongoArgs,
	ReviewMongoSort,
	ReviewMongoWhere,
} from "./mongo/reviews/type/reviewsArgs.type";
import { ReviewsMongoService } from "./mongo/reviews/reviewsMongo.service";
import { KafkaService } from "./kafka/kafka.service";
import { ClientApiService } from "./client-api/clientApi.service";
import { ReviewDTO } from "./dto/reviews.dto";
import { TProductRatingInput } from "./type/kafkaUpdateProductRating.type";
import { ValidationKafkaGetRatingByProductPayloadDTO } from "./validation/validationKafkaGetRatingByProduct.dto";

type GetReviewsAllParam = ValidationQueryDTO &
	ValidationGetReviewsQueryDTO &
	Partial<ValidationReviewsByProductParamsDTO>;

@Injectable()
export class AppService implements OnModuleInit {
	private catalogKafka: ClientKafka;
	private userKafka: ClientKafka;

	constructor(
		private readonly cache: CacheService,
		private readonly kafka: KafkaService,
		private readonly reviewsMongo: ReviewsMongoService,
		private readonly clientApi: ClientApiService,
	) {
		this.userKafka = kafka.userService();
		this.catalogKafka = kafka.catalogService();
	}

	async onModuleInit() {
		this.userKafka.subscribeToResponseOf("get.customers.data");
		await this.userKafka.connect();
	}

	private async kafkaUpdateRatingInProduct(param: { productId: number }) {
		const { reviews, reviewsCount } = await this.getReviewsAll({
			productsId: param.productId,
		});
		const reviewObj = reviews
			.map((data) => {
				return { rating: data.rating, productsId: data.productsId };
			})
			.reduce((acc, curr) => {
				return {
					productsId: acc.productsId,
					rating: acc.rating + curr.rating,
				};
			});
		const ratingAvg = Math.round(reviewObj.rating / reviews.length);
		this.catalogKafka.emit<any, TProductRatingInput>(
			"update.product.rating",
			{
				productsId: reviewObj.productsId,
				avg: ratingAvg,
				count: reviewsCount,
			},
		);
	}
	private async kafkaGetCustomersData(customersId: number[]) {
		const userKafka = await firstValueFrom(
			this.userKafka.send<CustomerKafkaResult, CustomerKafkaInput>(
				"get.customers.data",
				{
					customersId: customersId,
				},
			),
		);
		const user: { fullName: string; id: number }[] = userKafka.reduce(
			(acc, cur) => {
				acc.push({
					id: cur.id,
					fullName: `${cur.firstName} ${cur.lastName}`,
				});
				return acc;
			},
			[] as { fullName: string; id: number }[],
		);

		return user;
	}

	async getReviewsAll(
		param: GetReviewsAllParam &
			Partial<ValidationReviewsByProductParamsDTO>,
	) {
		const { sort, sortBy, limit, offset, page, productsId } = param;
		const sortArgs: ReviewMongoSort = {};
		if (sort && sortBy) sortArgs[`${sortBy}`] = sort.toLocaleLowerCase();

		const where: ReviewMongoWhere = {};
		if (productsId) where.productsId = productsId;

		const args: ReviewMongoArgs = {
			limit: limit,
			skip: offset,
			sort: sortArgs,
			where,
		};

		const reviews = await this.reviewsMongo.findAll(args);
		const reviewsCount = await this.reviewsMongo.count({
			where: args.where,
		});

		return { reviews, reviewsCount };
	}
	async getReview(id: string) {
		const review = await this.reviewsMongo.findOne(id);
		return review;
	}

	async getReviewByProduct(param: ValidationReviewsByProductParamsDTO) {
		const reviewCache = await this.cache.cachingReviewsByProductGetAll(
			param.productsId,
		);
		const reviewCount = await this.reviewsMongo.count({
			where: { productsId: param.productsId },
		});
		const reviewsCacheDTO = reviewCache.map(
			(review) => new ReviewDTO(review),
		);

		if (reviewCache && reviewCache.length > 0)
			return { reviews: reviewsCacheDTO, totalCount: reviewCount };

		const reviews = await this.reviewsMongo.findAll({
			where: { productsId: param.productsId },
		});
		const user = await this.kafkaGetCustomersData(
			reviews.map((item) => item.customersId),
		);

		const reviewsDTO: ReviewDTO[] = [];
		for (const element of reviews) {
			if (!user || user.length <= 0) continue;
			const findUser = user.find(
				(item) => item.id === element.customersId,
			);
			if (!findUser) continue;
			reviewsDTO.push(
				new ReviewDTO({
					fullName: findUser.fullName,
					createdAt: element.createAt as Date,
					customersId: element.customersId,
					rating: element.rating,
					text: element.text,
				}),
			);
		}

		await this.cache.cachingReviewsByProductUpload(
			param.productsId,
			reviews,
			user,
		);

		return { reviews: reviewsDTO, totalCount: reviewCount };
	}

	async uploadReviews(body: ValidationUploadReviewsBodyDTO & UserDTO) {
		const review = await this.reviewsMongo.create({
			customersId: body.customerId,
			productsId: body.productsId,
			rating: body.rating,
			text: body.text,
		});
		const customerData = await this.kafkaGetCustomersData([
			body.customerId,
		]);
		await this.cache.cachingReviewsByProductUpload(
			body.productsId,
			[review],
			customerData,
		);
		await this.kafkaUpdateRatingInProduct({ productId: body.productsId });
		await this.clientApi.clearCache("reviews");
		return review;
	}

	async kafkaGetRatingByProducts(
		payload: ValidationKafkaGetRatingByProductPayloadDTO,
	) {
		const result: Array<{ productId: number; avg: number; count: number }> =
			[];
		for (const id of payload.ids) {
			const ratings = await this.reviewsMongo.findAll({
				where: { productsId: id },
			});

			const aggregated = ratings.reduce(
				(acc, cur) => {
					const find = acc.find(
						(val) => val.productId === cur.productsId,
					);
					if (!find) {
						acc.push({
							productId: cur.productsId,
							avg: cur.rating,
							count: 1,
						});
					} else {
						find.count += 1;
						find.avg =
							(find.avg * (find.count - 1) + cur.rating) /
							find.count;
					}
					return acc;
				},
				[] as Array<{ productId: number; avg: number; count: number }>,
			);

			result.push(...aggregated);
		}
		return result;
	}
}
