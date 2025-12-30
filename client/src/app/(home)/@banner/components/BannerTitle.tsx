"use client";
import classes from "./BannerTitle.module.scss";
import { useAppSelector } from "@/redux/redux";
import { FunctionComponent } from "react";

interface BannerTitleProps {
	title: string;
}

const BannerTitle: FunctionComponent<BannerTitleProps> = (props) => {
	const { title } = props;
	const responsive = useAppSelector((state) => state.responsive);

	return responsive.isDesktop && responsive.isTablet ? (
		<h3 className={classes["banner-title"]}>{title}</h3>
	) : (
		<h5 className={classes["banner-title"]}>{title}</h5>
	);
};

export default BannerTitle;
