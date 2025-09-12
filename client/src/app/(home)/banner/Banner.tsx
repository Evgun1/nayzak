"use server";
import Image from "next/image";
import classes from "./Banner.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { getPlaceholderImage } from "@/tools/getPlaceholderImage";
import { FC } from "react";

const Banner: FC = async () => {
	const src = "https://placehold.co/800";

	const blur = await getPlaceholderImage(src);

	return (
		<div>
			<div className={classes.banner}>
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
					<div className={classes["banner__text-wrapper"]}>
						<span
							className={`${classes["banner__text"]} ${TextClassList.SEMIBOLD_16}`}
						>
							New Arrivals
						</span>
						<h3 className={classes["banner__text"]}>
							Your dream shop is a click away.
						</h3>
						<p
							className={`${classes["banner__text"]} ${TextClassList.REGULAR_18}`}
						>
							Keep your everyday style chic and on-trend with our
							selection 20+ styles to choose from.
						</p>
					</div>

					<ButtonCustom
						styleSettings={{
							fill: "SOLID",
							size: "SMALL",
							type: "DEFAULT",
							roundness: "SHARP",
							icon: { right: "ARROW_RIGHT" },
							color: "LIGHT",
						}}
					>
						See Collection
					</ButtonCustom>
				</div>
			</div>
		</div>
	);
};

export default Banner;
