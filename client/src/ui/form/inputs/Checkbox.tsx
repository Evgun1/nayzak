"use client";
import { ChangeEvent, CSSProperties, FC, ReactNode } from "react";
import classes from "./Checkbox.module.scss";
import { Roundness, Size } from "./Checkbox.type";

type CheckboxProps = {
	id?: number;
	name?: string;
	value?: string | number;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
	useId?: string;
	settingsStyle: {
		size: keyof typeof Size;
		roundness: keyof typeof Roundness;
	};
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: FC<CheckboxProps> = (props) => {
	return (
		<label
			htmlFor={props.id?.toString()}
			className={`${classes["checkbox"]} ${
				props.className ? props.className : ""
			}`}
		>
			<input
				className={classes["checkbox__input"]}
				onChange={props.onChange}
				type="checkbox"
				name={props.name}
				id={props.id?.toString()}
				value={props.value}
			/>
			<div
				id={props.id?.toString()}
				style={props.style}
				className={`${classes["checkbox__input-marker"]}
                ${classes[Size[props.settingsStyle.size]]}
                ${classes[Roundness[props.settingsStyle.roundness]]}
                `}
			/>

			{props.children ? (
				<div className={classes["checkbox__children"]}>
					{props.children}
				</div>
			) : (
				<></>
			)}
		</label>
	);
};

export default Checkbox;
