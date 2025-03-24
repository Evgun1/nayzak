import HeaderProducts from "@/components/page-category/section-products/header-products/HeaderProducts";
import Products from "@/components/page-category/section-products/products/Products";
import HeaderSubcategory from "@/components/page-category/section-subcategory/header-subcategory/HeaderSubcategory";
import PopupLoading from "@/components/popup-loading/PopupLoading";
import dynamic from "next/dynamic";
import Subcategories from "@/components/page-category/section-subcategory/subcategories/Subcategories";
import { PageProps } from "../../../../.next/types/app/layout";
import HeaderCategories from "@/components/page-category/HeaderCategories";

export default async function page(props: PageProps) {
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
