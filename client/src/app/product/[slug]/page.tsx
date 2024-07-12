import ProductLoop from "@/app/components/elemets/product/productLoop/ProductLoop";
import { ProductTypes } from "@/app/components/types/products";

import "./style.scss";
import ProductTabs from "@/app/components/elemets/product/ProductTabs/ProductTabs";
import { fetchProduct } from "@/app/components/utils/fetchProducts";
import { fetchReviewsProduct } from "@/app/components/utils/fetchReviews";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await fetchProduct({ params });
  if (!product) return;

  const { reviewsData, totalReviews } = (await fetchReviewsProduct({
    params,
  })) as any;

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
