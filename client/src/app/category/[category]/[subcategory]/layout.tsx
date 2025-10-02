import classes from "./style.module.scss";
import { ReactNode, Suspense } from "react";
import { FilterProvider } from "./(filter-tools)/context/useFilterContext";
import dynamic from "next/dynamic";
// import FilterSkeleton from "./(filter)/_skeleton/FilterSkeleton";

// const FilterDynamic = dynamic(() => import("./(filter)/Filter"), {
// 	ssr: false,
// 	loading: () => <FilterSkeleton />,
// });

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
