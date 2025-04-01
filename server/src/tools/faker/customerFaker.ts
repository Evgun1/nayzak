import prismaClient from '../../prismaClient';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

async function customerFaker() {
	const resultCredentials = await prismaClient.credentials.findMany({
		select: {
			id: true,
		},
	});
	const credentialsIdArr = resultCredentials.map((data) => data.id);

	const dataArr: Prisma.CustomersCreateManyInput[] = [];

	for (let index = 0; index <= credentialsIdArr.length; index++) {
		const firstName = faker.person.firstName().toString();
		const lastName = faker.person.lastName().toString();
		const phone = +faker.phone.imei().replaceAll('-', '');

		const randomIndexCredentials = Math.floor(Math.random() * index);

		const credentialsId = credentialsIdArr[index];
		if (credentialsId !== undefined)
			dataArr.push({
				firstName,
				lastName,
				phone: 0,
				credentialsId: credentialsId,
			});
	}

	await prismaClient.customers.createMany({ data: dataArr });
}

export default customerFaker;
