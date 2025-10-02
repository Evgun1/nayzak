import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService {
	constructor(
		@Inject("USER_SERVICE") private readonly kafkaUser: ClientKafka,
		@Inject("CATALOG_SERVICE") private readonly kafkaCatalog: ClientKafka,
	) {}

	userService = () => this.kafkaUser;
	catalogService = () => this.kafkaCatalog;
}
