import classes from "./Header.module.scss";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Link from "next/link";
import HeaderAction from "./components/action/HeaderAction";
import HeaderNavbar from "./components/navbar/HeaderNavbar";
import dynamic from "next/dynamic";
import HeaderActionSkeleton from "./components/action/skeleton/HeaderActionSkeleton";
import TestComponent from "./Test";

const HeaderActionDynamic = dynamic(
	() => import("./components/action/HeaderAction"),
	{
		ssr: false,
		loading: () => <HeaderActionSkeleton />,
	},
);

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
					<TestComponent>
						<HeaderNavbar />
						<HeaderActionDynamic />
					</TestComponent>
				</div>
			</div>
		</header>
	);
};
export default Header;
