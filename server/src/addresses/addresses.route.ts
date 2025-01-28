import { Hono } from 'hono';
import addressesController from './addresses.controller';
import customValidator from '../validator/customValidator';
import validation from '../validator/validation';
import { ZodSchema } from 'zod';

const addressesRoute = new Hono();

const schemaAddressesPut = new Map();

const validationAddresses = validation().addresses as Record<string, ZodSchema>;

for (const key in validationAddresses) {
	if (key.includes('customersId')) continue;
	schemaAddressesPut.set(key, validationAddresses[key]);
}

addressesRoute.get('/', addressesController.getAll);
addressesRoute.post('/', addressesController.create);

addressesRoute.put(
	'/:addressesParam',
	// customValidator('body', schemaAddressesPut),
	addressesController.update
);

addressesRoute.delete('/', addressesController.delete);

export default addressesRoute;
