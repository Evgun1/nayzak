"use server";

import { FC } from "react";

import classes from "./Subcategories.module.scss";
import { appSubcategoryByCategoryGet } from "@/utils/http/subcategories";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";

type SubcategoriesGridProps = {
    slug: string;
};

const SubcategoriesItem: FC<SubcategoriesGridProps> = async ({ slug }) => {
    const subcategories = await appSubcategoryByCategoryGet(slug);

    return (
        <div className='container'>
            <div className={classes.subcategories}>
                {subcategories &&
                    subcategories.length > 0 &&
                    subcategories.map(({ title }, index) => (
                        <div
                            key={index}
                            className={classes["subcategories__item"]}
                        >
                            <LinkCustom
                                styleSettings={{
                                    color: "LIGHT",
                                    roundness: "ROUNDED",
                                    fill: "SOLID",
                                    size: "MEDIUM",
                                    type: "DEFAULT",
                                }}
                                href={{
                                    endpoint: `${slug}/${title.toLowerCase()}`,
                                }}
                                className={classes["subcategories__item-btn"]}
                            >
                                {title}
                            </LinkCustom>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SubcategoriesItem;
