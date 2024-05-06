import { Hono } from "hono";
import BrandsController from "../controller/brands.controller";
const brandsRouter = new Hono();

brandsRouter.get("/", BrandsController.getAll);

export default brandsRouter;
