"use server";
import { FunctionComponent, ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = async ({ children }) => {
	return (
		<section>
			<div className="container">{children}</div>
		</section>
	);
};

export default Layout;
