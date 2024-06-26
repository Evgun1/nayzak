import { PageProps } from "../../.next/types/app/layout";
import Banner from "./components/elemets/hero/banner/baner";
import CategoryGrid from "./components/elemets/hero/categories/categoryGrid";
import FeatureTwo from "./components/elemets/hero/featureTwo/FeatureTwo";
import Feature from "./components/elemets/hero/feature/Feature";
import IconsBox from "./components/elemets/hero/iconsBox/IconsBox";
import ProductsCarusel from "./components/elemets/hero/productsCarules/ProductsCarusel";
import ProductGrid from "./components/elemets/hero/productsGrid/productGtid";
import Reviews from "./components/elemets/hero/reviews/Reviews";

import classes from "./mainPage.module.scss";

export default async function Home(props: PageProps) {
  return ( 
    <>
      <header>
        asdfasdf
        <Banner />
      </header>
      <section className={classes.section}>
        <ProductsCarusel />
      </section>
      <section className={classes.section}>
        <CategoryGrid />
      </section>
      <section className={classes.section}>
        <ProductGrid {...props} />
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
