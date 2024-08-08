import Rating from "@/components/rating/Rating";
import Price from "@/components/price/Price";
import ProductSlider from "./ProductSlider";
import Breadcrumbs from "../../../breadcrumbs/Breadcrumbs";
import { ReviewsType } from "@/components/types/reviews";
import { ProductTypes } from "../../../types/products";
import { TextClassList } from "../../../types/textClassList";
import classes from "./ProductLoop.module.scss";
import AddToCart from "./AddToCart";
import ProductList from "@/components/products-list/ProductList";

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
                <Rating reviewArray={reviewsArray} />
                <span className={TextClassList.REGULAR_12}>
                  {totalReviews} Reviews
                </span>
              </div>
            </div>
            <div
              className={`${classes["loop__header-price"]} ${TextClassList.SEMIBOLD_26}`}
            >
              <Price
                discount={productData.discount}
                mainPrice={productData.mainPrice}
                price={productData.price}
              />
            </div>
          </div>
          <AddToCart hideQuantity={true} />
        </div>
      </div>
    </div>
  );
}
