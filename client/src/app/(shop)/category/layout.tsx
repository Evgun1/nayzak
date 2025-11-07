"use server";
import classes from "./style.module.scss";
import { ReactNode } from "react";
import Header from "./components/Header";

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
