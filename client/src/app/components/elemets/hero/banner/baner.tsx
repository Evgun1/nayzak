import Image from "next/image";
import Link from "next/link";
import classes from "./banner.module.scss";
import DisplayIcon from "@/app/components/icons/displayIcon";
import IconsIdList from "@/app/components/icons/IconsIdList";
import { TextClassList } from "@/app/components/types/textClassList";
import { ButtonClassList } from "@/app/components/types/buttonClassList";

const Banner = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__block}>
        <div className={classes["wrapper__block-content"]}>
          <span className={TextClassList.SEMIBOLD_16}>New Arrivals</span>
          <h3>Your dream shop is a click away.</h3>
          <p className={TextClassList.REGULAR_18}>
            Keep your everyday style chic and on-trend with our selection 20+
            styles to choose from.
          </p>
        </div>
        <Link href={"/"} className={classes["wrapper__block-link"]}>
          <div className={`${ButtonClassList.BUTTON_SMALL}`}>
            See Collection
          </div>
          <DisplayIcon iconName={IconsIdList.ARROW} width="20" height="20" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
