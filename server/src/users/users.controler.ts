import { Context } from "hono";
import usersService from "./users.service";
import { setCookie } from "hono/cookie";

class UsersControler {
  async registration(c: Context) {
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
  }
  async login(c: Context) {}
  async logout(c: Context) {}
  async active(c: Context) {}
  async refresh(c: Context) {}
  async getUsers(c: Context) {}
}

export default new UsersControler();
