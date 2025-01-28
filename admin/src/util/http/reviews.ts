import { Review } from "@/types/reviews";
import { appFetchGet } from ".";

export const appReviewsGet = async (id: number) => {
  const pathname = `reviews/${id}`;

  const { reviews } = await appFetchGet<{ reviews: Review[] }>({ pathname });

  return reviews;
};

export const appReviewsProductGet = async (params?: string) => {
  const pathname = `reviews/product-reviews/${params
    ?.toString()
    .replaceAll("_", " ")}`;

  const { reviewsData, totalReviews } = await appFetchGet<{
    reviewsData: Review[];
    totalReviews: number;
  }>({ pathname });

  return { reviewsData, totalReviews };
};
