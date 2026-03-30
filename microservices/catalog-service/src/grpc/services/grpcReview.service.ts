import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
	GetAvgRatingRequest,
	GetProductReviewsRequest,
	ReviewGrpc,
} from "../types/reviewGrpc";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GrpcReviewService implements OnModuleInit {
	private grpcReviewService: ReviewGrpc;

	constructor(@Inject("REVIEW_PACKAGE") private clientReview: ClientGrpc) {}

	onModuleInit() {
		return (this.grpcReviewService =
			this.clientReview.getService<ReviewGrpc>("ReviewServices"));
	}

	async getAvgRating(data: GetAvgRatingRequest) {
		const result = await firstValueFrom(
			this.grpcReviewService.getAvgRating(data),
		);
		return result;
	}

	async getReviewsByProduct(data: GetProductReviewsRequest) {
		const result = await firstValueFrom(
			this.grpcReviewService.getProductReviews(data),
		);
		return result;
	}
}
