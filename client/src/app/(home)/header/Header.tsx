"use server";
import classes from "./Header.module.scss";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Link from "next/link";
import HeaderAction from "./action/HeaderAction";
import HeaderNavbar from "./navbar/HeaderNavbar";
import dynamic from "next/dynamic";
import HeaderActionSkeleton from "./action/skeleton/HeaderActionSkeleton";

const HeaderActionDynamic = dynamic(() => import("./action/HeaderAction"), {
	ssr: false,
	loading: () => <HeaderActionSkeleton />,
});

const Header = async () => {
	return (
		<header>
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
					<HeaderNavbar />
					<HeaderActionDynamic />
				</div>
			</div>
		</header>
	);
};
export default Header;
