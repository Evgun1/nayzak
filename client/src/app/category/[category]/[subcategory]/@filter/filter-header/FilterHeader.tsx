"use client";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./FilterHeader.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { useFilterContext } from "../../(filter-tools)/context/useFilterContext";

const FilterHeader = () => {
	const { setShowFilter } = useFilterContext();

	return (
		<div className={classes["filter-header"]}>
			<span className={TextClassList.SEMIBOLD_22}>Filter</span>
			<ButtonCustom
				styleSettings={{
					state: ["HOVER"],
					color: "DARK",
					type: "TEXT",
					icon: { left: "CLOSE" },
					size: "LARGE",
				}}
				onClick={() => {
					setShowFilter((prev: boolean) => !prev);
				}}
			/>
		</div>
	);
};

export default FilterHeader;
