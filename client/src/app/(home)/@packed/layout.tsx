import { FunctionComponent, ReactNode } from "react";

interface LayoutPackedProps {
	children: ReactNode;
}

const LayoutPacked: FunctionComponent<LayoutPackedProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutPacked;
