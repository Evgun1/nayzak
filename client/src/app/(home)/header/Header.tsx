import classes from "./Header.module.scss";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Link from "next/link";
import HeaderAction from "./action/HeaderAction";
import HeaderNavbar from "./navbar/HeaderNavbar";
import dynamic from "next/dynamic";

const HeaderNavbarDynamic = dynamic(() => import("./navbar/HeaderNavbar"), {
	ssr: true,
});

const Header = () => {
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
					<HeaderAction />
				</div>
			</div>
		</header>
	);
};
export default Header;
