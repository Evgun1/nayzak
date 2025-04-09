import Products from "@/components/page-category/section-products/products/Products";
import Subcategories from "@/components/page-category/section-subcategory/subcategories/Subcategories";
import HeaderCategories from "@/components/page-category/HeaderCategories";
import { PageProps } from "../../../../../.next/types/app/page";

export default async function Page(props: PageProps) {
    const slug = [];

    for (const key in props.params) {
        slug.push(props.params[key]);
    }

    return (
        <section>
            <HeaderCategories slug={slug} />
            <Products params={slug} searchParams={props.searchParams} />
        </section>
    );
}
