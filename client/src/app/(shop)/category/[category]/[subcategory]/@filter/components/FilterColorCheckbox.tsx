"use client";
import { FC } from 'react';
import classes from './FilterColorCheckbox.module.scss'
import { FilterAttributesItem } from './FilterList';
import Form from '@/ui/form/Form';



type FilterColorCheckboxProps = {
	attribute: FilterAttributesItem;
	className?: string;
	id?: string;
};

const FilterColorCheckbox: FC<FilterColorCheckboxProps> = (props) => {
	const { attribute } = props;

	return (
		<div
			id={props.id}
			className={`${classes["color-checkbox"]} ${
				props.className ? props.className : ""
			}`}
		>
			{attribute.value.map((val, i) => (
				<Form.Checkbox
					className={`${
						!val.active
							? classes["color-checkbox__item--disable"]
							: ""
					} ${classes["color-checkbox__item"]}`}
					settingsStyle={{
						roundness: "CIRCLE",
						size: "LARGE",
					}}
					id={val.id}
					value={val.type}
					name={attribute.name.toLowerCase()}
					checked={val.checked}
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
	);
};

export default FilterColorCheckbox;
