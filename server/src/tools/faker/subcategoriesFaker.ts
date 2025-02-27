import { faker } from '@faker-js/faker';
import prismaClient from '../../prismaClient';

export default async function subcategoriesFaker() {
	const resultCategories = await prismaClient.categories.findMany({
		select: { id: true },
	});

	const categoriesId = resultCategories.map((value) => value.id);

	for (let index = 1; index <= 10; index++) {
		const randomIndexCategories = Math.floor(
			Math.random() * categoriesId.length
		);
		const categoryId = categoriesId[randomIndexCategories];

		await prismaClient.subcategories.create({
			data: {
				title: faker.commerce.product(),
				categoriesId: categoryId,
			},
		});
	}
}
