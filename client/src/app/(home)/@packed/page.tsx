"use server";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./ActionPacked.module.scss";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

const Page = async () => {
	return (
		<section className="section">
			<div className={`container`}>
				<div className={`${classes["action-packed"]}`}>
					<div className={classes["action-packed__info"]}>
						<h4 className={classes["action-packed__info-header"]}>
							Action Packed
						</h4>
						<p
							className={`${classes["action-packed__info-paragraph"]} ${TextClassList.REGULAR_18}`}
						>
							Phosfluor escently engage worldwide with web-enabled
							process-centric technology.
						</p>
						<LinkCustom
							styleSettings={{
								size: "MEDIUM",
								type: "TEXT",
								fill: "SOLID",
								color: "LIGHT",
								icon: { right: "ARROW_RIGHT" },
							}}
							className={`${classes["action-packed__info-link"]}`}
							href={{ endpoint: "#" }}
						>
							See collection
						</LinkCustom>
					</div>
					<div className={classes[`action-packed__video-wrap`]}>
						<iframe
							id="video-player"
							className={classes[`action-packed__video`]}
							src="https://www.youtube.com/embed/668nUCeBHyY?enablejsapi=1"
							title="Nature Beautiful short video 720p HD"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write;  encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Page;
