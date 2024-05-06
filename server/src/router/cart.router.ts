import { Hono } from "hono";
import CartController from "../controller/cart.controller";
const cartRouter = new Hono();

cartRouter.get("/", CartController.getAll);

export default cartRouter;
