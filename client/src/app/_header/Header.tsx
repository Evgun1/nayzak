"use client";
import { useAppSelector } from "@/redux/redux";
import { FunctionComponent } from "react";
import HeaderNav from "./components/nav/HeaderNav";
import HeaderActionLaptop from "./components/action-laptop/HeaderActionLaptop";
import HeaderActionMobile from "./components/action-mobile/HeaderActionMobile";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
	const responsive = useAppSelector((state) => state.responsive);

	if (responsive.isDesktop) {
		return (
			<>
				<HeaderNav />
				<HeaderActionLaptop />
			</>
		);
	}
	return (
		<>
			<HeaderActionMobile />
		</>
	);
};

export default Header;
