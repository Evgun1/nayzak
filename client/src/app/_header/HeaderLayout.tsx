"use client";
import classes from "./Header.module.scss";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FunctionComponent } from "react";
import HeaderLoading from "./loading/HeaderLoading";

interface HeaderLayoutProps {}

const HeaderDynamic = dynamic(() => import("./Header"), {
	ssr: false,
	loading: () => <HeaderLoading />,
});

const HeaderLayout: FunctionComponent<HeaderLayoutProps> = () => {
	return (
		<nav>
			<div className="container">
				<div className={classes["header"]}>
					<Link
						href={"/"}
						className={classes["header__logo"]}
					>
						<DisplayIcon
							className={classes["header__icon"]}
							iconName={IconsIdList.LOGOTYPE}
						/>
					</Link>
					<HeaderDynamic />
				</div>
			</div>
		</nav>
	);
};

export default HeaderLayout;
