import { Context, Next } from "hono";
import usersService from "./users.service";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import _default from "hono/jsx";

class UsersControler {
  async registration(c: Context, next: Next) {
    const { email, password } = await c.req.parseBody();
    const userData = await usersService.registration(
      email.toString() as string,
      password.toString() as string
    );

    const refreshToken = userData?.refreshToken;

    if (refreshToken) {
      setCookie(c, "refreshtoken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
      });
    }

    return c.json(userData);

    // throw new HTTPException(400, {
    //   message: "The email address is entered incorrectly",
    // });

    // console.log(error);
  }
  async login(c: Context) {}
  async logout(c: Context) {}
  async active(c: Context) {
    const { link } = c.req.param();
    await usersService.activate(link);

    return c.redirect(`${process.env.CLIENT_URL}`);
  }
  async refresh(c: Context) {}
  async getUsers(c: Context) {}
}

export default new UsersControler();
