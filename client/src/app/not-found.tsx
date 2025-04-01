"use client";

import Link from "next/link";

import classes from "./Hero.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";

const NotFoundPage = () => {
    return (
        <div className='container'>
            <div className={classes["not-found-page"]}>
                <h2>404 - Page not found page</h2>

                <Link
                    href={"/"}
                    className={`${classes["not-found-page__link"]} ${ButtonClassList.BUTTON_MEDIUM}`}
                >
                    Back to main page
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
