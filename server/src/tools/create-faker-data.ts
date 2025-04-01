import dotenv from 'dotenv';
import prismaClient from '../prismaClient';
import categoriesFake from './faker/categoriesFaker';
import productsFaker from './faker/prodactsFaker';
import subcategoriesFaker from './faker/subcategoriesFaker';
import customerFaker from './faker/customerFaker';
import reviewsFaker from './faker/reviewsFaker';
import credentialsFaker from './faker/credentialsFaker';

dotenv.config();

const start = async () => {
	await prismaClient.$connect();

	await credentialsFaker();
	await customerFaker();
	await categoriesFake();
	await subcategoriesFaker();
	await productsFaker();
	await reviewsFaker();
	// await brandsFaker();
	await prismaClient.$disconnect();
};
start();
