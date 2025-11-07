import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaService } from "./kafka.service";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ClientsModule.register([
			{
				name: "REVIEW_SERVICE",
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: "review-service",
						brokers: (process.env.KAFKA_BROKERS as string).split(
							", ",
						),
					},
					consumer: {
						groupId: "review-catalog",
					},
				},
			},
		]),
	],
	providers: [KafkaService],
	exports: [KafkaService],
})
export class KafkaModule {}
