import { Hono } from "hono";
import UsersController from "../controller/users.controller";
const usersRouter = new Hono();

usersRouter.get("/", UsersController.getAll);

export default usersRouter;
