"use server";

import classes from "./ListTypeButton.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import { FC } from "react";
import { TypeList } from "./SelectTypeList";
import Link from "next/link";
import DisplayIcon from "@/components/icons/displayIcon";
import { cookies } from "next/headers";
import { SearchParams } from "next/dist/server/request/search-params";

type ListTypeButtonProps = {
	icon: IconsIdList;
	typeList: string;
	searchParams: SearchParams;
};

const ListTypeButton: FC<ListTypeButtonProps> = async (props) => {
	const { icon, typeList } = props;
	const searchParams = await props.searchParams;
	const urlSearchParams = new URLSearchParams(searchParams.toString());

	const cookiesStorage = await cookies();
	const defaultListType = cookiesStorage.get("default-list-type");

	urlSearchParams.set("list_type", typeList);

	const isActive =
		searchParams["list_type"] && searchParams["list_type"] !== null
			? searchParams["list_type"] === typeList
			: (defaultListType?.value || TypeList.FIVE) === typeList;

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
