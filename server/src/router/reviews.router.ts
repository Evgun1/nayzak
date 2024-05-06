import { Hono } from "hono";
import ReviewsController from "../controller/reviews.controller";

const reviewsRouter = new Hono();

reviewsRouter.get("/", ReviewsController.getAll);

export default reviewsRouter;
