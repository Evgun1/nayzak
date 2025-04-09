"use client";
import ButtonCustom from "@/lib/ui/custom-elements/button-custom/ButtonCustom";
import classes from "./Profile.module.scss";
import { useAppDispatch } from "@/lib/redux/redux";
import { logOutActive } from "@/lib/redux/store/auth/action";
import { cartAction } from "@/lib/redux/store/cart/cart";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { appCookieGet } from "@/utils/http/cookie";

const Logout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const btnLogOutHandler = () => {
        dispatch(logOutActive());
        dispatch(cartAction.cleanCart());
        router.push("/");
    };

    useEffect(() => {
        const userToken = appCookieGet("user-token");

        if (!userToken) {
            redirect("/");
        }
    }, []);

    return (
        <ButtonCustom
            styleSettings={{
                type: "TEXT",
                color: "DARK",
                size: "MEDIUM",
            }}
            className={classes["profile-navigation__button"]}
            onClick={btnLogOutHandler}
        >
            Logout
        </ButtonCustom>
    );
};

export default Logout;
