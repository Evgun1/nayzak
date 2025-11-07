import { FunctionComponent, ReactNode } from "react";

interface LayoutCategoriesProps {
	children: ReactNode;
}

const LayoutCategories: FunctionComponent<LayoutCategoriesProps> = (props) => {
	const { children } = props;

	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutCategories;
