import { Hono } from "hono";
import CartController from "./cart.controller";
import cartController from "./cart.controller";
const cartRouter = new Hono();

cartRouter.post("/", cartController.saveCart);
cartRouter.put("/", cartController.updateCart);
cartRouter.delete("/", cartController.removeCart);
cartRouter.use("/", cartController.initCart);

export default cartRouter;
