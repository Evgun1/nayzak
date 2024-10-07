import { PageProps } from "../../.next/types/app/layout";
import Banner from "../components/page-hero/banner/Baner";
import CategoryGrid from "../components/page-hero/categories/CategoryGrid";
import FeatureTwo from "../components/page-hero/feature-two/FeatureTwo";
import Feature from "../components/page-hero/feature/Feature";
import IconsBox from "../components/page-hero/iconsBox/IconsBox";
import ProductsSwiper from "../components/page-hero/products-swiper/ProductsSwiper";
import ProductGrid from "../components/page-hero/products-grid/ProductGtid";
import Reviews from "../components/page-hero/reviews/Reviews";

import classes from "./Hero.module.scss";
import { appProductsGet } from "@/utils/http/products";

export default async function Home(props: PageProps) {
  return (
    <>
      <section>
        <Banner />
      </section>
      <section className={classes.section}>
        <ProductsSwiper />
      </section>
      <section className={classes.section}>
        <CategoryGrid />
      </section>
      <section className={classes.section}>
        <ProductGrid />
      </section>
      <section className={classes.section}>
        <Feature />
      </section>
      <section className={classes.section}>
        <Reviews />
      </section>
      <section className={classes.section}>
        <FeatureTwo />
      </section>
      <section className={classes.section}>
        <IconsBox />
      </section>
    </>
  );
}
