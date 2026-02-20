import IconsIdList from "@/components/icons/IconsIdList";
import {
	Color,
	Fill,
	Roundness,
	Size,
	State,
	Type,
} from "./ActionElements.types";

export interface StyleSettingsObject {
	size?: keyof typeof Size;
	roundness?: keyof typeof Roundness;
	type?: keyof typeof Type;
	color: "DARK" | "LIGHT";
	fill?: keyof typeof Fill;
	state?: Array<keyof typeof State>;
	icon?: {
		left?: keyof typeof IconsIdList;
		right?: keyof typeof IconsIdList;
	};
}
type ColorMapping = Record<
	keyof typeof Type,
	Record<StyleSettingsObject["color"], string>
>;

const COLOR_MAP: ColorMapping = {
	DEFAULT: { DARK: Color.DARK_DEFAULT, LIGHT: Color.LIGHT_DEFAULT },
	SQUARE: { DARK: Color.DARK_DEFAULT, LIGHT: Color.LIGHT_DEFAULT },
	TEXT: { DARK: Color.DARK_TEXT, LIGHT: Color.LIGHT_TEXT },
	UNDERLINE: { DARK: Color.DARK_UNDERLINE, LIGHT: Color.LIGHT_UNDERLINE },
};

function classesCustomStyle(styleSettings: StyleSettingsObject) {
	const classes = [];

	if (styleSettings?.state && styleSettings?.state.length > 0)
		for (const element of styleSettings.state) classes.push(State[element]);

	if (styleSettings.size) classes.push(Size[styleSettings.size]);
	if (styleSettings.roundness)
		classes.push(Roundness[styleSettings.roundness]);
	if (styleSettings.type) {
		classes.push(Type[styleSettings.type]);
	}

	if (styleSettings.type && styleSettings.color) {
		const color = COLOR_MAP[styleSettings.type][styleSettings.color];
		classes.push(color);
	}
	if (styleSettings.fill) classes.push(Fill[styleSettings.fill]);

	return classes.join(" ");
}

export default classesCustomStyle;
