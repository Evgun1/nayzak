import { Review } from "../types/reviews";

type fetchReviewProps = {
  id?: number;
};
export const useFetchReviews = async ({ id }: fetchReviewProps) => {
  const res = await fetch(`http://localhost:3030/reviews/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result = await res.json();

  const reviewsData: Review[] = result.reviews;

  return { reviewsData };
};

type fetchReviewProductProps = {
  params: { slug: string };
};

export const useFetchReviewsProduct = async ({
  params,
}: fetchReviewProductProps) => {
  if (!params) return;
  const slug = params.slug.replaceAll("_", " ");

  const res = await fetch(
    `http://localhost:3030/reviews/product-reviews/${slug}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText);
  }

  const result = await res.json();

  const reviewsData = result.reviews;
  const totalReviews = result.totalReviews;

  return { reviewsData, totalReviews };
};
