"use server";

import Link from "next/link";
import classes from "./Hero.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import { Suspense } from "react";
import { TextClassList } from "@/types/textClassList.enum";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import DisplayIcon from "@/components/elements/icons/displayIcon";
import IconsIdList from "@/components/elements/icons/IconsIdList";

const NotFoundPage = async () => {
    return (
        <div className='container'>
            <div className={classes["not-found"]}>
                <DisplayIcon
                    className={classes["not-found__icon"]}
                    iconName={IconsIdList.NOT_FOUND}
                />

                <h3 className={classes["not-found__title"]}>
                    404 - Page not found
                </h3>
                <div
                    className={`${classes["not-found__description"]} ${TextClassList.REGULAR_18}`}
                >
                    {`
                    The page you're looking for isn't available.Try to search
                    again or use the go back button below.`}
                </div>
                <LinkCustom
                    href={{ endpoint: "/" }}
                    styleSettings={{
                        color: "DARK",
                        size: "MEDIUM",
                        type: "DEFAULT",
                        fill: "SOLID",
                        roundness: "ROUNDED",
                    }}
                    className={`${classes["not-found__link"]}`}
                >
                    Go back home
                </LinkCustom>
            </div>
        </div>
    );
};

export default NotFoundPage;
