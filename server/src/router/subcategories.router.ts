import { Hono } from "hono";
import subcategoriesController from "../controller/subcategories.controller";

const subcategoriesRouter = new Hono();

subcategoriesRouter.get("/", subcategoriesController.getAll);

export default subcategoriesRouter;
