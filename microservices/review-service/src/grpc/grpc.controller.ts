import {
	Body,
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { GrpcMethod, Payload } from "@nestjs/microservices";
import { ValidationGrpcGetAvgRatingParamDTO } from "./validation/validationGrpcGetAvgRating";
import { Http2gRPCExceptionFilter } from "./shared.filter/http2gRPCException.filter";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { ReviewStatsMongoService } from "src/mongo/review_stats/reviewStatsMongo.service";
import { GrpcService } from "./grpc.service";
import { ValidationGrpcGetProductReviewsParamDTO } from "./validation/validationGrpcGetProductReviews";

@Controller()
export class GrpcController {
	constructor(private readonly grpcService: GrpcService) {}

	@GrpcMethod("ReviewServices", "GetAvgRating")
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseFilters(new Http2gRPCExceptionFilter())
	async getAvgRating(
		data: ValidationGrpcGetAvgRatingParamDTO,
		metadata: Metadata,
		call: ServerUnaryCall<any, any>,
	) {
		const result = await this.grpcService.getAvgRating(data);
		return result;
	}

	@GrpcMethod("ReviewServices", "GetProductReviews")
	@UsePipes(new ValidationPipe({ transform: true }))
	@UseFilters(new Http2gRPCExceptionFilter())
	async getProductReviews(
		data: ValidationGrpcGetProductReviewsParamDTO,
		metadata: Metadata,
		call: ServerUnaryCall<any, any>,
	) {
		const result = await this.grpcService.getProductReviews(data);

		return result;
	}
}
