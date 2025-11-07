import { FunctionComponent, ReactNode } from "react";

interface LayoutIconsProps {
	children: ReactNode;
}

const LayoutIcons: FunctionComponent<LayoutIconsProps> = (props) => {
	const { children } = props;
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default LayoutIcons;
