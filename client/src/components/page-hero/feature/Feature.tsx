"use server";

import { TextClassList } from "@/types/textClassList.enum";
import classes from "./Feature.module.scss";
import LinkCustom from "@/lib/ui/custom-elements/link-custom/LinkCustom";
import Image from "next/image";

export default async function Feature() {
    return (
        <div className='container'>
            <div className={classes["feature"]}>
                <div className={classes["feature__content-wrap"]}>
                    <div className={classes["feature__content"]}>
                        <div className={classes["feature__content-header"]}>
                            <span className={TextClassList.SEMIBOLD_18}>
                                TRENDING
                            </span>
                            <h3>Made from the finest materials</h3>
                        </div>
                        <div
                            className={`${classes[TextClassList.REGULAR_18]} ${
                                classes["feature__content-text"]
                            }`}
                        >
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae.
                        </div>
                        <LinkCustom
                            styleSettings={{
                                type: "TEXT",
                                fill: "SOLID",
                                size: "LARGE",
                                color: "DARK",
                                icon: { right: "ARROW_RIGHT" },
                            }}
                            href={{ endpoint: "#" }}
                        >
                            See collection
                        </LinkCustom>
                    </div>
                </div>
                <div className={classes["feature__image-wrap"]}>
                    <div className={classes["feature__image-back"]}>
                        <Image
                            sizes='width:100%; height:100%;'
                            loading='lazy'
                            fill
                            className={classes["feature__image"]}
                            src='https://placehold.co/800'
                            alt='#'
                        />
                    </div>
                    <div className={classes["feature__image-front"]}>
                        <Image
                            sizes='width:100%; height:100%;'
                            loading='lazy'
                            fill
                            className={classes["feature__image"]}
                            src='https://placehold.co/800'
                            alt='#'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
