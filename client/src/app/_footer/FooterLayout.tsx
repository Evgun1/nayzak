"use client";
import { FunctionComponent } from "react";
import classes from "./Footer.module.scss";
import dynamic from "next/dynamic";

interface FooterLayoutProps {}

const FooterDynamic = dynamic(() => import("./Footer"), {
	ssr: false,
	loading: () => <div>Loading</div>,
});

const FooterLayout: FunctionComponent<FooterLayoutProps> = () => {
	return (
		<footer className={classes["footer"]}>
			<div className="container">
				<FooterDynamic />
			</div>
		</footer>
	);
};

export default FooterLayout;
