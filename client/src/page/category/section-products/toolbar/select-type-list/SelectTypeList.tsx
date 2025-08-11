import React from "react";
import classes from "./SelectTypeList.module.scss";
import IconsIdList from "@/components/icons/IconsIdList";
import ListTypeButton from "../../grid/ListTypeButton";

export enum TypeList {
	FIVE = "five_grid",
	FOUR = "four_grid",
	THREE = "three_grid",
	TWO = "two_grid",
	LIST = "list",
}

const SELECTOR = [
	{ icon: IconsIdList.FIVE_COLUMNS, typeList: TypeList.FIVE },
	{ icon: IconsIdList.FOUR_COLUMNS, typeList: TypeList.FOUR },
	{ icon: IconsIdList.THREE_COLUMNS, typeList: TypeList.THREE },
	{ icon: IconsIdList.TWO_COLUMNS, typeList: TypeList.TWO },
	{ icon: IconsIdList.LIST_COLUMNS, typeList: TypeList.LIST },
];

const SelectTypeList: React.FC = () => {
	return (
		<ul className={classes["type-list"]}>
			{SELECTOR.map((value, index) => (
				<li key={index}>
					<ListTypeButton
						icon={value.icon}
						typeList={value.typeList}
					/>
				</li>
			))}
		</ul>
	);
};

export default SelectTypeList;
