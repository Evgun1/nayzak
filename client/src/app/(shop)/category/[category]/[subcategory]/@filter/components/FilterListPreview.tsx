"use client";

import { FC, RefObject, useEffect, useRef } from "react";
import { FilterAttributesItem } from "./FilterList";
import classes from "./FilterListPreview.module.scss";
import { TextClassList } from "@/types/textClassList.enum";
import Form from "@/ui/form/Form";

interface FilterListPreviewProps {
	attribute: FilterAttributesItem;
}

const FilterListPreview: FC<FilterListPreviewProps> = (props) => {
	const { attribute } = props;

	const ref = useRef() as RefObject<HTMLDivElement>;

	useEffect(() => {
		const html = ref.current;
		if (!html) return;

		if (html.scrollHeight > 192)
			html.classList.add(classes["filter-list-preview--scroll"]);
	}, [ref]);


	return (
		<div className={classes["filter-list-preview"]}>
			<div
				className={`${classes["filter-list-preview__header"]} ${TextClassList.SEMIBOLD_14}`}
			>
				{attribute.name.toUpperCase()}
			</div>

			{attribute.name.includes("color") ? (
				<div
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
						/>
					))}
				</div>
			) : (
				<div
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
