import { FunctionComponent, ReactNode } from "react";

interface LayoutProductsProps {
	children: ReactNode;
}

const LayoutProducts: FunctionComponent<LayoutProductsProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutProducts;
