"use client";

import "../../custom-elements/style.scss";
import classesCustomStyle, {
	StyleSettingsObject,
} from "@/ui/custom-elements/classesCustomStyle";
import classes from "./InputFile.module.scss";
import { FunctionComponent } from "react";
import DisplayIcon from "@/components/icons/displayIcon";
import IconsIdList from "@/components/icons/IconsIdList";

interface InputFileProps {
	className?: string;
	styleSettings: StyleSettingsObject;
}

const InputFile: FunctionComponent<InputFileProps> = (props) => {
	const { className, styleSettings } = props;

	const classesCustom = classesCustomStyle(styleSettings);

	return (
		<div className={`${classes["input-file"]}`}>
			<input
				className={classes["input-file__input"]}
				id="input-file"
				type="file"
			/>
			<label
				htmlFor="input-file"
				className={`${classes["input-file__label"]} ${classesCustom} ${className ?? ""}`}
			>
				{styleSettings.icon?.left ? (
					<DisplayIcon
						iconName={IconsIdList[styleSettings.icon.left]}
					/>
				) : (
					""
				)}
				{styleSettings.icon?.right ? (
					<DisplayIcon
						iconName={IconsIdList[styleSettings.icon.right]}
					/>
				) : (
					""
				)}
			</label>
		</div>
	);
};

export default InputFile;
