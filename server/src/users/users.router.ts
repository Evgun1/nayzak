import { Context, Hono, Next } from "hono";
import appRouter from "../router";

import UsersControler from "./users.controler";
import { validator } from "hono/validator";
import UserFromValidator from "./validator/user-from.validator";
import usersControler from "./users.controler";
import { bearerAuth } from "hono/bearer-auth";
import { basicAuth } from "hono/basic-auth";

const usersRouter = new Hono();

usersRouter.post(
  "/registration",
  validator("json", UserFromValidator),
  UsersControler.registration
);
// usersRouter.post(
//   "/registration",
//   validator("form", UserFromValidator),
//   UsersControler.registration
// );

usersRouter.get("/active/:link ", UsersControler.active);

usersRouter.post("/login", UsersControler.login);

usersRouter.use("/check", usersControler.check);

export default usersRouter;
