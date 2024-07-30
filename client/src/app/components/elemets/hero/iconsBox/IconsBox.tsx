import DisplayIcon from "@/app/components/icons/displayIcon";
import classes from "./IconsBox.module.scss";
import IconsIdList from "@/app/components/icons/IconsIdList";
import { title } from "process";
import { ButtonClassList } from "@/app/components/types/buttonClassList";
import { TextClassList } from "@/app/components/types/textClassList";

const CONTENT = [
  {
    icon: IconsIdList.TRUCK,
    title: "Free Shipping",
    span: "Orders above $200",
  },

  {
    icon: IconsIdList.MONEY,
    title: "Money-back",
    span: "30 day Guarantee ",
  },

  {
    icon: IconsIdList.PHONE,
    title: "Premium Support",
    span: "Phone and email support",
  },

  {
    icon: IconsIdList.LOCK,
    title: "Secure Payments",
    span: "Secured by Stripe",
  },
];

export default function IconsBox() {
  return (
    <ul className={`container ${classes.wrapper}`}>
      {CONTENT &&
        CONTENT.length > 0 &&
        CONTENT.map((value, index) => (
          <li key={index} className={classes.wrapper__list}>
            <DisplayIcon className={classes.icon} iconName={value.icon} />
            <div className={classes["wrapper__block-info"]}>
              <div className={ButtonClassList.BUTTON_MEDIUM}>{value.title}</div>
              <span className={TextClassList.REGULAR_14}>{value.span}</span>
            </div>
          </li>
        ))}
    </ul>
  );
}
