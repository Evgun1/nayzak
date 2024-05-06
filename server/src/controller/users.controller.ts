import { Context } from "hono";
import prismaClient from "../prismaClient";

class UsersController {
  async getAll(c: Context) {
    const users = await prismaClient.users.findMany();

    return c.json({ users });
  }
}

export default new UsersController();
