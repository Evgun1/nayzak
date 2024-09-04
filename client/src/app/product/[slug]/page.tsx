import ProductLoop from "@/components/page-product/productLoop/ProductLoop";
import { Product } from "@/types/product";

import "./style.scss";
import ProductTabs from "@/components/page-product/ProductTabs/ProductTabs";
import { Products } from "@/hooks/useFetchProducts";
import { Reviews } from "@/hooks/useFetchReviews";
// import { useFetchProduct } from "@/hooks/fetchProducts";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await Products.useFetchOne(params.slug);

  const { reviewsData, totalReviews } = (await Reviews.useFetchProduct(
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
