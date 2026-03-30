import {
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Transform } from "class-transformer";
import { Http2gRPCExceptionFilter } from "./shared.filter/http2gRPCException.filter";
import { ValidationGrpcGetProductsDTO } from "./validation/validationGrpcGetProducts.dto";
import { GrpcService } from "./grpc.service";

@Controller()
export class GrpcController {
	constructor(private readonly grpc: GrpcService) {}

	@GrpcMethod("CatalogService", "GetProducts")
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseFilters(Http2gRPCExceptionFilter)
	async getProducts(data: ValidationGrpcGetProductsDTO) {
		// console.log(true);

		const result = await this.grpc.getProducts(data);

		return result;
	}
}
