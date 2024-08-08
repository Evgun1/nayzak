import { Hono } from "hono";
import CategoriesController from "./categories.controller";

const categoriesRouter = new Hono();

categoriesRouter.get("/", CategoriesController.getAll);

export default categoriesRouter;
