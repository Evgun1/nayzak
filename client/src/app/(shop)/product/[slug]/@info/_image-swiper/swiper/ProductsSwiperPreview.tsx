"use client";

import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import classes from "./ProductsSwiperPreview.module.scss";
import Image from "next/image";

type ProductSliderProps = {
	children: ReactNode;
};

const ProductsSwiperPreview: FC<ProductSliderProps> = (props) => {
	const childrenArr = props.children as ReactElement[];
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
				thumbs={{
					swiper:
						thumbsSwiper && isMounted ? thumbsSwiper : undefined,
				}}
				modules={[FreeMode, Thumbs]}
			>
				{childrenArr.map((item, i) => (
					<SwiperSlide key={i}>
						<div className={classes["product-slider__img-main"]}>
							{item}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={false}
				spaceBetween={19}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper"
			>
				{childrenArr.map((item, i) => (
					<SwiperSlide key={i}>
						<div className={classes["product-slider__img-group"]}>
							{item}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductsSwiperPreview;
