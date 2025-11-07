"use server";

import classes from "./Profile.module.scss";
import Tabs from "@/ui/tabs/Tabs";
import React, { ReactNode } from "react";
import Logout from "./Logout";

type MenuContentType = {
	label: string;
	content: ReactNode;
};

type RootLayoutProps = {
	addresses: ReactNode;
	details: ReactNode;
	orders: ReactNode;
	wishlist: ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
	const TABS: MenuContentType[] = [
		{
			label: "Account details",
			content: props.details,
		},
		{
			label: "Addresses",
			content: props.addresses,
		},
		{
			label: "Wishlist",
			content: props.wishlist,
		},
		{
			label: "Orders",
			content: props.orders,
		},
	];

	return (
		<section style={{ padding: "52px 0 250px" }}>
			<div className={classes["profile-container"]}>
				<div className={classes["profile"]}>
					<h3 className={classes["profile__header"]}>My account</h3>

					<Tabs
						isVertical
						className={classes["profile__tabs"]}
					>
						<Tabs.Header>
							{TABS.map((val, i) => (
								<Tabs.Toggle
									key={i}
									index={i}
									label={val.label}
								/>
							))}

							<Logout />
						</Tabs.Header>
						<Tabs.Body>
							{TABS.map((val, i) => (
								<React.Fragment key={i}>
									{val.content}
								</React.Fragment>
							))}
						</Tabs.Body>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
