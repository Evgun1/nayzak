"use client";
import { useAppSelector } from "@/redux/redux";
import classes from "./BannerParagraph.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import { FunctionComponent } from "react";

interface BannerParagraphProps {
	text: string;
}

const BannerParagraph: FunctionComponent<BannerParagraphProps> = (props) => {
	const { text } = props;
	const responsive = useAppSelector((state) => state.responsive);

	return responsive.isDesktop && responsive.isTablet ? (
		<p className={`${classes["banner-p"]} ${TextClassList.REGULAR_18}`}>
			{text}
		</p>
	) : (
		<p className={`${classes["banner-p"]} ${TextClassList.REGULAR_16}`}>
			{text}
		</p>
	);
};

export default BannerParagraph;
