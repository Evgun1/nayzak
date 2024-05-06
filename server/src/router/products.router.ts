import { Hono } from "hono";
import ProductsController from "../controller/products.controller";

const productRouter = new Hono();

productRouter.get("/", ProductsController.getAll);

export default productRouter;
