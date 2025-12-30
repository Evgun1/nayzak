import classes from "./style.module.scss";
import { ReactNode } from "react";
import { FilterProvider } from "./tools/context/useFilterContext";
import Popup from "@/components/popup/Popup";
import { PopupLocalProvider } from "@/components/popup-local/tool/usePopupLocalContext";

export default function RootLayout(props: {
	params: { category: string; subcategory: string };
	searchParams: Record<string, string>;
	products: ReactNode;
	filter: ReactNode;
	toolbar: ReactNode;
}) {
	const { products, filter, toolbar } = props;

	return (
		<FilterProvider
			searchParams={props.searchParams}
			filter={filter}
		>
			<div className={classes["products__main"]}>
				{toolbar}
				{products}
			</div>
		</FilterProvider>
	);
}

// aspect-ratio: 3 / 4 auto;
