"use client";

import { TextClassList } from "@/types/textClassList.enum";
import Link from "next/link";

import classes from "./style.module.scss";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import DisplayIcon from "@/components/elements/icons/displayIcon";
import { useEffect } from "react";

export default function FeatureTwo() {
    return (
        <section className='section'>
            <div className={`container ${classes.wrapper}`}>
                <div className={classes.wrapper__info}>
                    <div className={classes[`wrapper__info-content`]}>
                        <div className={classes["wrapper__info-content-text"]}>
                            <h4 style={{ color: "white" }}>Action Packed</h4>
                            <div
                                style={{ color: "white" }}
                                className={`${TextClassList.REGULAR_18}`}
                            >
                                Phosfluor escently engage worldwide with
                                web-enabled process-centric technology.
                            </div>
                        </div>
                        <Link
                            style={{ color: "white" }}
                            className={ButtonClassList.BUTTON_MEDIUM}
                            href={""}
                        >
                            See collection
                            <DisplayIcon
                                className={classes.icon}
                                iconName={IconsIdList.ARROW_RIGHT}
                            />
                        </Link>
                    </div>
                </div>
                <div className={classes[`wrapper__video-wrap`]}>
                    <iframe
                        id='video-player'
                        className={classes[`wrapper__video`]}
                        // width='1280'
                        // height='720'

                        src='https://www.youtube.com/embed/668nUCeBHyY?enablejsapi=1'
                        title='Nature Beautiful short video 720p HD'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write;  encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
