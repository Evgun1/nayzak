import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "USER_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "user-order-service",
						brokers: (process.env.KAFKA_BROKERS as string)
							.split(",")
							.map((broker) => broker.trim()),
					},
					consumer: {
						groupId: "user-order-consumer",
						// rebalanceTimeout: 60000,
						// allowAutoTopicCreation: false,
						// heartbeatInterval: 3000,
						// sessionTimeout: 45000,
						// retry: {
						// 	initialRetryTime: 300,
						// 	retries: 5,
						// },
					},
					// subscribe: { fromBeginning: true },
				},
			},
			{
				name: "CATALOG_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "catalog-service",
						brokers: (process.env.KAFKA_BROKERS as string)
							.split(",")
							.map((broker) => broker.trim()),
					},
					consumer: {
						groupId: "catalog-consumer",
						// rebalanceTimeout: 60000,
						// allowAutoTopicCreation: false,
						// heartbeatInterval: 3000,
						// sessionTimeout: 45000,
						// retry: {
						// 	initialRetryTime: 300,
						// 	retries: 5,
						// },
					},
					// subscribe: { fromBeginning: true },
				},
			},
		]),
	],
	providers: [KafkaService],
	exports: [KafkaService, ClientsModule],
})
export class KafkaModule {}
