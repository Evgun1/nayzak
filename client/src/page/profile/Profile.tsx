"use server";

import React, { ReactNode } from "react";
import classes from "./Profile.module.scss";
import Image from "next/image";
import Logout from "./Logout";
import Tabs from "@/ui/tabs/Tabs";
import dynamic from "next/dynamic";

type PageContentType = {
	label: string;
	content: ReactNode;
};

const AccountDetailsDynamic = dynamic(
	() => import("./account-details/AccountDetails"),
);
const AddressesDynamic = dynamic(() => import("./addresses/Addresses"));
const WishlistDynamic = dynamic(() => import("./wishlist/Wishlist"));
const OrdersDynamic = dynamic(() => import("./orders/Orders"));

export default async function Profile() {
	const MENU: PageContentType[] = [
		{
			label: "Account details",
			content: <AccountDetailsDynamic />,
		},
		{
			label: "Addresses",
			content: <AddressesDynamic />,
		},
		{
			label: "Wishlist",
			content: <WishlistDynamic />,
		},
		{
			label: "Orders",
			content: <OrdersDynamic />,
		},
	];
	return (
		<div className={classes["profile"]}>
			<h3 className={classes["profile__header"]}>My account</h3>
			<div className={classes["profile__content"]}>
				<Tabs isVertical>
					<Tabs.Header className={classes["profile__tabs-header"]}>
						<div
							className={
								classes["profile-navigation__image-wrap"]
							}
						>
							<Image
								loading="lazy"
								fill
								className={classes["profile-navigation__image"]}
								src="https://placehold.co/400"
								alt="avatar"
							/>
						</div>
						{MENU.map((val, i) => (
							<Tabs.Toggle
								key={i}
								index={i}
								label={val.label}
							/>
						))}
						<Logout />
					</Tabs.Header>

					<Tabs.Body>
						{MENU.map((val, i) => (
							<React.Fragment key={i}>
								{val.content}
							</React.Fragment>
						))}
					</Tabs.Body>
				</Tabs>
			</div>
		</div>
	);
}
