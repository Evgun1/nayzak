import Products from "@/components/page-category/section-products/products/Products";
import Subcategories from "@/components/page-category/section-subcategory/subcategories/Subcategories";
import HeaderCategories from "@/components/page-category/HeaderCategories";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Page(props: PageProps) {
    return (
        <section>
            <HeaderCategories slug={[...props.params.slug]} />
            {props.params.slug.length === 1 ? (
                <Subcategories slug={props.params.slug[0]} />
            ) : (
                <Products
                    params={props.params.slug}
                    searchParams={props.searchParams}
                />
            )}
        </section>
    );
}
