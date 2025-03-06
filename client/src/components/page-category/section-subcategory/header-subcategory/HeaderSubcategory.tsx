"use client";

import { FC } from "react";
import classes from "./HeaderSubcategories.module.scss";
import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs";

type HeaderProps = {
    title: string;
};

const HeaderSubcategory: FC<HeaderProps> = ({ title }) => {
    return (
        <div className='container'>
            <div className={classes["subcategory-header"]}>
                <Breadcrumbs />
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default HeaderSubcategory;
