"use client";
import { ProductTypes } from "@/app/components/types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "./SwiperCustom.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./ProductsCarusel.module.scss";

const ProductsCarusel = async () => {
  const res = await fetch(`http://localhost:3030/products`, {
    method: "GET",
    cache: "no-cache",
  });
  const result: ProductTypes[] = await res.json().then((data) => {
    return data.products;
  });

  return (
    <div className={`container  ${classes.wrapper}`}>
      {result && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={4}
          // navigation
          // pagination={{ clickable: true }}
          pagination={{ el: ".swiper--custom-pagnation" }}
          navigation={{
            prevEl: ".swiper-arrow-left",
            nextEl: ".swiper-arrow-right",
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="swiper-custom"
          
        >
          <div className="swiper-head">
            <div className={classes.wrapper__title}>
              <h5>Latest Arrivals</h5>
            </div>
            <div className="swiper-controls">
              <button className="swiper-arrow-left">Prev</button>
              <ul className="swiper--custom-pagnation"></ul>
              <button className="swiper-arrow-right">Next</button>
            </div>
          </div>
          {result.map((value) => (
            <SwiperSlide key={value.id}>
              <div className={classes.card}>
                <div className={classes.card__block}>
                  <div>{value.title}</div>
                  <div>${value.price}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductsCarusel;
