"use server";

import classes from "./Breadcrumbs.module.scss";

import { TextClassList } from "@/types/textClassList.enum";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import LinkCustom from "../custom-elements/link-custom/LinkCustom";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";

export interface BreadcrumbsPathItems {
    path?: string;
    slug?: string;
}

type BreadcrumbsProductProps = {
    value?: string[];
    path?: string;
};

export default async function Breadcrumbs(props: BreadcrumbsProductProps) {
    const { path, value } = props;

    const breadcrumbsArr = [] as {
        title: string;
        path: string;
    }[];

    let http = path ? `/${path}` : "";

    for (const element of value ?? []) {
        const title = capitalizeAndSeparateWords(element);
        if (value && value.includes(element)) {
            http += `/${element.toLowerCase()}`;

            breadcrumbsArr.push({
                path: http,
                title,
            });
        }
    }
    breadcrumbsArr.unshift({ path: "/", title: "Home" });

    return (
        <ul className={classes.breadcrumbs}>
            {breadcrumbsArr &&
                breadcrumbsArr.map((data, index, array) => (
                    <li className={classes["breadcrumbs__item"]} key={index}>
                        {index + 1 !== array.length ? (
                            <LinkCustom
                                styleSettings={{
                                    type: "TEXT",
                                    color: "DARK",
                                    roundness: "SHARP",
                                    size: "X_SMALL",
                                    icon: { right: "CHEVRON" },
                                }}
                                href={{ endpoint: data.path }}
                                className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs__link"]}`}
                            >
                                {data.title}
                                {/* {data.slug?.replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                )} */}
                            </LinkCustom>
                        ) : (
                            <span
                                key={index}
                                className={`${
                                    TextClassList.REGULAR_12 &&
                                    ButtonClassList.BUTTON_X_SMALL
                                } ${classes["breadcrumbs__link"]} ${
                                    classes["breadcrumbs__link--active"]
                                }`}
                            >
                                {data.title}
                            </span>
                        )}
                    </li>
                ))}
        </ul>
    );
}
