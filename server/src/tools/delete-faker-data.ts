import dotenv from 'dotenv';
import prismaClient from '../prismaClient';
import { Prisma } from '@prisma/client';

dotenv.config();

export default (async function start() {
	await prismaClient.$connect();
	for (const key in Prisma.ModelName) {
		// @ts-ignore
		prismaClient[key].deleteMany({});
	}
	await prismaClient.$disconnect();
})();
