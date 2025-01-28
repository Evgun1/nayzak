import { Hono } from 'hono';
import customersController from './customers.controller';
import customersMiddleware from './customers.middleware';
import validation from '../validator/validation';
import customValidator from '../validator/customValidator';

const customersRouter = new Hono();

const schemaCustomer = new Map();

schemaCustomer.set(
	'firstName',
	validation().global.name.refine((val) => !/[0-9]/.test(val), {
		message: 'There should be no numbers',
	})
);
schemaCustomer.set(
	'lastName',
	validation().global.name.refine((val) => !/[0-9]/.test(val), {
		message: 'There should be no numbers',
	})
);

customersRouter.get('/', customersController.getAll);
customersRouter.get('/:customerId', customersController.getOne);

customersRouter.post(
	'/',

	customValidator('body', schemaCustomer),
	customersMiddleware.create,
	customersController.create
);

customersRouter.put(
	'/update',
	customersMiddleware.change,
	customersController.change
);
customersRouter.post(
	'/init',
	customersMiddleware.init,
	customersController.init
);
customersRouter.delete('/', customersController.delete);

export default customersRouter;
