import DisplayIcon from "@/components/elements/icons/displayIcon";
import classes from "./IconsBox.module.scss";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import { title } from "process";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { TextClassList } from "@/types/textClassList.enum";

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
        <section className='section'>
            <div className='container'>
                <ul className={`${classes["icon-box__list"]}`}>
                    {CONTENT &&
                        CONTENT.length > 0 &&
                        CONTENT.map((value, index) => (
                            <li
                                key={index}
                                className={classes["icon-box__item"]}
                            >
                                <div className={classes["icon-box__content"]}>
                                    <DisplayIcon
                                        className={classes.icon}
                                        iconName={value.icon}
                                    />
                                    <div className={classes["icon-box__info"]}>
                                        <div
                                            className={
                                                ButtonClassList.BUTTON_MEDIUM
                                            }
                                        >
                                            {value.title}
                                        </div>
                                        <span
                                            className={TextClassList.REGULAR_14}
                                        >
                                            {value.span}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}
