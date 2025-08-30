"use client";

import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";
import Link from "next/link";
// import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import classes from "./ListTypeButton.module.scss";
import { TypeList } from "./SelectTypeList";
import { useSearchParams } from "next/navigation";

type ListTypeButtonProps = {
	// searchParams: Record<string, any>;
	icon: IconsIdList;
	typeList: string;
};

const ListTypeButton: FC<ListTypeButtonProps> = (props) => {
	const { icon, typeList } = props;
	const searchParams = useSearchParams();
	const [isActive, setIsActive] = useState<boolean>();

	// const urlSearchParams = useMemo(() => {
	const urlSearchParams = new URLSearchParams(searchParams.toString());
	urlSearchParams.set("list_type", typeList);

	useEffect(() => {}, [searchParams]);
	// let isActive = TypeList.FIVE === urlSearchParams.get(typeList);

	// return urlSearchParams;
	// }, [searchParams]);

	useEffect(() => {
		if (
			searchParams.has("list_type") &&
			searchParams.get("list_type") !== null
		) {
			setIsActive(searchParams.get("list_type") === typeList);
		} else {
			setIsActive(TypeList.FIVE === typeList);
		}
	}, [searchParams, typeList]);

	return (
		<div className={`${classes["list-type-button"]}`}>
			<Link
				scroll={false}
				href={`?${urlSearchParams}`}
				className={`${classes["list-type-button__link"]} ${
					isActive ? classes["list-type-button__link--action"] : ""
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
