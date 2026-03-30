import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
	GetAvgRatingRequest,
	GetProductReviewsRequest,
	ReviewGrpc,
} from "./types/reviewGrpc";
import { PrismaService } from "src/prisma/prisma.service";
import { ValidationGrpcGetProductsDTO } from "./validation/validationGrpcGetProducts.dto";
import { GrpcProductsDTO } from "./dto/grpcProducts.dto";
import { firstValueFrom } from "rxjs";
import { GrpcMediaService } from "./services/grpcMedia.service";
import { GrpcReviewService } from "./services/grpcReview.service";

@Injectable()
export class GrpcService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly grpcMediaService: GrpcMediaService,
		private readonly grpcReviewService: GrpcReviewService,
	) {}

	get mediaService() {
		return this.grpcMediaService;
	}
	get reviewService() {
		return this.grpcReviewService;
	}

	async getProducts(param: ValidationGrpcGetProductsDTO) {
		const products = await this.prisma.products
			.findMany({
				where: { id: { in: param.productIds } },
			})
			.then((product) =>
				product.map(
					(item) =>
						new GrpcProductsDTO({
							productId: item.id,
							discount: item.discount,
							price: item.price,
						}),
				),
			);

		return products;
	}
}
