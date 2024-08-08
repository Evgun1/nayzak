import { Hono } from "hono";
import UsersController from "./users.controller";
const usersRouter = new Hono();

usersRouter.get("/", UsersController.getAll);

export default usersRouter;
