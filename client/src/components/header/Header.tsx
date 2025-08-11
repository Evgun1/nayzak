"use server";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";

import classes from "./Header.module.scss";
import Actions from "./Actions";

import Link from "next/link";
import { FC } from "react";
import Navigation from "./navigation/Navigation";
import dynamic from "next/dynamic";

const Header: FC = async () => {
	return (
		<header>
			<div className="container">
				<div className={classes.header}>
					<Link
						href={"/"}
						className={classes["header__logo"]}
					>
						<DisplayIcon
							className={classes["header__icon"]}
							iconName={IconsIdList.LOGOTYPE}
						/>
					</Link>
					<Navigation />
					<Actions />
				</div>
			</div>
		</header>
	);
};

export default Header;
