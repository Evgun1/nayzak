import Link from "next/link";
import { ButtonClassList } from "../types/buttonClassList";
import { TextClassList } from "../types/textClassList";
import { ProductTypes } from "../types/products";
import { FC, useEffect, useState } from "react";

import classes from "./ProductPreview.module.scss";
import Price from "../price/Price";
import { fetchReviews } from "../utils/fetchReviews";
import Rating from "../rating/Rating";
import { ReviewsType } from "../types/reviews";
import { useSearchParams } from "next/navigation";
import AddToCart from "../elemets/product/productLoop/AddToCart";
import ButtonCustom from "../button-custom/ButtonCustom";

type ProductPreviewProps = {
  product: ProductTypes;
  rating?: boolean;
  style?: string;
  stylePrice?: string;
};

const ProductPreview: FC<ProductPreviewProps> = ({
  product,
  rating,
  style,
  stylePrice,
}) => {
  const searchParams = useSearchParams();
  const productTitle = product.title.replaceAll(" ", "_");
  const [reviewsArray, setReviewsArray] = useState<ReviewsType[]>([]);

  const list_type = searchParams.get("list_type");

  const reviewData = async () => {
    const { reviewsData } = await fetchReviews({
      id: product.id,
    });

    setReviewsArray(reviewsData);
  };

  useEffect(() => {
    reviewData();
  }, []);

  return list_type !== "list" ? (
    <Link
      className={`${style} ${classes.card}`}
      href={`/product/${productTitle}`}
    >
      <img
        className={classes["img"]}
        src="https://placehold.co/652x889"
        alt=""
      />
      <div className={classes["card__content"]}>
        {rating && <Rating reviewArray={reviewsArray} />}
        <div
          className={`${classes["card__content-title"]} ${ButtonClassList.BUTTON_SMALL}`}
        >
          {product.title}
        </div>
        <Price
          style={stylePrice}
          price={product.price}
          mainPrice={product.mainPrice}
          classBasePrice={TextClassList.SEMIBOLD_14}
          classOldPrice={TextClassList.REGULAR_14}
        />
      </div>
    </Link>
  ) : (
    <div
      className={classes["card-list_type"]}
      // href={`/product/${productTitle}`}
    >
      <Link href={`/product/${productTitle}`}>
        <img
          className={classes["img"]}
          src="https://placehold.co/652x889"
          alt=""
        />
      </Link>
      <div>
        <div className={classes["card-list_type--info"]}>
          <Link
            href={`/product/${productTitle}`}
            className={`${classes["card-list_type--info-elemet"]} ${ButtonClassList.BUTTON_MEDIUM}`}
          >
            {product.title}
          </Link>
          <Price
            style={` ${classes["card-list_type--info-elemet"]} ${stylePrice}`}
            price={product.price}
            mainPrice={product.mainPrice}
            classBasePrice={TextClassList.SEMIBOLD_14}
            classOldPrice={TextClassList.REGULAR_14}
          />
          <div className={`${classes["card-list_type--info-elemet"]}`}>
            {rating && <Rating reviewArray={reviewsArray} />}
          </div>
          <div
            className={`${classes["card-list_type--info-elemet"]} ${TextClassList.REGULAR_16}`}
          >
            {product.description}
          </div>
        </div>
        <ButtonCustom.SiteButton
          className={`${classes["card-list_type--price"]}`}
          element={{ button: () => {} }}
          size={ButtonCustom.Size.XS}
          type={ButtonCustom.Type.default}
          roundess={ButtonCustom.Roundness.rounded}
          color={ButtonCustom.Color.light}
        >
          Add to cart
        </ButtonCustom.SiteButton>
      </div>
    </div>
  );
};

export default ProductPreview;
