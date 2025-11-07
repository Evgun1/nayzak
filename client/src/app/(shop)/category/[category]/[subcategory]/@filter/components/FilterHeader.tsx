"use client";
import { TextClassList } from "@/types/textClassList.enum";
import { useFilterContext } from "../../tools/context/useFilterContext";
import classes from "./FilterHeader.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";

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
