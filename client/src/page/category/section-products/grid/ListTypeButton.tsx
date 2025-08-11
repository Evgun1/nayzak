"use client";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Link from "next/link";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import classes from "./ListTypeButton.module.scss";
import { TypeList } from "./Toolbar";

type ListTypeButtonProps = {
	icon: IconsIdList;
	typeList: string;
};

const ListTypeButton: FC<ListTypeButtonProps> = (props) => {
	const { icon, typeList } = props;

	const [activeBtn, setActiveBtn] = useState<boolean>(false);
	const searchParams = useSearchParams() as ReadonlyURLSearchParams;

	useEffect(() => {
		if (
			searchParams.has("list_type") &&
			searchParams.get("list_type") !== null
		) {
			setActiveBtn(searchParams.get("list_type") === typeList);
		} else {
			setActiveBtn(TypeList.FIVE === typeList);
		}
	}, [searchParams, typeList]);

	return (
		<div className={`${classes["list-type-button"]}`}>
			<Link
				scroll={false}
				href={`?list_type=${typeList}`}
				className={`${classes["list-type-button__link"]} ${
					activeBtn ? classes["list-type-button__link--action"] : ""
				}`}
			>
				<DisplayIcon
					className={classes["list-type-button__icon"]}
					iconName={icon}
				/>
			</Link>
		</div>
	);
};

export default ListTypeButton;
