import { Hono } from "hono";

const personalDataRouter = new Hono();

personalDataRouter.post("/");
personalDataRouter.get("/");

export default personalDataRouter;
