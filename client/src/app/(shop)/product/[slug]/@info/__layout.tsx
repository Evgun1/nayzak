import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
	return props.children;
};

export default Layout;
