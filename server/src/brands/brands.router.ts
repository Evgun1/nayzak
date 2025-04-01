import { Hono } from 'hono';
import BrandsController from './brands.controller';
const brandsRouter = new Hono();

brandsRouter.get('/', BrandsController.getAll);

export default brandsRouter;
