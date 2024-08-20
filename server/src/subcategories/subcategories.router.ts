import { Hono } from "hono";
import subcategoriesController from "./subcategories.controller";

const subcategoriesRouter = new Hono();

subcategoriesRouter.get("/", subcategoriesController.getAll);
subcategoriesRouter.get("/:categoryName", subcategoriesController.getSubcategoryByCategory);

export default subcategoriesRouter;
