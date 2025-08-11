"use client";

import { FC, ReactNode, useState } from "react";
import classes from "./ProductTabs.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

export interface ProductsTabsItem {
	label: string;
	children: ReactNode;
}

type ProductsTabsProps = { data: ProductsTabsItem[] };

const ProductsTabs: FC<ProductsTabsProps> = ({ data }) => {
	const [tabAction, setTabAction] = useState<number>(2);

	return (
		<div className={classes["product-tabs"]}>
			<div className={classes["product-tabs__header"]}>
				{data.length > 0 &&
					data.map((data, i) => (
						<ButtonCustom
							key={i}
							className={`${
								classes["product-tabs__header-button"]
							} ${
								tabAction === i
									? classes[
											"product-tabs__header-button--action"
									  ]
									: ""
							}`}
							styleSettings={{
								color: "DARK",
								size: "MEDIUM",
								type: "TEXT",
							}}
							onClick={() => setTabAction(i)}
						>
							{data.label}
						</ButtonCustom>
					))}
			</div>

			{data[tabAction].children}
		</div>
	);
};

export default ProductsTabs;
