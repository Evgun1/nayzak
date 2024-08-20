import HeaderProducts from "@/components/page-category/section-products/header-productsct/HeaderProducts";
import Products from "@/components/page-category/section-products/products/Products";
import HeaderSubcategory from "@/components/page-category/section-subcategory/header-subcategory/HeaderSubcategory";
import Subcategories from "@/components/page-category/section-subcategory/subcategories/Subcategories";
import { useFetchSubcategoriesByCategory } from "@/hooks/useFetchSubcategories";

interface paramsData {
  slug: string[];
}

type pageProps = {
  params: paramsData;
};

export default async function page({ params }: pageProps) {
  if (params.slug.length === 1) {
    return (
      <section>
        <HeaderSubcategory
          title={params.slug[0][0].toUpperCase() + params.slug[0].slice(1)}
        />
        <Subcategories slug={params.slug[0]} />
      </section>
    );
  } else if (params.slug.length === 2) {
    return (
      <section>
        <HeaderProducts
          title={params.slug[1][0].toUpperCase() + params.slug[0].slice(1)}
        />

        <Products />
      </section>
    );
  }
}