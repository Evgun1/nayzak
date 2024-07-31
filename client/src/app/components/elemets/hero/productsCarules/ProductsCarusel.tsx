"use client";

import { ProductTypes } from "@/app/components/types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "./SwiperCustom.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./ProductsCarusel.module.scss";
import ButtonCustom from "@/app/components/button-custom/ButtonCustom";
import DisplayIcon from "@/app/components/icons/displayIcon";
import IconsIdList from "@/app/components/icons/IconsIdList";
import { fetchProducts } from "@/app/components/utils/fetchProducts";
import ProductPreview from "@/app/components/productPreview/ProductPreview";
import { useSearchParams } from "next/navigation";

const ProductsCarusel = async () => {
  const searchParams = useSearchParams();
  // const res = await fetch(`http://localhost:3030/products`, {
  //   method: "GET",
  //   cache: "no-cache",
  // });
  // const result: ProductTypes[] = await res.json().then((data) => {
  //   return data.products;
  // });

  const urlSearchParams = new URLSearchParams(searchParams.toString());

  urlSearchParams.set("limit", "8");

  const { products } = await fetchProducts({
    urlSearchParams: urlSearchParams,
  });

  return (
    <div className={`container  ${classes.wrapper}`}>
      {products && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={4}
          // navigation
          // pagination={{ clickable: true }}
          pagination={{
            el: ".swiper-custom--pagnation",
            // renderBullet: (index, className) => {
            //   return `<span class="${(className =
            //     "swiper--custom-bullet")}"></span>`;
            // },
            bulletClass: classes["swiper-custom--bullet"],
            bulletActiveClass: classes["swiper-custom--bullet-action"],
          }}
          navigation={{
            prevEl: ".swiper-arrow-left",
            nextEl: ".swiper-arrow-right",
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className={classes["swiper-custom"]}
        >
          <div className={classes["swiper-head"]}>
            <div className={classes.wrapper__title}>
              <h5>Latest Arrivals</h5>
            </div>
            <div className={classes["swiper-controls"]}>
              <button
                className={` ${classes["swiper-custom--navigation-btn"]} swiper-arrow-left`}
              >
                <DisplayIcon iconName={IconsIdList.ARROW_LEFT} />
              </button>
              <ul
                className={`${classes["swiper-custom--pagination"]} swiper-custom--pagnation`}
              ></ul>
              <button
                className={` ${classes["swiper-custom--navigation-btn"]} swiper-arrow-right`}
              >
                <DisplayIcon iconName={IconsIdList.ARROW_RIGHT} />
              </button>
            </div>
          </div>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              {/* <div className={classes.card}>
                <div className={classes.card__block}>
                  <div>{value.title}</div>
                  <div>${value.price}</div>
                </div>
              </div> */}
              <ProductPreview
                product={product}
                style={classes["products-carusel--card"]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductsCarusel;
