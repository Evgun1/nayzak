"use client";

import classes from "./Actions.module.scss";

import { useAppDispatch, useAppSelector } from "@/lib/redux/redux";

import PopupSearch from "../popup-search/PopupSearch";
import { popupActions } from "@/lib/redux/store/popup/popup";
import PopupAuth from "../popup-auth/PopupAuth";
import PopupError from "../popup-error/PopupError";
import { ButtonCustom } from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import { appCookieGet } from "@/utils/http/cookie";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";

export default function Actions() {
    const dispatch = useAppDispatch();
    const cartAmount = useAppSelector((selector) => selector.cart.totalAmount);
    const userData = useAppSelector((selector) => selector.auth.credentials);

    const token = appCookieGet("user-token");

    const btnAuthHandler = () => {
        dispatch(popupActions.toggle(<PopupAuth />));
    };
    const btnSearchHandler = () =>
        dispatch(popupActions.toggle(<PopupSearch />));
    const btnClickCart = () => {
        dispatch(
            popupActions.toggle(
                <PopupError title='You need to log in to the site' />
            )
        );
    };

    if (userData) {
        setTimeout(() => {
            dispatch(popupActions.toggle(null));
        }, 500);
    }

    // useEffect(() => {
    //   dispatch(checkAuth());
    //   dispatch(initWishlist());
    //   dispatch(initCart());
    // }, [dispatch, token]);

    return (
        <div className={classes["header-actions"]}>
            <ButtonCustom
                styleSettings={{
                    type: "TEXT",
                    color: "DARK",
                    size: "LARGE",
                    icon: { left: "SEARCH" },
                }}
                className={classes["header-actions__button"]}
                onClick={btnSearchHandler}
            />

            <LinkCustom
                href={{ endpoint: userData !== null ? "/profile" : "#" }}
                onClick={userData !== null ? () => {} : btnAuthHandler}
                styleSettings={{
                    roundness: "ROUNDED",
                    fill: "SOLID",
                    color: "DARK",
                    icon: { left: "USER" },
                    type: "TEXT",
                    size: "LARGE",
                }}
                className={classes["header-actions__button"]}
            />

            <LinkCustom
                href={{ endpoint: !userData ? "#" : "/cart" }}
                styleSettings={{
                    roundness: "ROUNDED",
                    color: "DARK",
                    icon: { left: "CART" },
                    type: "TEXT",
                    size: "LARGE",
                }}
                className={classes["header-actions__button"]}
            >
                {cartAmount !== 0 && (
                    <span className={classes["header-actions__amount"]}>
                        {cartAmount}
                    </span>
                )}
            </LinkCustom>
        </div>
    );
}
