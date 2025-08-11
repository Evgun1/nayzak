// import { faker } from "@faker-js/faker";
// import prismaClient from "../../../clientPrisma";
// import { ClientKafka } from "@nestjs/microservices";
// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "../../../app.module";
// import { Message } from "@nestjs/microservices/external/kafka.interface";

// async function reviewsFaker(kafka: ClientKafka) {
// 	// for (let index = 0; index < 300; index++) {
// 	// 	const randomIndexProducts = Math.floor(Math.random() * 300) + 1;

// 	// 	const rating = Math.floor(Math.random() * 5 + 1);

// 	// 	await prismaClient.reviews.create({
// 	// 		data: {
// 	// 			customersId: index + 1,
// 	// 			rating,
// 	// 			text: faker.lorem.text(),
// 	// 			productsId: randomIndexProducts,
// 	// 		},
// 	// 	});
// 	// }

// 	const avgRating = await prismaClient.reviews
// 		.groupBy({
// 			by: ["productsId"],
// 			_avg: { rating: true },
// 		})
// 		.then((arrData) =>
// 			arrData.map((data) => {
// 				return {
// 					rating: Math.round(data._avg.rating ?? 0),
// 					productsId: data.productsId,
// 				};
// 			}),
// 		);

// 	for (const element of avgRating) {
// 		const emitData: Message = { value: JSON.stringify(element) };
// 		kafka.emit("update-products-rating", emitData);
// 	}
// }

// export default reviewsFaker;
