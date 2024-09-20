import { type } from "os";
import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";
import { Review } from "../../../types/reviews";

import classes from "./Rating.module.scss";

type RatingProps = {
  reviewArray: Review[];
  userRating?: number;
};

export default function Rating({ reviewArray, userRating }: RatingProps) {
  if (!reviewArray) return;

  const ratingSum = reviewArray.map((review) => {
    return review.rating;
  });

  const avarageRating = Math.floor(ratingSum[0] / reviewArray.length);

  // const ratingUser = reviewArray.map((value) => value.rating);

  const iconsArray: React.JSX.Element[] = [];
  for (let index = 1; index <= 5; index++) {
    iconsArray.push(
      (() => {
        const className =
          index <= (userRating ? userRating : avarageRating)
            ? "star star_active"
            : "star";
        return (
          <DisplayIcon
            key={index}
            iconName={IconsIdList.STAR}
            className={`${className} ${classes.icon}`}
          />
        );
      })()
    );
  }

  return <div className={classes.rating}>{"test"}</div>;
}
