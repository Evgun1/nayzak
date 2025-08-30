"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import classes from "./Header.module.scss";
import Breadcrumbs from "@/ui/breadcrumbs/Breadcrumbs";
import { useParams } from "next/navigation";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";
import Image from "next/image";
import PasteImage from "@/../public/PasteImage.png";

type HeaderCategoriesProps = {
	// slug: { title: string; href: string }[];
};

const Header: FC<HeaderCategoriesProps> = (props) => {
	const params = useParams();

	const slug = useMemo(() => {
		const slug: { title: string; href: string }[] = [];

		for (const key in params) {
			const href = params[key] as string;
			const title = capitalizeAndSeparateWords(
				href.split("-").at(0) as string,
			);
			slug.push({ href, title });
		}
		return slug;
	}, [params]);

	return (
		<div className={classes["header"]}>
			<Image
				className={classes["header__img"]}
				placeholder="blur"
				blurDataURL={PasteImage.blurDataURL}
				src={PasteImage}
				fill
				alt="header"
			/>

			<Breadcrumbs
				item={slug}
				path="category"
			/>
			<h3 className={classes["header__title"]}>
				{slug.at(-1)?.title || ""}
			</h3>
		</div>
	);
};

export default Header;
