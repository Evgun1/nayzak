"use client";

import { useState } from "react";
import classes from "./ProductTabs.module.scss";
import { Product } from "@/types/product";
import { TextClassList } from "@/types/textClassList";
import { Review } from "@/types/reviews";
import { log } from "console";
import DisplayIcon from "@/components/elemets/icons/displayIcon";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import Rating from "@/components/elemets/rating/Rating";

type ProductTabProps = {
  productData: Product;
  reviewArray: Review[];
  totalReviews: number;
};

export default function ProductTabs({
  productData,
  reviewArray,
  totalReviews,
}: ProductTabProps) {
  const [tabAction, setTabaAction] = useState<number>(0);

  return (
    <div className={classes.tabs}>
      <div className={classes.tabs__menu}>
        <button
          onClick={() => setTabaAction(0)}
          className={`h7  ${classes.tab} ${
            tabAction === 0 ? classes.tab_action : undefined
          } `}
        >
          Description
        </button>
        <button
          onClick={() => setTabaAction(1)}
          className={`h7  ${classes.tab} ${
            tabAction === 1 ? classes.tab_action : undefined
          }`}
        >
          Additional Info
        </button>
        <button
          onClick={() => setTabaAction(2)}
          className={`h7  ${classes.tab} ${
            tabAction === 2 ? classes.tab_action : undefined
          }`}
        >
          Reviews
        </button>
      </div>
      <div className={classes.tabs__info}>
        {tabAction === 0 && (
          <div className={classes.tab__description}>
            <p className={TextClassList.REGULAR_18}>
              {productData.description}
            </p>
            <div className={classes["tab__description-info"]}>
              <div className="h7">Information</div>
              <ul className={classes["tab__description-list"]}>
                <li className={TextClassList.REGULAR_18}>text</li>
                <li className={TextClassList.REGULAR_18}>text</li>
                <li className={TextClassList.REGULAR_18}>text</li>
                <li className={TextClassList.REGULAR_18}>text</li>
              </ul>
            </div>
          </div>
        )}
        {tabAction === 1 && (
          <div className={classes["tab__info-grid"]}>
            <span
              className={`${TextClassList.SEMIBOLD_18} ${classes["tab__info-title"]}`}
            >
              SIZE
            </span>
            <span
              className={`${TextClassList.REGULAR_18} ${classes["tab__info-value"]}`}
            >
              Value
            </span>

            <span
              className={`${TextClassList.SEMIBOLD_18} ${classes["tab__info-title"]}`}
            >
              COLOR
            </span>
            <span
              className={`${TextClassList.REGULAR_18} ${classes["tab__info-value"]}`}
            >
              Value
            </span>

            <span
              className={`${TextClassList.SEMIBOLD_18} ${classes["tab__info-title"]}`}
            >
              WEIGHT
            </span>
            <span
              className={`${TextClassList.REGULAR_18} ${classes["tab__info-value"]}`}
            >
              Value
            </span>
          </div>
        )}
        {tabAction === 2 && (
          <div className={classes.tab__reviews}>
            <div className={classes["tab__reviews-header"]}>
              <h5>Customer reviews</h5>
              <div className={classes["tab__reviews-header_wrapperRating"]}>
                <div
                  className={`${TextClassList.REGULAR_12} ${classes["tab__reviews-header_rating"]}`}
                >
                  <Rating reviewArray={reviewArray} />
                  {totalReviews} total Reviews
                </div>
                <button>Write reviews</button>
              </div>
            </div>
            <ul className={classes["tab__reviews-cards"]}>
              {reviewArray && reviewArray.length > 0 ? (
                reviewArray.map((value, index) => (
                  <li key={index}>
                    <div className={classes["reviewCard"]}>
                      <div className={classes["reviewCard__user"]}>
                        <img
                          className={classes["reviewCard__user-avatar"]}
                          src="https://placehold.co/76"
                          alt=""
                        />
                        <div>
                          <div className={classes["reviewCard__user-title"]}>
                            <span className={`${TextClassList.SEMIBOLD_18}`}>
                              User Name
                            </span>
                            <span className={TextClassList.REGULAR_14}>
                              data create review
                            </span>
                          </div>
                          <span className={classes["reviewCard__user-rating"]}>
                            <Rating
                              reviewArray={reviewArray}
                              userRating={value.rating}
                            />
                          </span>
                        </div>
                      </div>
                      <p
                        className={`${TextClassList.REGULAR_18} ${classes.reviewCard__paragraph}`}
                      >
                        {value.text}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <div className={classes["reviewCard"]}>Not find reviews</div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
