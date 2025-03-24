"use client";

import { ProductItem } from "@/types/product.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DisplayIcon from "@/components/elements/icons/displayIcon";
import IconsIdList from "@/components/elements/icons/IconsIdList";
import {
    FC,
    ReactElement,
    ReactNode,
    Suspense,
    useEffect,
    useState,
} from "react";
import { appProductsGet } from "@/utils/http/products";
import { useSearchParams } from "next/navigation";
import ProductPreview from "@/components/elements/product-preview/ProductPreview";

import classes from "./Swiper.module.scss";

type SwiperComponentProps = {
    label: string;
    children: ReactNode;
};

const SwiperComponent: FC<SwiperComponentProps> = ({ children, label }) => {
    const childrenArr = children as ReactElement[];

    return (
        <div className={classes["swiper-custom"]}>
            <Swiper
                modules={[Navigation, Pagination]}
                style={{}}
                spaceBetween={32}
                slidesPerView={4}
                pagination={{
                    el: ".swiper-custom__pagination",
                    bulletClass: classes["swiper-custom__bullet"],
                    bulletActiveClass: classes["swiper-custom__bullet--action"],
                }}
                navigation={{
                    prevEl: ".swiper-custom__button-prev",
                    nextEl: ".swiper-custom__button-next",
                }}
                className={classes["swiper-custom__wrap"]}
            >
                <div className={classes["swiper-custom__header"]}>
                    <h5>{label}</h5>

                    <div className={classes["swiper-custom__controls"]}>
                        <button
                            className={` ${classes["swiper-custom__button"]} swiper-custom__button-prev`}
                        >
                            <DisplayIcon iconName={IconsIdList.ARROW_LEFT} />
                        </button>
                        <ul
                            className={`${classes["swiper-custom__pagination"]} swiper-custom__pagination`}
                        ></ul>
                        <button
                            className={`${classes["swiper-custom__button"]} swiper-custom__button-next`}
                        >
                            <DisplayIcon iconName={IconsIdList.ARROW_RIGHT} />
                        </button>
                    </div>
                </div>

                {childrenArr.map((child, i) => (
                    <SwiperSlide
                        className={classes["swiper-custom__slider"]}
                        key={i}
                    >
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperComponent;
