import { Context, Next } from "hono";
import usersService from "./users.service";
import { HTTPException } from "hono/http-exception";
import _default from "hono/jsx";
import UserGetDTO from "./interface/UserGetInput";
import { email } from "../utils/validator";

class UsersControler {
  async registration(c: Context, next: Next) {
    const token = c.req.header("authorization");
    if (!token) return;
    const userToken = await usersService.registration(token);

    return c.json({ userToken });
  }

  async login(c: Context) {
    const token = c.req.header("authorization");
    if (!token) return;
    const userToken = await usersService.login(token);

    return c.json(userToken);
  }

  async active(c: Context) {
    const { link } = c.req.param();
    await usersService.activate(link);

    return c.redirect(`${process.env.CLIENT_URL}`);
  }

  async check(c: Context) {
    const authorization = c.req.header("Authorization");

    if (!authorization) {
      throw new HTTPException(401, { message: "Not authorized" });
    }

    const newToken = await usersService.check(authorization);

    return c.json(newToken);
  }

  async changePassword(c: Context) {
    const token = c.req.header("authorization");

    if (!token) return;
  }
}

export default new UsersControler();
