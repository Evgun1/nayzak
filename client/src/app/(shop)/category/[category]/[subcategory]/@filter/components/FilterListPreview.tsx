"use client";
import { FC, RefObject, useEffect, useRef } from "react";
import { FilterAttributesItem } from "./FilterList";
import classes from "./FilterListPreview.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Form from "@/ui/form/Form";
import { useFilterContext } from "../../tools/context/useFilterContext";

interface FilterListPreviewProps {
	attribute: FilterAttributesItem;
}

const FilterListPreview: FC<FilterListPreviewProps> = (props) => {
	const { attribute } = props;
	const { onChangeCheckbox } = useFilterContext();
	const ref = useRef() as RefObject<HTMLDivElement>;

	useEffect(() => {
		const current = ref.current;
		if (!current) return;

		if (current.scrollHeight > 192)
			if (
				!current.classList.contains(
					classes["filter-list-preview--scroll"],
				)
			) {
				current.classList.add(classes["filter-list-preview--scroll"]);
			}
	}, []);

	return (
		<div className={classes["filter-list-preview"]}>
			<div
				className={`${classes["filter-list-preview__header"]} ${TextClassList.SEMIBOLD_14}`}
			>
				{attribute.name.toUpperCase()}
			</div>

			{attribute.name.includes("color") ? (
				<div
					id="filter-preview"
					ref={ref}
					className={`${classes["filter-list-preview__color"]}`}
				>
					{attribute.value.map((val, i) => (
						<Form.Checkbox
							className={`${
								!val.active
									? classes[
											"filter-list-preview__color-item--disable"
										]
									: ""
							} ${classes["filter-list-preview__color-item"]}`}
							settingsStyle={{
								roundness: "CIRCLE",
								size: "LARGE",
							}}
							id={val.id}
							value={val.type}
							name={attribute.name.toLowerCase()}
							checked={val.checked ? val.checked : undefined}
							style={
								{
									"--checkbox-background-color": val.type,
									"--checkbox-border-color": val.type,
								} as React.CSSProperties
							}
							key={i}
							onChange={onChangeCheckbox}
						/>
					))}
				</div>
			) : (
				<div
					id="filter-preview"
					ref={ref}
					className={`${classes["filter-list-preview__attribute"]}`}
				>
					{attribute.value.map((val, i) => (
						<Form.Checkbox
							className={
								!val.active
									? classes[
											"filter-list-preview__attribute--disable"
										]
									: ""
							}
							key={i}
							id={val.id}
							value={val.id}
							name={attribute.name.toLocaleLowerCase()}
							checked={val.checked ? val.checked : undefined}
							settingsStyle={{
								roundness: "SHARP",
								size: "SMALL",
							}}
							onChange={onChangeCheckbox}
						>
							{val.type}
						</Form.Checkbox>
					))}
				</div>
			)}
		</div>
	);
};

export default FilterListPreview;
