"use client";

import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import classes from "./LoadMore.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

type LoaderProps = {
	children: ReactNode;
	totalCount: number;
	className?: any;
	btnClickHandler?: () => void;
};

const LoaderButton: FC<LoaderProps> = ({
	totalCount,
	children,
	btnClickHandler,
	className,
}) => {
	const [curLength, setCurLength] = useState<number>(0);

	const childrenArr = children as ReactElement[][];

	const childrenLength =
		React.Children.map(children, (child) => {
			return child;
		})?.length || 0;

	useEffect(() => {
		const length = childrenArr
			.map((child, i) => {
				if (child) {
					return child.length;
				}

				return 0;
			})
			.reduce((a, b) => {
				return a + b;
			});

		if (length > 0) {
			setCurLength(length);
		}
	}, [childrenArr]);

	if (!children) return;

	return (
		<div>
			<ul className={`${className} ${classes["load-more"]}`}>
				{children}
			</ul>
			{totalCount > childrenLength ? (
				<ButtonCustom
					onClick={btnClickHandler}
					styleSettings={{
						fill: "SOLID",
						size: "MEDIUM",
						type: "DEFAULT",
						color: "DARK",
						roundness: "SHARP",
					}}
				>
					Load More
				</ButtonCustom>
			) : (
				<></>
			)}
		</div>
	);
};

export default LoaderButton;
