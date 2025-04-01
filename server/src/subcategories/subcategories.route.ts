import { Hono } from 'hono';
import subcategoriesController from './subcategories.controller';
import mainMiddleware from '../utils/middleware/main.middleware';
import validation from '../validator/validation';
import customValidator from '../validator/customValidator';

const subcategoriesRoute = new Hono();

const schemaSubcategoriesCreate = new Map()
	.set('title', validation().subcategories.title)
	.set('categoriesId', validation().subcategories.categoriesId);

subcategoriesRoute.get('/', subcategoriesController.getAll);
subcategoriesRoute.get('/:subcategoriesParam', subcategoriesController.getOne);
subcategoriesRoute.get(
	'/category/:categoryName',
	subcategoriesController.getSubcategoryByCategory
);
subcategoriesRoute.post(
	'/',
	customValidator('body', schemaSubcategoriesCreate),
	mainMiddleware.checkAdmin,
	subcategoriesController.create
);

export default subcategoriesRoute;
