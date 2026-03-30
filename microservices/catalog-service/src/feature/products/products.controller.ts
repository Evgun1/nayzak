import {
	Controller,
	Get,
	Param,
	Query,
	Res,
	ValidationPipe,
} from "@nestjs/common";
import {
	GrpcMethod,
	MessagePattern,
	Payload,
	Transport,
} from "@nestjs/microservices";
import { ProductsService } from "./products.service";
import { Response } from "express";
import {
	ValidationProductsKafkaPayloadDTO,
	ValidationProductsKafkaRatingPayloadDTO,
} from "./validation/validationKafkaProducts";
import { validationExceptionFactory } from "src/utils/validationExceptionFactory";
import { ValidationMinMaxPriceArgs } from "./validation/validationMinMaxPice";
import { ValidationProductParamDTO } from "./validation/validationProduct";
import {
	ValidationProductsByParamsParamDTO,
	ValidationProductsByParamsQueryDTO,
} from "./validation/validationProductsByParams";
import { ValidationProductsAllQueryDTO } from "./validation/validationProductsAll";
import { GrpcService } from "src/grpc/grpc.service";

@Controller("products")
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly grpcService: GrpcService,
	) {}

	@Get()
	async getProductsAll(
		@Query() query: ValidationProductsAllQueryDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		console.log(query);

		const { productCounts, products } =
			await this.productsService.getProductsAll(query);
		res.setHeader("X-Total-Count", productCounts);
		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");

		return products;
	}

	// @Get("new-`products")
	// async getNewProducts() {
	// 	const newProducts = await this.productsService.getNewProducts();
	// 	return newProducts;
	// }`

	@Get("by-params/:categoryId/:subcategoryId")
	async getProductsByParams(
		@Param() param: ValidationProductsByParamsParamDTO,
		@Query() query: ValidationProductsByParamsQueryDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const { productCounts, products } =
			await this.productsService.getProductsAll({ ...param, ...query });

		res.setHeader("X-Total-Count", productCounts.toString());
		return products;
	}

	@Get("/:id")
	async getProduct(@Param() param: ValidationProductParamDTO) {
		const product = await this.productsService.getProduct(param);
		return { ...product };
	}

	@Get("min-max-price/:categoryId/:subcategoryId")
	async getMinMaxPrice(@Param() params: ValidationMinMaxPriceArgs) {
		const { minPrice, maxPrice } =
			await this.productsService.getMinMaxPrice(params);

		return { minPrice, maxPrice };
	}

	// @MessagePattern("update.product.rating")
	// async updateRatingProduct(
	// 	@Payload(
	// 		new ValidationPipe({
	// 			exceptionFactory: validationExceptionFactory,
	// 		}),
	// 	)
	// 	payload: ValidationProductsKafkaRatingPayloadDTO,
	// ) {
	// 	await this.productsService.updateRatingProduct(payload);
	// }

	// @MessagePattern("get.products.catalog", Transport.KAFKA)
	// async getProductCatalog(
	// 	@Payload(
	// 		new ValidationPipe({
	// 			exceptionFactory: validationExceptionFactory,
	// 		}),
	// 	)
	// 	payload: ValidationProductsKafkaPayloadDTO,
	// ) {
	// 	const productsKafka =
	// 		await this.productsService.getProductCatalog(payload);

	// 	return productsKafka;
	// }

	// @GrpcMethod("ReviewServices", "GetAvgRating")
	// getAvgRating(product_ids: number[]) {
	// 	return {};
	// }
}
