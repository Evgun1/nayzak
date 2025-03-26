"use server";

import DisplayIcon from "@/components/elements/icons/displayIcon";
import IconsIdList from "@/components/elements/icons/IconsIdList";

import classes from "./Header.module.scss";
import Actions from "./Actions";

import Link from "next/link";
import { FC } from "react";
import Navigation from "./navigation/Navigation";

const Header: FC = async () => {
    return (
        <header className={"container"}>
            <div className={classes.header}>
                <Link href={"/"} className={classes["header__logo"]}>
                    <DisplayIcon
                        className={classes["header__icon"]}
                        iconName={IconsIdList.LOGOTYPE}
                    />
                </Link>
                <Navigation />
                <Actions />
            </div>
        </header>
    );
};

export default Header;
