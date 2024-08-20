import { Hono } from "hono";
import ProductsController from "./products.controller";
import productsController from "./products.controller";

const productRouter = new Hono();

productRouter.get("/", ProductsController.getAll);
productRouter.get("/:productName", ProductsController.getProduct);
productRouter.get(
  "/by-params/:category/:subcategory",
  productsController.getAllByParams
);
productRouter.get("/min-max-price/", productsController.getMinMaxPrice);

export default productRouter;
