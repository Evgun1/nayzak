"use client";
import { useAppSelector } from "@/redux/redux";
import classes from "./BannerSpan.module.scss";
import { FunctionComponent } from "react";
import { TextClassList } from "@/types/textClassList.enum";

interface BannerSpanProps {
	text: string;
}
const BannerSpan: FunctionComponent<BannerSpanProps> = (props) => {
	const { text } = props;

	const responsive = useAppSelector((state) => state.responsive);

	// return <span className={classes["banner-span"]}>{text}</span>;
	return responsive.isDesktop && responsive.isTablet ? (
		<span
			className={`${classes["banner-span"]} ${TextClassList.SEMIBOLD_16}`}
		>
			{text}
		</span>
	) : (
		<span
			className={`${classes["banner-span"]} ${TextClassList.SEMIBOLD_14}`}
		>
			{text}
		</span>
	);
};
export default BannerSpan;
