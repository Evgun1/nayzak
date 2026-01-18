"use client";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import classes from "./Avatar.module.scss";
import Image from "next/image";
import { FunctionComponent } from "react";
import { useAppDispatch } from "@/redux/redux";
import { logOutActive } from "@/redux/store/auth/action";
import { cartAction } from "@/redux/store/cart/cart";
import { useRouter } from "next/navigation";

interface AvatarProps {}

const Avatar: FunctionComponent<AvatarProps> = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const btnLogOutHandler = () => {
		dispatch(logOutActive());
		dispatch(cartAction.cleanCart());
		router.push("/");
	};

	return (
		<div className={classes["avatar"]}>
			<div className={classes["avatar__content"]}>
				<Image
					src={"https://placehold.co/100"}
					alt="user avatar"
					fill
				/>
				<ButtonCustom
					className={classes["avatar__content-btn"]}
					styleSettings={{
						state: ["DISABLE"],
						icon: { left: "CAMERA" },
						// size: "SMALL",
						color: "DARK",
						fill: "SOLID",
						roundness: "PILL",
						type: "SQUARE",
					}}
				/>
			</div>
			<ButtonCustom
				styleSettings={{
					color: "DARK",
					type: "TEXT",
					size: "X_SMALL",
					icon: { left: "LOGOUT" },
				}}
				onClick={btnLogOutHandler}
			>
				Logout
			</ButtonCustom>
		</div>
	);
};

export default Avatar;
