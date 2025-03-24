"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import classes from "./ProductSlider.module.scss";
import Image from "next/image";

export default function ProductSlider() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className={classes["product-slider"]}>
            <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={
                    isMounted && thumbsSwiper
                        ? { swiper: thumbsSwiper }
                        : undefined
                }
                modules={[FreeMode, Thumbs]}
            >
                <SwiperSlide className={classes["product-slider__img-main"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/761'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-main"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/762'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-main"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/763'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-main"]}>
                    <Image
                        sizes='width: 100%;'
                        priority
                        // objectFit='cover'
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/764'
                    />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='mySwiper'
            >
                <SwiperSlide className={classes["product-slider__img-group"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/761'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-group"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/762'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-group"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/763'
                    />
                </SwiperSlide>
                <SwiperSlide className={classes["product-slider__img-group"]}>
                    <Image
                        sizes='width: 100%;'
                        // objectFit='cover'
                        priority
                        fill
                        alt='product'
                        className={classes["product-slider__img"]}
                        src='https://placehold.co/764'
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
