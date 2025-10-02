// import { NestFactory } from "@nestjs/core";
// import prismaClient from "../../clientPrisma";
// import reviewsFaker from "./fakerData/reviewsFaker";
// import { AppModule } from "../../app.module";
// import { ClientKafka } from "@nestjs/microservices";

// const start = async () => {
// 	await prismaClient.$connect();
// 	const app = await NestFactory.createApplicationContext(AppModule);
// 	const catalogKafka = app.get<ClientKafka>("CATALOG_SERVICE");
// 	await catalogKafka.connect();

// 	await reviewsFaker(catalogKafka);
// 	await prismaClient.$disconnect();
// 	await catalogKafka.close();
// 	await app.close();
// };
// start();
