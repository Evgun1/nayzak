import Rating from "@/app/components/rating/Rating";
import Price from "@/app/components/price/Price";
import ProductSlider from "./ProductSlider";
import Breadcrumbs from "../../../breadcrumbs/Breadcrumbs";
import { ReviewsType } from "@/app/components/types/reviews";
import { ProductTypes } from "../../../types/products";
import { TextClassList } from "../../../types/textClassList";
import classes from "./ProductLoop.module.scss";
import AddToCart from "./AddToCart";

type ProductLoopProps = {
  productData: ProductTypes;
  reviewsArray: ReviewsType[];
  totalReviews: number;
};

export default function ProductLoop({
  productData,
  reviewsArray,
  totalReviews,
}: ProductLoopProps) {
  return (
    <div className={classes.loop}>
      <div>
        <ProductSlider />
      </div>
      <div style={{ width: 456 }}>
        <div>
          <Breadcrumbs
            style={{ justifyContent: "flex-start", marginBottom: 8 }}
          />
          <div className={classes.loop__header}>
            <div className={classes["loop__header-info"]}>
              <h5>{productData.title}</h5>
              <p className={TextClassList.REGULAR_14}>
                {productData.description}
              </p>
              <div className={classes["loop__header-info_rating"]}>
                <Rating reviewArray={reviewsArray} height="16" width="16" />
                <span className={TextClassList.REGULAR_12}>
                  {totalReviews} Reviews
                </span>
              </div>
            </div>
            <div
              className={`${classes["loop__header-price"]} ${TextClassList.SEMIBOLD_26}`}
            >
              <Price
                price={productData.price}
                discountPercentage={productData.discount}
              />
            </div>
          </div>
          {/* <div>Swatches</div> */}
          <AddToCart />
        </div>
      </div>
    </div>
  );
}
