import { ConfigModule } from "@nestjs/config";
import { ITopicConfig, Kafka } from "kafkajs";

async function bootstrap() {
	await ConfigModule.forRoot();
	const kafka = new Kafka({
		brokers: (process.env.KAFKA_BROKERS as string).split(", "),
	});

	const admin = kafka.admin();
	try {
		await admin.connect();
		const topics: ITopicConfig[] = [
			{
				topic: "get.customers.data.reply",
				numPartitions: 1,
				replicationFactor: 1,
			},
			{
				topic: "get.customers.data",
				numPartitions: 1,
				replicationFactor: 1,
			},

			{
				topic: "get.rating.by.products",
				numPartitions: 1,
				replicationFactor: 1,
			},
			{
				topic: "update.product.rating",
				numPartitions: 1,
				replicationFactor: 1,
			},
		];

		await admin.createTopics({
			topics,
			waitForLeaders: false,
		});
	} catch (error) {
		console.log(error);
	} finally {
		await admin.disconnect();
		process.exit(0);
	}
}

bootstrap();
