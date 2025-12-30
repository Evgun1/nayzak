"use client";

import { useAppSelector } from "@/redux/redux";
import React, { ReactNode, useMemo } from "react";
import HeaderActionMobile from "./components/action-mobile/HeaderActionMobile";
import dynamic from "next/dynamic";
import HeaderActionMobileSkeleton from "./components/action-mobile/skeleton/HeaderActionMobileSkeleton";

const HeaderActionMobileDynamic = dynamic(
	() => import("./components/action-mobile/HeaderActionMobile"),
	{ ssr: false, loading: () => <HeaderActionMobileSkeleton /> },
);

const TestComponent = ({ children }: { children: ReactNode }) => {
	const responsive = useAppSelector((selector) => selector.responsive);

	const responsiveMemo = useMemo(() => responsive, [responsive]);

	return (
		<React.Fragment>
			{responsiveMemo.isDesktop ? (
				children
			) : (
				<HeaderActionMobileDynamic />
			)}
		</React.Fragment>
	);
};

export default TestComponent;
