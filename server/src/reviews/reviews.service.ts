import prismaClient from '../prismaClient';
import { QueryParameterTypes } from '../utils/service/service.type';
import { MainService } from '../utils/service/main.service';
import { Prisma, $Enums } from '@prisma/client';
import { QueryParamHandler } from '../utils/query-params/QueryParams.service';
import { log } from 'console';

class ReviewsService {
	private queryParams = new QueryParamHandler();

	async getAll(queryParams: QueryParameterTypes) {
		const skip = this.queryParams.offset(queryParams);
		const take = this.queryParams.limit(queryParams);
		const orderBy =
			this.queryParams.orderBy<Prisma.ReviewsOrderByWithRelationInput>(
				queryParams,
				Prisma.ReviewsScalarFieldEnum
			);
		const where = this.queryParams.filter<Prisma.ReviewsWhereInput>(
			queryParams,
			Prisma.ReviewsScalarFieldEnum
		);

		const options: Prisma.ReviewsFindManyArgs = {
			where,
			orderBy,
			take,
			skip,
		};

		const reviewsCount = await prismaClient.reviews.count({
			where: options.where,
		});
		const reviews = await prismaClient.reviews.findMany(options);

		return { reviews, reviewsCount };
	}

	async getAllReviewsByProduct(productName: string) {
		const reviews = await prismaClient.reviews.findMany({
			where: { Products: { title: productName } },
		});
		const reviewsCount = await prismaClient.reviews.count({
			where: { Products: { title: productName } },
		});

		return { reviews, reviewsCount };
	}

	async getAllProductReviews(productsId: string) {
		return prismaClient.reviews.findMany({
			where: { productsId: +productsId },
		});
	}

	async ratingAvg(queryParams: QueryParameterTypes, filter: {}) {
		if (queryParams.sortBy === 'rating') {
			const avgRating = await prismaClient.reviews.groupBy({
				by: ['productsId'],
				_avg: { rating: true },
				where: { Products: filter },

				orderBy: { _avg: { rating: queryParams.sort } },
			});

			return avgRating 
		}
	}
}

export default new ReviewsService();
export { ReviewsService };
