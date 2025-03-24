import { Context } from "hono";
import ReviewsService from "./reviews.service";
import { QueryParameterTypes } from "../utils/service/service.type";
import getReqBody from "../tools/getReqBody";
import reviewsService from "./reviews.service";
import clearCache from "../utils/clear-cache/ClearCache";

class ReviewsController {
    async getAll(c: Context) {
        const queryParams = c.req.query() as QueryParameterTypes;

        const { reviews, reviewsCount } =
            await ReviewsService.getAll(queryParams);

        c.res.headers.append("X-Total-Count", reviewsCount.toString());

        return c.json(reviews);
    }

    async getAllReviewsOneProduct(c: Context) {
        const { productName } = c.req.param();

        const { reviews, reviewsCount } =
            await ReviewsService.getAllReviewsByProduct(productName as string);

        c.res.headers.append("X-Total-Count", reviewsCount.toString());

        return c.json(reviews);
    }

    async getAllProductReviews(c: Context) {
        const { productId } = c.req.param() as { productId: string };

        const reviews = await ReviewsService.getAllProductReviews(productId);

        return c.json(reviews);
    }

    async uploadReviews(c: Context) {
        const body = (await getReqBody(c)) as UploadReviewsItem;

        const reviews = await reviewsService.uploadReviews(body);

        await clearCache("reviews");
        return c.json(reviews);
    }
}

export default new ReviewsController();
