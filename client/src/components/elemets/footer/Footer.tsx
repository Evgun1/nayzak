import { title } from "process";
import IconsIdList from "../../icons/IconsIdList";
import DisplayIcon from "../../icons/displayIcon";
import classes from "./Footer.module.scss";
import Link from "next/link";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";
import Social from "./Social";
import Colums from "./Colums";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes["footer--row"]}>
          <div className={classes[`footer--info`]}>
            <DisplayIcon
              className={classes["footer--info-logo"]}
              iconName={IconsIdList.LOGOTYPE}
            />
            <div
              className={`${classes["footer--info-paragraph"]} ${TextClassList.REGULAR_16}`}
            >
              Phosf luorescently engage worldwide method process shopping.
            </div>
            <Social />
          </div>
          <Colums />
        </div>
        <div className={classes.footer__bottom}>
          <div className={TextClassList.REGULAR_14}>© 2088 Nayzak Design</div>
          <div className={classes[`footer__bottom-nav`]}>
            <div>Language</div>
            <div>Currency</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
