import { faker } from '@faker-js/faker';
import prismaClient from '../../prismaClient';

async function reviewsFaker() {
	const resultProducts = await prismaClient.products.findMany({
		select: { id: true },
	});
	const resultCustomers = await prismaClient.customers.findMany({
		select: { id: true },
	});

	const productsId = resultProducts.map((value) => value.id);

	for (let index = 0; index < productsId.length; index++) {
		const randomIndexProducts = Math.floor(Math.random() * productsId.length);
		const productId = productsId[randomIndexProducts];
		const randomIndexCustomers = Math.floor(
			Math.random() * resultCustomers.length
		);

		const customersId = resultCustomers[randomIndexCustomers].id;

		const rating = Math.floor(Math.random() * 5 + 1);

		await prismaClient.reviews.create({
			data: {
				customersId,
				rating,
				text: faker.lorem.text(),
				productsId: productId,
			},
		});
	}
}

export default reviewsFaker;
