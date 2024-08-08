import ProductLoop from "@/components/elemets/product/productLoop/ProductLoop";
import { ProductTypes } from "@/components/types/products";

import "./style.scss";
import ProductTabs from "@/components/elemets/product/ProductTabs/ProductTabs";
import { fetchProduct } from "@/components/utils/fetchProducts";
import { fetchReviewsProduct } from "@/components/utils/fetchReviews";

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
