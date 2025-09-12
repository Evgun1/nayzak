"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type SwiperCustomProps = {
	swiperSettings: {};
	slides: React.ReactNode[];
	spaceBetween?: number;
	slidesPerView?: number;
	loop?: boolean;
	onSlideChange?: (index: number) => void;
};

const SwiperCustom: React.FC<SwiperCustomProps> = ({
	slides,
	spaceBetween = 16,
	slidesPerView = 1,
	loop = false,
	onSlideChange,
}) => {
	return (
		<Swiper
			spaceBetween={spaceBetween}
			slidesPerView={slidesPerView}
			loop={loop}
			onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
		>
			{slides.map((slide, idx) => (
				<SwiperSlide key={idx}>{slide}</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperCustom;
