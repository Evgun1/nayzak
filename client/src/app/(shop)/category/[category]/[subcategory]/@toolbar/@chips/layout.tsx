import { FunctionComponent, ReactNode } from "react";

interface ChipsLayoutProps {
	children: ReactNode;
}

const ChipsLayout: FunctionComponent<ChipsLayoutProps> = ({ children }) => {
	return children;
};

export default ChipsLayout;
