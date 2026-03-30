"use client";

import { FC, ReactNode, useEffect } from "react";
import ButtonCustom from "../custom-elements/button-custom/ButtonCustom";
import { useSelect } from "./SelectContext";
import { StyleSettingsObject } from "../custom-elements/classesCustomStyle";

const SelectTrigger: FC<{
	label: string;
	styleSetting: StyleSettingsObject;
}> = ({ styleSetting }) => {
	const { defaultLabel } = useSelect();

	return (
		<ButtonCustom styleSettings={styleSetting}>{defaultLabel}</ButtonCustom>
	);
};

export default SelectTrigger;
