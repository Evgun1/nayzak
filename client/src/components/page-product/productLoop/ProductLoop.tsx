import Rating from "@/components/elemets/rating/Rating";
import Price from "@/components/elemets/price/Price";
import ProductSlider from "./ProductSlider";
import { Review } from "@/types/reviews";
import { Product } from "../../../types/product";
import { TextClassList } from "../../../types/textClassList";
import classes from "./ProductLoop.module.scss";
import AddToCart from "./AddToCart";
import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs";

type ProductLoopProps = {
  productData: Product;
  reviewsArray: Review[];
  totalReviews: number;
  slug: string;
};

export default function ProductLoop({
  productData,
  reviewsArray,
  totalReviews,
  slug,
}: ProductLoopProps) {
  return (
    <div className={classes.loop}>
      <div>
        <ProductSlider />
      </div>
      <div style={{ width: 456 }}>
        <div>
          {/* <Breadcrumbs
            style={{ justifyContent: "flex-start", marginBottom: 8 }}
          /> */}
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
          <AddToCart productID={productData.id} />
        </div>
      </div>
    </div>
  );
}
