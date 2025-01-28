import { Hono } from 'hono';
import CategoriesController from './categories.controller';
import validation from '../validator/validation';
import customValidator from '../validator/customValidator';
import CategoriesMiddleware from './categories.middleware';

const categoriesRoute = new Hono();

const schemaCategories = new Map().set('title', validation().categories.title);

categoriesRoute.get('/', CategoriesController.getAll);
categoriesRoute.get('/:categoryParams', CategoriesController.getOne);
categoriesRoute.post(
    '/',
    customValidator('body', schemaCategories),
    CategoriesMiddleware.checkAdmin,
    CategoriesController.create
);
categoriesRoute.put(
    '/:categoryId',
    // customValidator('body', schemaCategories),
    // CategoriesMiddleware.checkAdmin,
    CategoriesController.change
);

export default categoriesRoute;
