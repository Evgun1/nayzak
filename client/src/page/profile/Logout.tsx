"use client";
import classes from "./Profile.module.scss";
import { useAppDispatch } from "@/redux/redux";
import { logOutActive } from "@/redux/store/auth/action";
import { cartAction } from "@/redux/store/cart/cart";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { appCookieGet } from "@/lib/api/cookie";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

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
