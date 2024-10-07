"use client";

import Link from "next/link";
import { ButtonClassList } from "../../../types/buttonClassList";
import { TextClassList } from "../../../types/textClassList";
import { Product } from "../../../types/product";
import { FC, useEffect, useState } from "react";

import classes from "./ProductPreview.module.scss";
import Price from "../price/Price";
import Rating from "../rating/Rating";
import { Review } from "../../../types/reviews";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";
import { appReviewsGet } from "@/utils/http/reviews";

type ProductPreviewProps = {
  product: Product;
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
  const [reviewsArray, setReviewsArray] = useState<Review[]>([]);

  const list_type = searchParams.get("list_type");

  const ReviewData = async (id: number) => {
    const rewies = await appReviewsGet(id);
    setReviewsArray(rewies);
  };

  useEffect(() => {
    ReviewData(product.id);
  }, [product.id]);

  return list_type !== "list" ? (
    <Link
      className={`${style} ${classes.card}`}
      href={`/product/${productTitle}`}
    >
      <img
        className={classes["img"]}
        src="https://placehold.co/652x889"
        alt="product"
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
    <div className={classes["card-list_type"]}>
      <Link href={`/product/${productTitle}`}>
        <img
          className={classes["img"]}
          src="https://placehold.co/652x889"
          alt="product"
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
          styleSettings={{
            color: { dark: true },
            roundess: ButtonCustom.Roundness.rounded,
            size: ButtonCustom.Size.XL,
            type: ButtonCustom.Type.default,
          }}
        >
          Add to cart
        </ButtonCustom.SiteButton>
      </div>
    </div>
  );
};

export default ProductPreview;
