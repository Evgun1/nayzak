import ProductLoop from "@/components/page-product/productLoop/ProductLoop";
import { Product } from "@/types/product";

import "./style.scss";
import ProductTabs from "@/components/page-product/ProductTabs/ProductTabs";
import { useFetchReviewsProduct } from "@/hooks/useFetchReviews";
import { useFetchProduct } from "@/hooks/useFetchProducts";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await useFetchProduct({ params });
  if (!product) return;

  const { reviewsData, totalReviews } = (await useFetchReviewsProduct({
    params,
  })) as any;

  return (
    <div className="wrapper">
      <ProductLoop
        slug={params.slug}
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
