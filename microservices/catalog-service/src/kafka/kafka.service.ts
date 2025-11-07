import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KafkaGetRatingByProducts } from "./type/kafkaGetRatingByProducts";
import { firstValueFrom } from "rxjs";

@Injectable()
export class KafkaService implements OnModuleInit {
	constructor(
		@Inject("REVIEW_SERVICE") private readonly kafkaReview: ClientKafka,
	) {}

	async onModuleInit() {
		this.kafkaReview.subscribeToResponseOf("get.rating.by.products");
		await this.kafkaReview.connect();
	}

	async getRatingByProducts(ids: number[]) {
		const result = await firstValueFrom(
			this.kafkaReview.send<
				KafkaGetRatingByProducts["result"],
				KafkaGetRatingByProducts["input"]
			>("get.rating.by.products", { ids: ids }),
		);
		return result;
	}
}
