"use server";

import Image from "next/image";
import classes from "./Banner.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import React, { FC } from "react";

const Page: FC = async (props: any) => {
	const src = "https://placehold.co/800";
	const blur = await getPlaceholderImage(src);

	return (
		<React.Fragment>
			<div className={classes["banner__img-wrapper"]}>
				<Image
					placeholder="blur"
					blurDataURL={blur.placeholder}
					className={classes["banner__img"]}
					priority
					fill
					sizes={"height: 100%"}
					src={src}
					alt="banner"
				/>
			</div>
			<div className={classes["banner__content"]}>
				<span className={`${classes["banner__content-item"]}`}>
					New Arrivals
				</span>

				<h3 className={`${classes["banner__content-item"]}`}>
					Your dream shop is a click away.
				</h3>

				<p className={`${classes["banner__content-item"]}`}>
					Keep your everyday style chic and on-trend with our
					selection 20+ styles to choose from.
				</p>

				<ButtonCustom
					styleSettings={{
						fill: "SOLID",
						size: "SMALL",
						type: "DEFAULT",
						roundness: "SHARP",
						icon: { right: "ARROW_RIGHT" },
						color: "LIGHT",
						state: ["DISABLE"],
					}}
				>
					See Collection
				</ButtonCustom>
			</div>
		</React.Fragment>
	);
};

export default Page;
