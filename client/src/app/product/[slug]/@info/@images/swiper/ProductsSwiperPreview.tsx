"use client";

import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
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
	const [children, setChildren] = useState<ReactElement[]>(
		props.children as ReactElement[],
	);
	// const childrenArr = props.children as ReactElement[];
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setChildren(props.children as ReactElement[]);

		setIsMounted(true);
	}, [props.children]);

	return (
		<div className={classes["product-swiper"]}>
			<Swiper
				loop={true}
				spaceBetween={10}
				thumbs={{
					swiper:
						thumbsSwiper && isMounted ? thumbsSwiper : undefined,
				}}
				modules={[FreeMode, Thumbs]}
			>
				{children.length > 0 &&
					children.map((item, i) => (
						<SwiperSlide
							className={classes["product-swiper__slide-main"]}
							key={i}
						>
							{item}
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
				{children.length > 0 &&
					children.map((item, i) => (
						<SwiperSlide
							className={classes["product-swiper__slide-list"]}
							key={i}
						>
							{item}
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default ProductsSwiperPreview;
