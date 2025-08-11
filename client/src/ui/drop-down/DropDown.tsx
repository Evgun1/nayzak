"use client";

import React, {
	FC,
	ReactElement,
	ReactNode,
	RefObject,
	useId,
	useRef,
} from "react";

import DropDownBody from "./DropDownBody";

import classes from "./DropDown.module.scss";
import { StyleSettingsObject } from "../custom-elements/button-custom/ButtonCustom";
import DropDownTrigger from "./DropDownTrigger";
import DropDownItem from "./DropDownItem";

type DropDownProps = {
	btnCustomSettings?: StyleSettingsObject;
	children: ReactNode;
	styles?: string;
};

const DropDownComponent: FC<DropDownProps> = (
	{ children, styles },
	...props
) => {
	const wrapperRef = useRef() as RefObject<HTMLDivElement>;
	const generateId = useId().replaceAll(":", "");
	const dropDownId = `drop-down__${generateId}`;

	function childrenRecursion(children: ReactNode): ReactNode {
		return React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) return;

			switch (child.type) {
				case DropDownItem:
				case DropDownTrigger:
				case DropDownBody:
					if (child.type === DropDownTrigger) {
						const DropDownTriggerChild = child as ReactElement<{
							dropDownId: string;
						}>;
						return React.cloneElement(DropDownTriggerChild, {
							dropDownId: dropDownId,
						});
					}

					return React.cloneElement(child);

				default:
					const childrenWithChild = child as ReactElement<{
						children: ReactNode;
					}>;

					return React.cloneElement(childrenWithChild, {
						children: childrenRecursion(childrenWithChild),
					});
			}
		});
	}

	return (
		<div
			ref={wrapperRef}
			id={dropDownId}
			className={`${styles ? styles : ""} ${classes["drop-down"]}`}
		>
			{childrenRecursion(children)}
		</div>
	);
};

const DropDown = Object.assign(DropDownComponent, {
	Trigger: DropDownTrigger,
	Body: DropDownBody,
	Item: DropDownItem,
});

export default DropDown;
