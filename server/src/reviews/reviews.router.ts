import { Hono } from "hono";
import ReviewsController from "./reviews.controller";

const reviewsRouter = new Hono();

reviewsRouter.get("/", ReviewsController.getAll);
reviewsRouter.get(
  "/product-reviews/:productName",
  ReviewsController.getAllReviewsOneProduct,
);
reviewsRouter.get("/:productId", ReviewsController.getAllProductReviews);

export default reviewsRouter;
