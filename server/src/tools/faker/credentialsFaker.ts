import { faker } from '@faker-js/faker';
import prismaClient from '../../prismaClient';
import bcrypt from 'bcrypt';

async function credentialsFaker() {
	for (let i = 1; i <= 10; i++) {
		const email = faker.internet.email().toLowerCase();

		const saltGenerate = bcrypt.genSaltSync();
		const password = bcrypt.hashSync('T!1', saltGenerate);

		await prismaClient.credentials.create({
			data: {
				email,
				password,
				role: 'client',
				isActive: true,
			},
		});
	}
}

export default credentialsFaker;
