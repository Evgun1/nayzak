import classes from "./ProductDescription.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import { FC } from "react";

const Page: FC = () => {
	return (
		<div className={classes.description}>
			{/* <p className={TextClassList.REGULAR_18}>
			</p> */}
			<div className={classes["description__info"]}>
				<div className={`h7 ${classes["description__info-header"]}`}>
					Information
				</div>
				<ul className={classes["description__list"]}>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value 1
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value 2
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value 3
					</li>
					<li
						className={`${TextClassList.REGULAR_18} ${classes["description__list-item"]}`}
					>
						value 4
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Page;
