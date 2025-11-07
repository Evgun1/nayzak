import { FunctionComponent, ReactNode } from "react";

interface LayoutArrivalsProps {
	children: ReactNode;
}

const LayoutArrivals: FunctionComponent<LayoutArrivalsProps> = ({
	children,
}) => {
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutArrivals;
