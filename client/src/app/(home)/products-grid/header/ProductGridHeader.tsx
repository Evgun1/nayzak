"use client";

import { ButtonClassList } from "@/types/buttonClassList.enum";
import classes from "./ProductGridHeader.module.scss";

import { FC, useCallback, useEffect, useState } from "react";
import { CategoryItem } from "@/types/categories.types";
import { ISubcategory } from "@/types/subcategories.interface";
import { useSearchParams } from "next/navigation";
import { appCategoriesGet } from "@/lib/api/categories";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import { appProductsGet } from "@/lib/api/products";
import { Select, SelectItem } from "@/ui/select/Select";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";

const ProductGridHeader: FC = ({}) => {
	const searchParams = useSearchParams();
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
	useEffect(() => {
		(async () => {
			const urlSearchParams = new URLSearchParams(
				searchParams?.toString(),
			);

			const categorySearchParams = urlSearchParams
				.get("category")
				?.split("-");
			const subcategorySearchParams = urlSearchParams
				.get("subcategory")
				?.split("-");

			if (categorySearchParams)
				for (const element of categorySearchParams) {
					if (!element.includes("c")) continue;
					if (!Number.isNaN(+element.replaceAll("c", ""))) {
						urlSearchParams.set(
							"categoryId",
							element.replaceAll("c", ""),
						);
						urlSearchParams.delete("category");

						// console.log(element.replaceAll("c", ""));
					}
				}
			if (subcategorySearchParams)
				for (const element of subcategorySearchParams) {
					if (!element.includes("s")) continue;
					if (!Number.isNaN(+element.replaceAll("s", ""))) {
						urlSearchParams.set(
							"subcategoryId",
							element.replaceAll("s", ""),
						);
						urlSearchParams.delete("subcategory");
						// console.log(element.replaceAll("c", ""));
					}
				}

			const [categoriesFetch, subcategoriesFetch] = await Promise.all([
				appCategoriesGet(),
				appSubcategoriesGet(
					urlSearchParams.has("categoryId")
						? urlSearchParams
						: undefined,
				),
			]);

			setCategories(categoriesFetch);
			setSubcategories(subcategoriesFetch);

			if (
				!urlSearchParams.has("categoryId") &&
				!urlSearchParams.has("subcategoryId")
			) {
				return;
			}

			const { productCounts, products } = await appProductsGet({
				searchParams: urlSearchParams,
			});

			if (!Number.isNaN(productCounts) && productCounts > 0) {
				setSubcategories(subcategoriesFetch);
			}
		})();
	}, [searchParams]);

	return (
		<div className={classes["product-grid-header"]}>
			<div className={ButtonClassList.BUTTON_X_LARGE}>
				You’re browsing
			</div>
			<Select
				label={"Categories"}
				styleSetting={{
					color: "DARK",
					size: "X_LARGE",
					fill: "SOLID",
					type: "UNDERLINE",
					icon: { right: "CHEVRON" },
					roundness: "SHARP",
				}}
				defaultSelectKey={searchParams?.get("category") ?? undefined}
			>
				{categories &&
					categories.length > 0 &&
					categories.map((category, i) => (
						<SelectItem
							textValue={category.title}
							itemKey={`${category.title.toLowerCase()}-c${
								category.id
							}`}
							key={i}
						>
							<LinkCustom
								styleSettings={{
									type: "TEXT",
									color: "DARK",
									size: "X_SMALL",
									fill: "SOLID",
									roundness: "SHARP",
								}}
								searchParams={searchParams}
								href={{
									queryParams: {
										category: `${category.title.toLowerCase()}-c${
											category.id
										}`,
									},
									deleteQueryParams: "subcategory",
								}}
							>
								{category.title}
							</LinkCustom>
						</SelectItem>
					))}
			</Select>
			<div className={ButtonClassList.BUTTON_X_LARGE}>In</div>
			<Select
				defaultSelectKey={searchParams?.get("subcategory") ?? undefined}
				label={"Subcategories"}
				styleSetting={{
					color: "DARK",
					fill: "SOLID",
					size: "X_LARGE",
					type: "UNDERLINE",
					icon: { right: "CHEVRON" },
					roundness: "SHARP",
				}}
			>
				{subcategories &&
					subcategories.length > 0 &&
					subcategories.map((subcategory, i) => (
						<SelectItem
							textValue={subcategory.title}
							itemKey={`${subcategory.title.toLowerCase()}-s${
								subcategory.id
							}`}
							key={i}
						>
							<LinkCustom
								searchParams={searchParams}
								styleSettings={{
									color: "DARK",
									size: "X_SMALL",
									type: "TEXT",
									roundness: "SHARP",
								}}
								href={{
									queryParams: {
										subcategory: `${subcategory.title.toLowerCase()}-s${
											subcategory.id
										}`,
									},
								}}
							>
								{subcategory.title}
							</LinkCustom>
						</SelectItem>
					))}
			</Select>
		</div>
	);
};

export default ProductGridHeader;
