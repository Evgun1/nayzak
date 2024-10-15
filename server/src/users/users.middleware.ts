import bcrypt from "bcrypt";

import { Context, Next } from "hono";
import UserGetDTO from "./interface/UserGetInput";
import { HTTPException } from "hono/http-exception";
import { decode } from "hono/jwt";
import prismaClient from "../prismaClient";
import { use } from "hono/jsx";

class UsersMiddleware {
  async registration(c: Context, next: Next) {
    const userToken = c.req.header("authorization");

    if (!userToken) throw new HTTPException(400, { message: "Token missing" });

    const {
      payload: { email },
    }: { payload: UserGetDTO } = decode(userToken);

    const user = await prismaClient.users.findFirst({
      where: { email: email },
    });

    if (user) throw new HTTPException(409, { message: `Email already exists` });

    await next();
  }

  async login(c: Context, next: Next) {
    const userToken = c.req.header("authorization");

    if (!userToken) throw new HTTPException(400, { message: "Token missing" });

    const {
      payload: { email, password },
    }: { payload: UserGetDTO } = decode(userToken);

    const user = await prismaClient.users.findFirst({
      where: { email: email },
    });

    if (!user) throw new HTTPException(409, { message: `User not found` });

    const isPasswordEquals = await bcrypt.compare(
      password as string,
      user.password
    );

    if (!isPasswordEquals)
      throw new HTTPException(401, { message: "Incorrect password" });

    await next();
  }

  async active(c: Context, next: Next) {
    const { link } = c.req.param();

    const user = await prismaClient.users.findFirst({
      where: { activationLink: link },
    });

    if (!user)
      throw new HTTPException(400, { message: "Invalid activation link" });

    await next();
  }

  async changePassword(c: Context, next: Next) {}
}

export default new UsersMiddleware();
