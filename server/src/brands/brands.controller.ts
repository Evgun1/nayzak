import { Context } from "hono";
import prismaClient from "../prismaClient";

class BrnadsController {
  async getAll(c: Context) {
    const brands = await prismaClient.brands.findMany();

    return c.json({ brands });
  }
}

export default new BrnadsController();
