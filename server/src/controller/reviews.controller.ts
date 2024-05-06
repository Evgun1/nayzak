import { Context } from "hono";
import prismaClient from "../prismaClient";

class ReviewsController {
  async getAll(c: Context) {
    const reviews = await prismaClient.reviews.findMany();
    return c.json({ reviews });
  }
}

export default new ReviewsController();
