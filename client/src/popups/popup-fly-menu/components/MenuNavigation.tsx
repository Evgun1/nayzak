"use client";
import classes from "./MenuNavigation.module.scss";
import { appCategoriesGet } from "@/lib/api/categories";
import { appProductsGet } from "@/lib/api/products";
import { appSubcategoriesGet } from "@/lib/api/subcategories";
import Accordion from "@/ui/accordion/Accordion";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import LinkCustom from "@/ui/custom-elements/link-custom/LinkCustom";
import React, { FunctionComponent, use, useEffect, useState } from "react";

type NavigationData = {
	label: string;
	url?: string;
	action: boolean;
	children?: NavigationData[];
};

interface MenuNavigationProps {}
const MenuNavigation: FunctionComponent<MenuNavigationProps> = () => {
	const [navigation, setNavigation] = useState<NavigationData[]>();

	useEffect(() => {
		(async () => {
			const data: NavigationData[] = [];
			const categories = await appCategoriesGet();
			for (const category of categories) {
				const urlSearchParams = new URLSearchParams([
					["categoryId", `${category.id}`],
				]);
				const subcategories = await appSubcategoriesGet(
					urlSearchParams,
				);

				if (subcategories.length <= 0) continue;

				const children: NavigationData[] = [];
				for (const subcategory of subcategories) {
					urlSearchParams.set("subcategoryId", `${subcategory.id}`);

					const { products } = await appProductsGet({
						searchParams: urlSearchParams,
					});

					children.push({
						// action: true,
						action: products.length > 0,
						label: subcategory.title,
						url: `${category.title.toLowerCase()}-c${
							category.id
						}/${subcategory.title.toLowerCase()}-s${
							subcategory.id
						}`,
					});
				}
				data.push({
					action: subcategories.length > 0,
					label: category.title,
					children,
				});
			}

			setNavigation(data);
		})();
	}, []);

	if (!navigation || navigation.length <= 0) return null;

	return (
		<div className={classes["menu-nav"]}>
			{navigation.map((cat, i) => (
				<Accordion key={i}>
					{cat.action && (
						<Accordion.Header
							className={classes["menu-nav__header"]}
						>
							<ButtonCustom
								className={classes["menu-nav__header-btn"]}
								styleSettings={{
									color: "DARK",
									type: "TEXT",
									icon: { right: "CHEVRON" },
									size: "SMALL",
								}}
							>
								{cat.label}
							</ButtonCustom>
						</Accordion.Header>
					)}

					{cat.children &&
						cat.children.length > 0 &&
						cat.children.map(
							(sub, i) =>
								sub.action && (
									<Accordion.Body
										className={classes["menu-nav__body"]}
										key={i}
									>
										<LinkCustom
											className={
												classes["menu-nav__body-link"]
											}
											href={{
												endpoint: `/category/${sub.url}`,
											}}
											styleSettings={{
												color: "DARK",
												type: "TEXT",
												size: "MEDIUM",
											}}
										>
											{sub.label}
										</LinkCustom>
									</Accordion.Body>
								),
						)}
				</Accordion>
			))}
		</div>
	);
};

export default MenuNavigation;
