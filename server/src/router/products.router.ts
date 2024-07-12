import { Hono } from "hono";
import ProductsController from "../controller/products.controller";

const productRouter = new Hono();

productRouter.get("/", ProductsController.getAll);
productRouter.get("/:productName", ProductsController.getProduct);
productRouter.get("/search", ProductsController.searchProduct);

export default productRouter;
