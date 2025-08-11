import ProductsSection from "@/page/category/section-products/Products";
// import Subcategories from "@/components/page-category/section-subcategory/subcategories/Subcategories";
import HeaderCategories from "@/page/category/HeaderCategories";
import { object } from "zod";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";

export default async function Page(props: any) {
	const slug = [] as { id: number; title: string; href: string }[];

	for (const key in props.params) {
		const obj = {} as { id: number; title: string; href: string };
		for (const element of (props.params[key] as string).split("-")) {
			if (!Number.isNaN(+element.slice(1))) {
				obj.id = +element.slice(1);
			} else {
				obj.title = capitalizeAndSeparateWords(element);
				// console.log(element);
			}

			obj.href = props.params[key];
		}
		slug.push(obj);
	}

	return (
		<section>
			<HeaderCategories slug={slug} />
			<ProductsSection
				params={slug}
				searchParams={props.searchParams}
			/>
		</section>
	);
}
