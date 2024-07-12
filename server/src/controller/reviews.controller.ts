import { Context } from "hono";
import prismaClient from "../prismaClient";

class ReviewsController {
  async getAll(c: Context) {
    const reviews = await prismaClient.reviews.findMany();

    const totalReviews = await prismaClient.reviews.count();

    return c.json({ reviews, totalReviews });
  }

  async getAllReviewsOneProduct(c: Context) {
    const { productName } = c.req.param();


    let producId;
    const products = await prismaClient.products.findMany({
      where: { title: productName },
    });
    products.map((value) => (producId = value.id));

    const reviews = await prismaClient.reviews.findMany({
      where: { product_id: producId },
    });

    const totalReviews = await prismaClient.reviews.count({
      where: { product_id: producId },
    });
    return c.json({ reviews, totalReviews });
  }

  async getAllProductReviews(c: Context) {
    const { productId } = c.req.param();

    const reviews = await prismaClient.reviews.findMany({
      where: { product_id: parseInt(productId) },
    });


    return c.json({ reviews });
  }
}

export default new ReviewsController();
