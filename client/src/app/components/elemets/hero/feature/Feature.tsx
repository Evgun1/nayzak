import { TextClassList } from "@/app/components/types/textClassList";
import classes from "./Feature.module.scss";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import IconsIdList from "@/app/components/icons/IconsIdList";
import Link from "next/link";
import DisplayIcon from "@/app/components/icons/displayIcon";

export default function Feature() {
  return (
    <div className={`container ${classes.wrapper} `}>
      <div className={classes.wrapper__block}>
        <div className={classes["wrapper__block-title"]}>
          <span className={TextClassList.SEMIBOLD_16}>New Arrivals</span>
          <h3>Made from the finest materials</h3>
        </div>
        <p className={TextClassList.REGULAR_18}>
          Keep your everyday style chic and on-trend with our selection 20+
          styles to choose from.
        </p>
        <Link href={"/"} className={classes["wrapper__block-link"]}>
          <div className={`${ButtonClassList.BUTTON_SMALL}`}>
            See Collection
          </div>
          <DisplayIcon iconName={IconsIdList.ARROW} width="20" height="20" />
        </Link>
      </div>
    </div>
  );
}
