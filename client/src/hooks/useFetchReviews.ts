import { Review } from "../types/reviews";

export namespace Reviews {
  export const useFetchAll = async (id?: number) => {
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

  export const useFetchProduct = async (params: string) => {
    if (!params) return;

    const res = await fetch(
      `http://localhost:3030/reviews/product-reviews/${params.replaceAll(
        "_",
        " "
      )}`,
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
}
