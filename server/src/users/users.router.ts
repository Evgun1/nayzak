import { Context, Hono, Next } from "hono";
import appRouter from "../router";

import { validator } from "hono/validator";
import UserFromValidator from "./validator/user-from.validator";
import usersMiddleware from "./users.middleware";
import usersControler from "./users.controler";
import FromValidator from "../validator/from.validator";
import { email, password } from "../utils/validator";

const usersRouter = new Hono();

const schema = new Map();
schema.set("email", email);
schema.set("password", password);

usersRouter.post(
  "/registration",
  validator("form", (value, c) => FromValidator(value, c, schema)),
  usersMiddleware.registration,
  usersControler.registration
);

usersRouter.post("/login", usersMiddleware.login, usersControler.login);

usersRouter.get(
  "/active/:link ",
  usersMiddleware.active,
  usersControler.active
);
usersRouter.post("/check", usersControler.check);

usersRouter.put("/change-password", usersControler.changePassword);

export default usersRouter;
