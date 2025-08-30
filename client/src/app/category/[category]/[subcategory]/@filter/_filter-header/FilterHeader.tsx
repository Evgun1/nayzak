"use client";
import { TextClassList } from "@/types/textClassList.enum";
import classes from "./FilterHeader.module.scss";
import ButtonCustom from "@/ui/custom-elements/button-custom/ButtonCustom";
import { useFilter } from "../../(filter-tools)/context/useFilter";

const FilterHeader = () => {
	const { setShowFilter } = useFilter();

	return (
		<div className={classes["filter-header"]}>
			<span className={TextClassList.SEMIBOLD_22}>Filter</span>
			<ButtonCustom
				styleSettings={{
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
