import { Context, Hono, Next } from "hono";
import appRouter from "../router";

import UsersControler from "./users.controler";
import { validator } from "hono/validator";
import UserFromValidator from "./validator/user-from.validator";

const usersRouter = new Hono();

usersRouter.post(
  "/registration",
  validator("form", UserFromValidator),
  UsersControler.registration
);

// usersRouter.post("/login", UsersControler.login);
// usersRouter.post("/logout", UsersControler.logout);
// usersRouter.get("/refresh", UsersControler.refresh);
usersRouter.get("/active/:link ", UsersControler.active);
// usersRouter.get("/", UsersControler.getUsers);

export default usersRouter;
