"use server";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./Trending.module.scss";
import Image from "next/image";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import { FC } from "react";

const Trending: FC = () => {
	return (
		<section className="section">
			<div className="container">
				<div className={classes["trending"]}>
					<div className={classes["trending__info"]}>
						<div className={classes["trending__info-header"]}>
							<span className={TextClassList.SEMIBOLD_18}>
								TRENDING
							</span>
							<h3>Made from the finest materials</h3>
						</div>
						<p
							className={`${classes[TextClassList.REGULAR_18]} ${
								classes["trending__info-paragraph"]
							}`}
						>
							Sed ut perspiciatis unde omnis iste natus error sit
							voluptatem accusantium doloremque laudantium, totam
							rem aperiam, eaque ipsa quae.
						</p>
						<LinkCustom
							styleSettings={{
								type: "TEXT",
								fill: "SOLID",
								size: "LARGE",
								color: "DARK",
								icon: { right: "ARROW_RIGHT" },
								state: ["DISABLE"],
							}}
							href={{ endpoint: "#" }}
						>
							See collection
						</LinkCustom>
					</div>
					<div className={classes["trending__images"]}>
						<div className={classes["trending__image-back"]}>
							<Image
								sizes="width:100%; height:100%;"
								loading="lazy"
								fill
								className={classes["trending__image"]}
								src="https://placehold.co/800"
								alt="#"
							/>
						</div>
						<div className={classes["trending__image-front"]}>
							<Image
								sizes="width:100%; height:100%;"
								loading="lazy"
								fill
								className={classes["trending__image"]}
								src="https://placehold.co/800"
								alt="#"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Trending;
