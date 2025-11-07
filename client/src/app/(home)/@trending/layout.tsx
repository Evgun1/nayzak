import { FunctionComponent, ReactNode } from "react";

interface LayoutTrendingProps {
	children: ReactNode;
}

const LayoutTrending: FunctionComponent<LayoutTrendingProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutTrending;
