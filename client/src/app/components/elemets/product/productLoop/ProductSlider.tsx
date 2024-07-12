"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  FreeMode,
  Keyboard,
  Navigation,
  Thumbs,
} from "swiper/modules";

import classes from "./ProductSlider.module.scss";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <Swiper
        cssMode={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Keyboard, EffectFade, Navigation]}
        className={classes.custom_swiper}
      >
        <SwiperSlide className={classes.custom_slider}>
          <img src="https://placehold.co/400" alt="" />
        </SwiperSlide>
        <SwiperSlide className={classes.custom_slider}>
          <img src="https://placehold.co/400x401" alt="" />
        </SwiperSlide>
        <SwiperSlide className={classes.custom_slider}>
          <img src="https://placehold.co/400x402" alt="" />
        </SwiperSlide>
        <SwiperSlide className={classes.custom_slider}>
          <img src="https://placehold.co/400x403" alt="" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={19}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={classes.custom_swiper}
      >
        <SwiperSlide className={classes.slider}>
          <img className={classes.img} src="https://placehold.co/400" alt="" />
        </SwiperSlide>
        <SwiperSlide className={classes.slider}>
          <img
            className={classes.img}
            src="https://placehold.co/400x401"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className={classes.slider}>
          <img
            className={classes.img}
            src="https://placehold.co/400x402"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className={classes.slider}>
          <img
            className={classes.img}
            src="https://placehold.co/400x403"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
