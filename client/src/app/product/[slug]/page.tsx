import ProductLoop from "@/components/page-product/productLoop/ProductLoop";

import "./style.scss";
import ProductTabs from "@/components/page-product/ProductTabs/ProductTabs";
import { appReviewsProductGet } from "@/utils/http/reviews";
import { appOneProductGet } from "@/utils/http/products";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await appOneProductGet(params.slug.replaceAll("_", " "));

  const { reviewsData, totalReviews } = (await appReviewsProductGet(
    params.slug
  )) as any;

  return (
    <div className="wrapper">
      <ProductLoop
        productData={product}
        reviewsArray={reviewsData}
        totalReviews={totalReviews}
      />
      <ProductTabs
        productData={product}
        reviewArray={reviewsData}
        totalReviews={totalReviews}
      />
    </div>
  );
}

const productData = () => {};
