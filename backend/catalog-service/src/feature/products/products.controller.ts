import {
	Controller,
	Get,
	Param,
	Query,
	Res,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import {
	EventPattern,
	MessagePattern,
	Payload,
	Transport,
} from "@nestjs/microservices";
import { ProductsService } from "./products.service";

import { Response } from "express";

import {
	ValidationProductsKafkaPayloadDTO,
	ValidationProductsKafkaRatingPayloadDTO,
} from "./validation/validationProductsKafka.dto";
import { validationExceptionFactory } from "src/utils/validationExceptionFactory";
import { ValidationMinMaxPriceParamDTO } from "./validation/validationMinMaxPice.dto";
import { ValidationProductParamDTO } from "./validation/validationProduct.dto";
import {
	ValidationProductsByParamsParamDTO,
	ValidationProductsByParamsQueryDTO,
} from "./validation/validationProductsByParams.dto";
import { ValidationProductsAllQueryDTO } from "./validation/validationProductsAll.dto";
import { ProductsKafkaDTO } from "./dto/productsKafka.dto";

@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	async getProductsAll(
		@Query() query: ValidationProductsAllQueryDTO,
		@Res({ passthrough: true }) res: Response,
	) {
		const { productCounts, products } =
			await this.productsService.getProductsAll(query);

		res.setHeader("X-Total-Count", productCounts);
		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");

		return products;
	}

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
	async getMinMaxPrice(@Param() params: ValidationMinMaxPriceParamDTO) {
		const { minPrice, maxPrice } =
			await this.productsService.getMinMaxPrice(params);

		return { minPrice, maxPrice };
	}

	// @MessagePattern("update.product.rating", Transport.KAFKA)
	// async updateRatingProduct(
	// 	@Payload(
	// 		new ValidationPipe({
	// 			exceptionFactory: validationExceptionFactory,
	// 		}),
	// 	)
	// 	payload: ValidationProductsKafkaRatingPayloadDTO,
	// ) {
	// 	await this.productsService.updateProduct({
	// 		id: payload.productsId,
	// 		rating: payload.rating,
	// 	});
	// }

	// @UsePipes(
	// 	new ValidationPipe({
	// 		exceptionFactory: validationExceptionFactory,
	// 	}),
	// )
	// @MessagePattern("get.products.catalog")
	// async getProductCatalog(
	// 	@Payload() payload: ValidationProductsKafkaPayloadDTO,
	// ) {
	// 	console.log(payload);
	// 	// const productsKafka = await this.productsService.productsKafka(payload);

	// 	return payload;
	// 	// return productsKafka;
	// }

	
}
