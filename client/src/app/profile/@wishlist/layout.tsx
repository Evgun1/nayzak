"use server";
import { FunctionComponent, ReactNode, Suspense } from "react";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = async (props) => {
	const { children } = props;
	return (
		<Suspense fallback={<div>Loading</div>}>
			<div>{children}</div>
		</Suspense>
	);
};

export default Layout;
