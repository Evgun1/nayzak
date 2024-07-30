import { title } from "process";
import IconsIdList from "../../icons/IconsIdList";
import DisplayIcon from "../../icons/displayIcon";
import classes from "./Footer.module.scss";
import Link from "next/link";
import { ButtonClassList } from "../../types/buttonClassList";
import { TextClassList } from "../../types/textClassList";

const FOOTER_DATA = [
  {
    title: "Shop",
    item: [
      { title: "My account" },
      { title: "Login" },
      { title: "Wishlist" },
      { title: "Cart" },
    ],
  },
  {
    title: "Information",
    item: [
      { title: "Shipping Policy" },
      { title: "Returns & Refunds" },
      { title: "Cookies Policy" },
      { title: "Frequently asked" },
    ],
  },
  {
    title: "Company",
    item: [
      { title: "About us" },
      { title: "Privacy Policy" },
      { title: "Terms & Conditions" },
      { title: "Contact Us" },
    ],
  },
];

const ICONS_ARRAY = [
  { icon: IconsIdList.FACEBOOK },
  { icon: IconsIdList.INSTAGRAM },
  { icon: IconsIdList.TWITTER },
  { icon: IconsIdList.EMAIL },
];

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={`container`}>
        <div className={classes.footer__contact}>
          <div className={classes[`footer__contact-main`]}>
            <div className={classes[`footer__contact-main-title`]}>
              <DisplayIcon
                className={classes["icon-logo"]}
                iconName={IconsIdList.LOGOTYPE}
                width="155"
                height="30"
              />
              <div className={TextClassList.REGULAR_16}>
                Phosf luorescently engage worldwide method process shopping.
              </div>
            </div>
            <div className={classes[`footer__contact-main-icons`]}>
              {ICONS_ARRAY &&
                ICONS_ARRAY.length > 0 &&
                ICONS_ARRAY.map((value, index) => (
                  <div key={index}>
                    <DisplayIcon
                      className={classes["icon-social"]}
                      iconName={value.icon}
                      width="18"
                      height="18"
                    />
                  </div>
                ))}
            </div>
          </div>
          {FOOTER_DATA &&
            FOOTER_DATA.length &&
            FOOTER_DATA.map((value, index) => (
              <div key={index} className={classes[`footer__contact-element`]}>
                <div
                  className={`${ButtonClassList.BUTTON_XSMALL}  ${
                    classes[`footer__contact-element-title`]
                  }`}
                >
                  {value.title}
                </div>
                <ul className={classes[`footer__contact-element-list`]}>
                  {value.item &&
                    value.item.length &&
                    value.item.map((valueItem, index) => (
                      <li key={index}>
                        <Link className={TextClassList.REGULAR_14} href={"/"}>
                          {valueItem.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        <div className={classes.footer__botton}>
          <div className={TextClassList.REGULAR_14}>© 2088 Nayzak Design</div>
          <div className={classes[`footer__botton-nav`]}>
            <div>Language</div>
            <div>Currency</div>
          </div>
        </div>
      </div>
    </div>
  );
}
