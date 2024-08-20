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
            className={`${className} ${classes.icon}`}
          />
        );
      })()
    );
  }

  return <div className={classes.rating}>{iconsArray}</div>;
}
