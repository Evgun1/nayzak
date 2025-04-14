"use server";

import DisplayIcon from "@/components/elements/icons/displayIcon";
import IconsIdList from "@/components/elements/icons/IconsIdList";

import classes from "./Header.module.scss";
import Actions from "./Actions";

import Link from "next/link";
import { FC } from "react";
import Navigation from "./navigation/Navigation";
import dynamic from "next/dynamic";

const NavigationDynamic = dynamic(() => import("./navigation/Navigation"), {
    ssr: true,
});

const Header: FC = async () => {
    return (
        <header>
            <div className='container'>
                <div className={classes.header}>
                    <Link href={"/"} className={classes["header__logo"]}>
                        <DisplayIcon
                            className={classes["header__icon"]}
                            iconName={IconsIdList.LOGOTYPE}
                        />
                    </Link>
                    <NavigationDynamic />
                    <Actions />
                </div>
            </div>
        </header>
    );
};

export default Header;
