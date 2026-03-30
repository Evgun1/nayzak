import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
	GetCategoriesMediaAllResponse,
	GetCategoriesMediaOneResponse,
	GetCustomersMediaAllResponse,
	GetCustomersMediaOneResponse,
	GetProductsMediaAllResponse,
	GetProductsMediaOneResponse,
	GetSubcategoriesMediaAllResponse,
	GetSubcategoriesMediaOneResponse,
} from "./type/media.grpc";
import {
	ValidationGetCategoriesAll,
	ValidationGetCategoriesOne,
} from "./validation/validationGetCategoriesMedia";
import {
	ValidationGetSubcategoriesAll,
	ValidationGetSubcategoriesOne,
} from "./validation/validationGetSubcategoriesMedia";
import {
	ValidationGetProductsAll,
	ValidationGetProductsOne,
} from "./validation/validationGetProductsMedia";
import {
	ValidationGetCustomersAll,
	ValidationGetCustomersOne,
} from "./validation/validationGetCustomersMedia";
import { GrpcService } from "./grpc.service";

@Controller()
export class GrpcController {
	constructor(private readonly grpcService: GrpcService) {}

	@GrpcMethod("MediaService", "GetCategoriesMediaAll")
	async getCategoriesMediaAll(
		data: ValidationGetCategoriesAll,
	): Promise<GetCategoriesMediaAllResponse> {
		const result = await this.grpcService.getCategoriesMediaAll(data);
		return result;
	}
	@GrpcMethod("MediaService", "GetCategoriesMediaOne")
	async getCategoriesMediaOne(
		data: ValidationGetCategoriesOne,
	): Promise<GetCategoriesMediaOneResponse> {
		const result = await this.grpcService.getCategoriesMediaOne(data);
		return result;
	}

	@GrpcMethod("MediaService", "GetSubcategoriesMediaAll")
	async getSubcategoriesMediaAll(
		data: ValidationGetSubcategoriesAll,
	): Promise<GetSubcategoriesMediaAllResponse> {
		const result = await this.grpcService.getSubcategoriesMediaAll(data);
		return result;
	}
	@GrpcMethod("MediaService", "GetSubcategoriesMediaOne")
	async getSubcategoriesMediaOne(
		data: ValidationGetSubcategoriesOne,
	): Promise<GetSubcategoriesMediaOneResponse> {
		const result = await this.grpcService.getSubcategoriesMediaOne(data);
		return result;
	}

	@GrpcMethod("MediaService", "GetProductsMediaAll")
	async getProductsMediaAll(
		data: ValidationGetProductsAll,
	): Promise<GetProductsMediaAllResponse> {
		const result = await this.grpcService.getProductsMediaAll(data);
		return result;
	}
	@GrpcMethod("MediaService", "GetProductsMediaOne")
	async getProductsMediaOne(
		data: ValidationGetProductsOne,
	): Promise<GetProductsMediaOneResponse> {
		const result = await this.grpcService.getProductsMediaOne(data);
		return result;
	}

	// @GrpcMethod("MediaService", "GetCustomersMediaAll")
	// async getCustomersMediaAll(
	// 	data: ValidationGetCustomersAll,
	// ): Promise<GetCustomersMediaAllResponse> {
	// 	const result = await this.grpcService.getCustomersMediaAll(data);
	// 	return result;
	// }
	// @GrpcMethod("MediaService", "GetCustomersMediaOne")
	// async getCustomersMediaOne(
	// 	data: ValidationGetCustomersOne,
	// ): Promise<GetCustomersMediaOneResponse> {
	// 	const result = await this.grpcService.getCustomersMediaOne(data);
	// 	return result;
	// }
}
