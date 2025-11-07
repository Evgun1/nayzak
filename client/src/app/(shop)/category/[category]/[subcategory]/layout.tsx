import classes from "./style.module.scss";
import { ReactNode } from "react";
import { FilterProvider } from "./tools/context/useFilterContext";

export default function RootLayout(props: {
	params: { category: string; subcategory: string };
	searchParams: Record<string, string>;
	products: ReactNode;
	filter: ReactNode;
	toolbar: ReactNode;
}) {
	const { products, filter, toolbar } = props;

	return (
		<div className={classes["products"]}>
			<FilterProvider
				searchParams={props.searchParams}
				filter={filter}
			>
				<div className={classes["products__main"]}>
					{toolbar}
					{products}
				</div>
			</FilterProvider>
		</div>
	);
}

// aspect-ratio: 3 / 4 auto;
