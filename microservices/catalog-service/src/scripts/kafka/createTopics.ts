import { ITopicConfig, Kafka } from "kafkajs";
import * as dotenv from "dotenv";
dotenv.config();

async function createTopics() {
	const kafka = new Kafka({
		brokers: (process.env.KAFKA_BROKERS as string).split(", "),
	});
	const admin = kafka.admin();

	try {
		await admin.connect();
		const topics: ITopicConfig[] = [
			{
				topic: "get.products.catalog.reply",
				numPartitions: 1,
				replicationFactor: 1,
			},
			{
				topic: "get.products.catalog",
				numPartitions: 1,
				replicationFactor: 1,
			},
			{
				topic: "get.rating.by.products.reply",
				numPartitions: 1,
				replicationFactor: 1,
			},
			{
				topic: "update.product.rating",
				numPartitions: 1,
				replicationFactor: 1,
			},
		];
		await admin.createTopics({ topics, waitForLeaders: false });
	} catch (error) {
		console.log(error);
	} finally {
		await admin.disconnect();
		process.exit(0);
	}
}

createTopics();
