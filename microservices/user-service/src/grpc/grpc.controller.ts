import {
	Controller,
	Module,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Http2gRPCExceptionFilter } from "./shared.filter/http2gRPCException.filter";
import { ValidationGrpcGetCustomers } from "./validation/validationGrpcGetCustomers";
import { GrpcService } from "./grpc.service";
import { ValidationGrpcGetCatsAndAddress } from "./validation/validationGrpcGetCartsAndAddress";

@Controller()
export class GrpcController {
	constructor(private readonly grpcService: GrpcService) {}

	@GrpcMethod("UserServices", "GetCustomers")
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseFilters(new Http2gRPCExceptionFilter())
	async getCustomers(data: ValidationGrpcGetCustomers) {
		const grpcCustomers = await this.grpcService.getCustomers(data);
		return grpcCustomers;
	}

	@GrpcMethod("UserServices", "GetCartsAndAddress")
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseFilters(new Http2gRPCExceptionFilter())
	async getCartsAndAddress(data: ValidationGrpcGetCatsAndAddress) {
		return await this.grpcService.getCartsAndAddress(data);
	}
}
