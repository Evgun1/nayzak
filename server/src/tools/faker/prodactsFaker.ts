import { faker } from '@faker-js/faker';
import prismaClient from '../../prismaClient';
import { $Enums } from '@prisma/client';

async function productsFaker() {
	const statusArr: $Enums.ProductsStatus[] = [
		'discontinued',
		'inStock',
		'outOfStock',
	];
	// const resultCategories = await prismaClient.categories.findMany({
	// 	select: { id: true },
	// });
	const resultSubcategories = await prismaClient.subcategories.findMany({
		select: { id: true, categoriesId: true },
	});
	const resultBrands = await prismaClient.brands.findMany({
		select: { id: true },
	});

	const resultCustomers = await prismaClient.customers.findMany({
		select: { id: true },
	});

	const categoriesId = resultSubcategories.map((value) => value.categoriesId);
	const subcategoriesId = resultSubcategories.map((value) => value.id);
	const brandsId = resultBrands.map((value) => value.id);

	for (let index = 1; index <= 100; index++) {
		const title = faker.commerce.productName();
		const description = faker.commerce.productDescription();

		const price = parseInt(faker.commerce.price({ min: 10, max: 1000 }));
		const discount = Math.floor(Math.random() * 100);
		const mainPrice = discount ? price - (price * discount) / 100 : price;

		const randomIndexStatus = Math.floor(Math.random() * statusArr.length);
		const status = statusArr[randomIndexStatus];

		const randomIndexCategories = Math.floor(
			Math.random() * categoriesId.length
		);
		const categoryId = categoriesId[randomIndexCategories];

		const randomIndexSubcategories = Math.floor(
			Math.random() * subcategoriesId.length
		);

		const subcategoryId = subcategoriesId[randomIndexSubcategories];

		const randomIndexBrand = Math.floor(Math.random() * brandsId.length);
		const brandId = brandsId[randomIndexBrand];

		await prismaClient.products.create({
			data: {
				title,
				description,
				price,
				status,
				discount,
				mainPrice,

				brandsId: brandId,
				categoriesId: categoryId,
				subcategoriesId: subcategoryId,
			},
		});
	}
}

export default productsFaker;
