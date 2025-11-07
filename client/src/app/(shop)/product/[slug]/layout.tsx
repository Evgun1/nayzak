"use server";
import React from "react";
import classes from "./style.module.scss";

export default async function ProductLayout(props: {
	children: React.ReactNode;
	info: React.ReactNode;
	images: React.ReactNode;
	tabs: React.ReactNode;
	params: { slug: string };
}) {
	const { info, tabs, images } = props;

	return (
		<>
			{info}
			{tabs}
		</>
	);
}
