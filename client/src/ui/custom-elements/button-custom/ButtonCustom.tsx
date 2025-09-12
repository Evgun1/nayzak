import { FC, MouseEvent, ReactNode, RefObject } from "react";

import "../style.scss";
import {
	Color,
	Fill,
	Roundness,
	Size,
	State,
	Type,
} from "../ActionElements.types";
import IconsIdList from "@/components/icons/IconsIdList";
import DisplayIcon from "@/components/icons/displayIcon";

export interface StyleSettingsObject {
	size?: keyof typeof Size;
	roundness?: keyof typeof Roundness;
	fill?: keyof typeof Fill;
	type?: keyof typeof Type;
	color?: "DARK" | "LIGHT";
	state?: Array<keyof typeof State>;
	icon?: {
		left?: keyof typeof IconsIdList;
		right?: keyof typeof IconsIdList;
	};
}

interface TypeObject {
	button: "button";
	reset: "reset";
	submit: "submit";
}

type SiteButtonProps = {
	styleSettings: StyleSettingsObject;
	className?: string | null;
	btnRef?: RefObject<HTMLButtonElement>;
	id?: string;
	children?: ReactNode;
	typeProperty?: keyof TypeObject;
	onClick?: (e: MouseEvent) => void;
	onSubmit?: () => void;
};

export const ButtonCustom: FC<SiteButtonProps> = ({
	styleSettings: { color, roundness, size, type, icon, fill, state },
	className,
	children,
	btnRef,
	id,
	typeProperty,
	onClick,
	onSubmit,
}) => {
	let btnColor;

	if (type === "DEFAULT" || type === "SQUARE") {
		color === "DARK"
			? (btnColor = Color.DARK_DEFAULT)
			: (btnColor = Color.LIGHT_DEFAULT);
	}

	if (type === "TEXT") {
		color === "DARK"
			? (btnColor = Color.DARK_TEXT)
			: (btnColor = Color.LIGHT_TEXT);
	}

	if (type === "UNDERLINE") {
		color === "DARK"
			? (btnColor = Color.DARK_UNDERLINE)
			: (btnColor = Color.LIGHT_UNDERLINE);
	}

	const classes: any[] = [
		btnColor,
		size && Size[size],
		roundness && Roundness[roundness],
		type && Type[type],
		fill && Fill[fill],
	];

	if (state && state.length > 0)
		for (const element of state) classes.push(State[element]);

	return (
		<button
			id={id}
			ref={btnRef}
			onSubmit={onSubmit}
			onClick={onClick ? (e) => onClick(e) : undefined}
			className={`${className ?? ""} ${classes.join(" ")}`}
			type={typeProperty ?? "button"}
		>
			{icon?.left ? (
				<DisplayIcon iconName={IconsIdList[icon.left]} />
			) : (
				""
			)}
			{children ?? ""}
			{icon?.right ? (
				<DisplayIcon iconName={IconsIdList[icon.right]} />
			) : (
				""
			)}
		</button>
	);
};

export default ButtonCustom;
