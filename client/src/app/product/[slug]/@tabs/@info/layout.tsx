"use server";

import { FC, ReactNode } from "react";

type InfoLayoutProps = {
	children: ReactNode;
};

const InfoLayout: FC<InfoLayoutProps> = async (props) => {
	return <>{props.children}</>;
};
export default InfoLayout;
