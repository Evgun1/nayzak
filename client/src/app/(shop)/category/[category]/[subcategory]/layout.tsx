import classes from "./style.module.scss";
import { FunctionComponent, ReactNode } from "react";
import { FilterProvider } from "./tools/context/useFilterContext";
import Popup from "@/components/popup/Popup";
import { PopupLocalProvider } from "@/components/popup-local/tool/usePopupLocalContext";
import { SearchParams } from "next/dist/server/request/search-params";

interface RootLayoutProps {
	products: ReactNode;
	filter: ReactNode;
	toolbar: ReactNode;
}
const RootLayout: FunctionComponent<RootLayoutProps> = async (props) => {
	const { products, filter, toolbar } = props;

	return (
		<FilterProvider filter={filter}>
			<div className={classes["products__main"]}>
				{toolbar}
				{products}
			</div>
		</FilterProvider>
	);
};
export default RootLayout;

// aspect-ratio: 3 / 4 auto;
