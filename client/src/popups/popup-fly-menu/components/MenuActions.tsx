"use client";
import { useAppSelector } from "@/redux/redux";
import classes from "./MenuActions.module.scss";
import React from "react";
import ActionCart from "@/app/_header/components/action/ActionCart";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import IconsIdList from "@/components/icons/IconsIdList";
import DisplayIcon from "@/components/icons/displayIcon";

interface MenuActionProps {}

const MenuActions: React.FC<MenuActionProps> = () => {
	const wishlist = useAppSelector((select) => select.wishlist.productsArray);
	const cartTotalAmount = useAppSelector((select) => select.cart.totalAmount);
	return (
		<div className={classes["menu-actions"]}>
			<LinkCustom
				href={{ endpoint: "cart" }}
				styleSettings={{ color: "DARK", size: "MEDIUM", type: "TEXT" }}
				className={classes["menu-actions__link"]}
			>
				<span className={classes["menu-actions__link-label"]}>
					Cart
				</span>
				<div className={classes["menu-actions__icons"]}>
					<DisplayIcon iconName={IconsIdList.CART} />
					{cartTotalAmount > 0 && (
						<span className={classes["menu-actions__icons-amount"]}>
							{cartTotalAmount}
						</span>
					)}
				</div>
			</LinkCustom>
			<LinkCustom
				href={{ endpoint: "wishlist" }}
				styleSettings={{ color: "DARK", size: "MEDIUM", type: "TEXT" }}
				className={classes["menu-actions__link"]}
			>
				<span className={classes["menu-actions__link-label"]}>
					Wishlist
				</span>
				<div className={classes["menu-actions__icons"]}>
					<DisplayIcon iconName={IconsIdList.HEART} />
					{wishlist.length > 0 && (
						<span className={classes["menu-actions__icons-amount"]}>
							{wishlist.length}
						</span>
					)}
				</div>
			</LinkCustom>
		</div>
	);
};

export default MenuActions;
