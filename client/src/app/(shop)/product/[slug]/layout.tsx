"use server";
import React from "react";
import classes from "./Product.module.scss";
import TabsNavigation from "./components/TabsNavigation";
import "./style.scss";

export default async function ProductLayout(props: {
	children: React.ReactNode;
	loop: React.ReactNode;
	images: React.ReactNode;
	description: React.ReactNode;
	info: React.ReactNode;
	reviews: React.ReactNode;
}) {
	const { loop, images, description, info, reviews } = props;

	return (
		<section>
			<div className="product-container">
				<div className={classes["product"]}>
					<div className={classes["product__content"]}>
						{images}
						{loop}
					</div>

					<TabsNavigation
						tabs={[
							{
								label: "Description",
								content: description,
							},
							{
								label: "Additional Info",
								content: info,
							},
							{
								label: "Reviews",
								content: reviews,
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
