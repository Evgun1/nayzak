"use client";

import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

// import "./SwiperCustom.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./ProductsSwiper.module.scss";
import DisplayIcon from "@/components/elemets/icons/displayIcon";
import IconsIdList from "@/components/elemets/icons/IconsIdList";
import ProductPreview from "@/components/elemets/product-preview/ProductPreview";
import { useEffect, useState } from "react";
import { useFetchProductsAll } from "@/hooks/useFetchProducts";
// import { useFetchAllProducts } from "@/hooks/fetchProducts";

const ProductsSwiper = () => {
  const [productsData, setProductsData] = useState<Product[]>();
  const urlSearchParams = new URLSearchParams({ limit: "8" });

  const useFethcProductsHandler = () => {
    useFetchProductsAll({ urlSearchParams }).then(({ products }) =>
      setProductsData(products)
    );
  };

  useEffect(() => {
    useFethcProductsHandler;
  });

  return (
    <div className={`container  ${classes.wrapper}`}>
      {productsData && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={4}
          pagination={{
            el: ".swiper-custom--pagnation",
            bulletClass: classes["swiper-custom--bullet"],
            bulletActiveClass: classes["swiper-custom--bullet-action"],
          }}
          navigation={{
            prevEl: ".swiper-arrow-left",
            nextEl: ".swiper-arrow-right",
          }}
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
          {productsData.map((product) => (
            <SwiperSlide key={product.id}>
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

export default ProductsSwiper;
