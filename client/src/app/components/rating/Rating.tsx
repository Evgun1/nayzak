import { type } from "os";
import IconsIdList from "../icons/IconsIdList";
import DisplayIcon from "../icons/displayIcon";
import { ReviewsType } from "../types/reviews";

import classes from "./Rating.module.scss";

type RatingProps = {
  reviewArray: ReviewsType[];
  userRating?: number;
  width: string;
  height: string;
};

export default function Rating({
  reviewArray,
  userRating,
  height,
  width,
}: RatingProps) {
  let ratingSum = 0;
  reviewArray.forEach((review) => {
    ratingSum += review.rating;
  });
  const avarageRating = Math.floor(ratingSum / reviewArray.length);

  let ratingUser = 0;
  reviewArray.forEach((value) => (ratingUser = value.rating));

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
            height={height}
            width={width}
            className={className}
          />
        );
      })()
    );
  }

  return <div className={classes.rating}>{iconsArray}</div>;
}
