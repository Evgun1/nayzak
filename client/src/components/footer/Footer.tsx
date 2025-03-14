"use server";
import IconsIdList from "../elements/icons/IconsIdList";
import DisplayIcon from "../elements/icons/displayIcon";
import classes from "./Footer.module.scss";
import { TextClassList } from "../../types/textClassList.enum";
import Social from "./Social";
import Columns from "./Columns";

export default async function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={classes.footer}>
            <div className='container'>
                <div className={classes["footer__info-wrap"]}>
                    <div className={classes[`footer__info`]}>
                        <DisplayIcon
                            className={classes["footer__info-logo"]}
                            iconName={IconsIdList.LOGOTYPE}
                        />
                        <div
                            className={`${classes["footer__info-paragraph"]} ${TextClassList.REGULAR_16}`}
                        >
                            Phosf luorescently engage worldwide method process
                            shopping.
                        </div>
                        <Social />
                    </div>
                    <Columns />
                </div>
                <div className={classes["footer__nav-wrap"]}>
                    <div className={TextClassList.REGULAR_14}>
                        © {year} Nayzak Design
                    </div>
                    <div className={classes[`footer__nav`]}>
                        <div>Language</div>
                        <div>Currency</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
