"use server";

import React, { FC } from "react";

import classes from "./HeaderCategories.module.scss";
import Breadcrumbs from "@/lib/ui/breadcrumbs/Breadcrumbs.copy";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";

type HeaderCategoriesProps = {
    slug: string[];
};

const HeaderCategories: FC<HeaderCategoriesProps> = async ({ slug }) => {
    const lastValue = slug.slice(-1)[0];
    const title = capitalizeAndSeparateWords(lastValue);

    return (
        <div className='container'>
            <div className={classes["header-categories"]}>
                <Breadcrumbs value={slug} path='category' />
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default HeaderCategories;
