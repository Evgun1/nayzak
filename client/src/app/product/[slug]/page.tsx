import "./style.scss";
import { appOneProductGet } from "@/utils/http/products";
import { appReviewsProductGet } from "@/utils/http/reviews";
import ProductLoop from "@/components/page-product/productLoop/ProductLoop";
import ProductTabs from "@/components/page-product/ProductTabs/ProductTabs";

export default async function page({ params }: { params: { slug: string } }) {
  const product = await appOneProductGet(params.slug);

  const { reviewsData, totalReviews } = (await appReviewsProductGet(
    params.slug,
  )) as any;

  return (
    <div className="wrapper">
      {product ? (
        <>
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
        </>
      ) : (
        <div>Product not Found</div>
      )}
    </div>
  );
}

const productData = () => {};
