"use server";

import classes from "./Breadcrumbs.module.scss";

import { TextClassList } from "@/types/textClassList.enum";
import { ButtonClassList } from "@/types/buttonClassList.enum";
import LinkCustom from "../custom-elements/link-custom/LinkCustom";
import { capitalizeAndSeparateWords } from "@/utils/capitalizeAndSeparateWords";

export interface BreadcrumbsPathItems {
	path?: string;
	slug?: string;
}

type BreadcrumbsProductProps = {
	item: { title: string; href?: string }[];
	className?: string;
	path?: string;
};

export default async function Breadcrumbs(props: BreadcrumbsProductProps) {
	const { path, item } = props;

	const breadcrumbsArr = [] as {
		title: string;
		href: string;
	}[];

	let http = path ? `/${path}` : "";

	for (const element of item) {
		const title = capitalizeAndSeparateWords(element.title);
		// if (item && item.includes(element)) {

		http += !element.href
			? `/${element.title.toLowerCase()}`
			: element.href;

		breadcrumbsArr.push({
			href: http,
			title,
		});
		// }
	}
	breadcrumbsArr.unshift({ href: "/", title: "Home" });

	return (
		<ul
			className={
				`${classes.breadcrumbs} ${props.className ? props.className : ""}`
			}
		>
			{breadcrumbsArr &&
				breadcrumbsArr.map((data, index, array) => (
					<li
						className={classes["breadcrumbs__item"]}
						key={index}
					>
						{index + 1 !== array.length ? (
							<LinkCustom
								styleSettings={{
									type: "TEXT",
									color: "DARK",
									roundness: "SHARP",
									size: "X_SMALL",
									icon: { right: "CHEVRON" },
								}}
								href={{ endpoint: data.href }}
								className={`${TextClassList.REGULAR_12} ${classes["breadcrumbs__link"]}`}
							>
								{data.title}
								{/* {data.slug?.replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                )} */}
							</LinkCustom>
						) : (
							<span
								key={index}
								className={`${
									TextClassList.REGULAR_12 &&
									ButtonClassList.BUTTON_X_SMALL
								} ${classes["breadcrumbs__link"]} ${
									classes["breadcrumbs__link--active"]
								}`}
							>
								{data.title}
							</span>
						)}
					</li>
				))}
		</ul>
	);
}
