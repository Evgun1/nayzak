import { Hono } from "hono";
import CategoriesController from "../controller/categories.controller";

const categoriesRouter = new Hono();

categoriesRouter.get("/", CategoriesController.getAll);

export default categoriesRouter;
