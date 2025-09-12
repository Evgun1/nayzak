"use server";
import classes from "./Category.module.scss";
import { ReactNode } from "react";
import Header from "./_header/Header";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import pasteImage from "@/../public/PasteImage.png";
import { buffer } from "stream/consumers";

export default async function RootLayout(props: { children: ReactNode }) {
	return (
		<section>
			<div className="container">
				<div className={classes["category"]}>
					<Header />
					<div>{props.children}</div>
				</div>
			</div>
		</section>
	);
}
