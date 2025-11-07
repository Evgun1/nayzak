"use client";

import classes from "./ListTypeButton.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { TypeList } from "./SelectTypeList";
import Link from "next/link";
import DisplayIcon from "@/components/icons/displayIcon";

type ListTypeButtonProps = {
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
