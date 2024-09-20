import { Context, Next } from "hono";
import usersService from "./users.service";
import { HTTPException } from "hono/http-exception";
import _default from "hono/jsx";
import UserGetDTO from "./interface/UserGetInput";

class UsersControler {
  async registration(c: Context, next: Next) {
    const inputData = await c.req.parseBody();

    console.log(inputData);

    const userToken = await usersService.registration(inputData);

    return c.json(userToken);
  }

  async login(c: Context) {
    const inputData = await c.req.json<UserGetDTO>();

    const userData = await usersService.login(inputData);

    return c.json(userData);
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
}

export default new UsersControler();
