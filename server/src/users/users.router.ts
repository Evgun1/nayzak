import { Context, Hono, Next } from "hono";
import appRouter from "../router";

import { validator } from "hono/validator";
import UserFromValidator from "./validator/user-from.validator";
import usersMiddleware from "./users.middleware";
import usersControler from "./users.controler";

const usersRouter = new Hono();

usersRouter.post(
  "/registration",
  validator("form", UserFromValidator),
  // usersMiddleware.registration,
  usersControler.registration
);
// usersRouter.post(
//   "/registration",
//   validator("form", UserFromValidator),
//   UsersControler.registration
// );

usersRouter.get("/active/:link ", usersControler.active);

usersRouter.post("/login", usersControler.login);

usersRouter.use("/check", usersControler.check);

export default usersRouter;
