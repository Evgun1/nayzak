"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { FC, ReactElement, ReactNode, useMemo } from "react";

import classes from "./Swiper.module.scss";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import { useAppSelector } from "@/redux/redux";

type SwiperComponentProps = {
	label: string;
	children: ReactNode;
};

const SwiperComponent: FC<SwiperComponentProps> = ({ children, label }) => {
	const childrenArr = children as ReactElement[];
	const responsive = useAppSelector((state) => state.responsive);

	const clientLabel = useMemo(() => label, [label]);
	const clientResponsive = useMemo(() => responsive, [responsive]);

	return (
		<div className={classes["swiper-custom"]}>
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={clientResponsive.isDesktop ? 34 : 16}
				slidesPerView={clientResponsive.isDesktop ? 4 : "auto"}
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
					<h5 className={classes["swiper-custom__header-title"]}>
						{clientLabel}
					</h5>

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
						className={`${classes["swiper-custom__slider"]}`}
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
