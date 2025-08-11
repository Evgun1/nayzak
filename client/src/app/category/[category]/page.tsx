"use server";

import ProductsSection from "@/page/category/section-products/Products";
import HeaderCategories from "@/page/category/HeaderCategories";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import { FC } from "react";
import { PageProps } from "../../../../.next/types/app/layout";
import SubcategoriesSection from "@/page/category/section-subcategory/Subcategories";
const Page: FC<PageProps> = (props) => {
	const slug = [] as { id: number; title: string; href: string }[];

	for (const key in props.params) {
		const obj = {} as { id: number; title: string; href: string };
		for (const element of (props.params[key] as string).split("-")) {
			if (!Number.isNaN(+element.slice(1))) {
				obj.id = +element.slice(1);
			} else {
				obj.title = capitalizeAndSeparateWords(element);
			}
			obj.href = props.params[key];
		}
		slug.push(obj);
	}

	return (
		<section>
			<HeaderCategories slug={slug} />
			<SubcategoriesSection params={props.params} />
		</section>
	);
};

export default Page;
