import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService {
	constructor(
		@Inject("USER_SERVICE") private readonly kafkaUser: ClientKafka,
		@Inject("CATALOG_SERVICE") private readonly kafkaCatalog: ClientKafka,
	) {}

	// async onModuleInit() {
	// 	const connect = await this.kafkaUser.connect();
	// 	const result: any[] = [];

	// 	for (let i = 0; i < 50; i++) {
	// 		result.push(
	// 			connect.send({
	// 				topic: "test-topic",
	// 				messages: [
	// 					{
	// 						value: "v",
	// 						partition: 0,
	// 						key: "x",
	// 					},
	// 				],
	// 			}),
	// 		);
	// 	}

	// 	await Promise.all(result);
	// }
	// async onModuleDestroy() {
	// 	this.kafkaUser.close();
	// }

	userService = () => this.kafkaUser;
	catalogService = () => this.kafkaCatalog;
}
