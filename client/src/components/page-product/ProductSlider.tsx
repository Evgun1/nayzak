'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import classes from './ProductSlider.module.scss';

export default function ProductSlider() {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<div className={classes['product-swiper']}>
			<Swiper
				loop={true}
				spaceBetween={10}
				thumbs={
					isMounted && thumbsSwiper ? { swiper: thumbsSwiper } : undefined
				}
				modules={[FreeMode, Thumbs]}
			>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
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
				className="mySwiper"
			>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
				<SwiperSlide>
					<img className={classes.img} src="https://placehold.co/570x760" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
