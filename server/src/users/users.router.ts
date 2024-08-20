import { Hono } from "hono";
import appRouter from "../router";

import UsersControler from "./users.controler";

const usersRouter = new Hono();

usersRouter.post("/registration", UsersControler.registration);

// usersRouter.post("/login", UsersControler.login);
// usersRouter.post("/logout", UsersControler.logout);
// usersRouter.get("/refresh", UsersControler.refresh);
// usersRouter.get("/active/:link ", UsersControler.active);
// usersRouter.get("/", UsersControler.getUsers);

export default usersRouter;
