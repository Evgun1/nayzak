import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { MinMaxPriceModel, ProductsModel } from "./products.model";
import {
	ValidationProductsAllArgs,
	ValidationProductsAllQueryDTO,
} from "./validation/validationProductsAll";
import { Res } from "@nestjs/common";
import { Response } from "express";
import { ProductsService } from "./products.service";
import { GrpcService } from "src/grpc/grpc.service";
import { ProductDTO } from "./dto/product.dto";
import {
	ValidationProductsByParamsArgs,
	ValidationProductsByParamsParamDTO,
} from "./validation/validationProductsByParams";
import { ValidationMinMaxPriceArgs } from "./validation/validationMinMaxPice";
import {
	ValidationProductArgs,
	ValidationProductParamDTO,
} from "./validation/validationProduct";

@Resolver()
export class ProductsResolver {
	constructor(
		private readonly productsService: ProductsService,
		private readonly grpcService: GrpcService,
	) {}

	@Query(() => [ProductsModel])
	async getProducts(
		@Args() args: ValidationProductsAllArgs,
		@Res({ passthrough: true }) res: Response,
	): Promise<ProductsModel[]> {
		const { productCounts, products } =
			await this.productsService.getProductsAll(args);
		res.setHeader("X-Total-Count", productCounts);
		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");

		return products;
	}

	@Query(() => [ProductsModel])
	async getProductsByParams(
		@Args() args: ValidationProductsByParamsArgs,
		@Res({ passthrough: true }) res: Response,
	): Promise<ProductsModel[]> {
		const { productCounts, products } =
			await this.productsService.getProductsAll(args);
		res.setHeader("X-Total-Count", productCounts.toString());
		return products;
	}

	@Query(() => ProductsModel)
	async getProduct(
		@Args() args: ValidationProductArgs,
	): Promise<ProductsModel | undefined> {
		const product = await this.productsService.getProduct(args);
		return product;
	}

	@Query(() => MinMaxPriceModel)
	async getMinMaxPrice(@Args() args: ValidationMinMaxPriceArgs) {
		const { minPrice, maxPrice } =
			await this.productsService.getMinMaxPrice(args);

		return { minPrice, maxPrice };
	}

	// @ResolveField()
	// uploadProduct() {}
}
