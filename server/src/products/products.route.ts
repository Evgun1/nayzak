import { Hono } from 'hono';
import ProductsController from './products.controller';
import productsController from './products.controller';
import validation from '../validator/validation';
import customValidator from '../validator/customValidator';
import mainMiddleware from '../utils/middleware/main.middleware';

const productRouter = new Hono();

const schemaParam = new Map().set('productId', validation().global.number);
const schemaProducts = new Map()
	.set('title', validation().product.title)
	.set('description', validation().product.description)
	.set('price', validation().global.number)
	.set('discount', validation().global.number)
	.set('status', validation().product.status)
	.set('categoriesId', validation().global.number)
	.set('subcategoriesId', validation().global.number);

productRouter.get('/', ProductsController.getAll);
productRouter.get(
	'/:productParam',

	// customValidator("param", schemaParam),
	ProductsController.getProduct
);
productRouter.get(
	'/by-params/:category/:subcategory',
	productsController.getAllByParams
);
productRouter.get(
	'/min-max-price/:category/:subcategory',
	productsController.getMinMaxPrice
);

productRouter.put(
	'/:productId',
	mainMiddleware.checkAdmin,
	productsController.change
);
productRouter.post(
	'/',
	customValidator('body', schemaProducts),
	mainMiddleware.checkAdmin,
	productsController.create
);

productRouter.delete(
	'/:productId',

	customValidator('param', schemaParam),
	// productsMiddleware.delete,
	mainMiddleware.checkAdmin,
	productsController.delete
);

export default productRouter;
