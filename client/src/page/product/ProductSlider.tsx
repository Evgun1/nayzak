"use client";

import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import classes from "./ProductSlider.module.scss";
import Image from "next/image";
import { IProduct } from "@/types/product/product.interface";
import { ProductDetails } from "@/types/product/productDetails";

// interface ProductSliderItem extends Pick<ProductDetails, "Media"> {}

type ProductSliderProps = {
	media: { src: string; name: string; blurImage: string }[];
};

const ProductSlider: FC<ProductSliderProps> = (props) => {
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
				{props.media.map((item, i) => (
					<SwiperSlide key={i}>
						<div className={classes["product-slider__img-main"]}>
							<Image
								placeholder="blur"
								blurDataURL={item.blurImage}
								// style={{ width: "100%", height: `100%`, }}
								// sizes="width: 100%; height:100%"
								// objectFit="cover"
								priority
								fill
								alt={item.name}
								src={item.src}
								className={classes["product-slider__img"]}
							/>
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
				{props.media.map((item, i) => (
					<SwiperSlide
						className={classes["product-slider__img-group"]}
						key={i}
					>
						<Image
							placeholder="blur"
							blurDataURL={item.blurImage}
							sizes="width: 100%; height:100%"
							// objectFit="cover"
							priority
							fill
							alt={item.name}
							src={item.src}
							className={classes["product-slider__img"]}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductSlider;
