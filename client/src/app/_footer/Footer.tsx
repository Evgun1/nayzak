"use client";
import DisplayIcon from "@/components/icons/displayIcon";
import classes from "./Footer.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import Social from "./components/Social";
import Columns from "./components/Columns";
import { TextClassList } from "@/types/textClassList.enum";
import { useAppSelector } from "@/redux/redux";

const Footer = () => {
	const responsive = useAppSelector((state) => state.responsive);
	const year = new Date().getFullYear();

	return (
		<footer className={classes.footer}>
			<div className="container">
				<div className={classes["footer__info-wrap"]}>
					<div className={classes["footer__info"]}>
						<DisplayIcon
							className={classes["footer__info-logo"]}
							iconName={IconsIdList.LOGOTYPE}
						/>
						<p
							className={`${classes["footer__info-p"]} ${TextClassList.REGULAR_16}`}
						>
							Phosf luorescently engage worldwide method process
							shopping.
						</p>
						{responsive.isDesktop && <Social />}
					</div>
					<Columns />
				</div>

				<div className={classes["footer__nav"]}>
					{responsive.isDesktop ? (
						<>
							<div
								className={`${classes[`footer__nav-item`]} ${
									TextClassList.REGULAR_14
								}`}
							>
								© {year} Nayzak Design
							</div>
							<div className={classes[`footer__nav-item`]}>
								<div>Language</div>
								<div>Currency</div>
							</div>
						</>
					) : (
						<>
							<div className={classes[`footer__nav-item`]}>
								<div>Language</div>
								<div>Currency</div>
							</div>
							<Social className={classes[`footer__nav-item`]} />
							<div
								className={`${classes[`footer__nav-item`]} ${
									TextClassList.REGULAR_14
								}`}
							>
								© {year} Nayzak Design
							</div>
						</>
					)}
				</div>
			</div>
		</footer>
	);
};
export default Footer;
