import { STRINGS } from "../consts/strings.consts";

const ColorCodes = STRINGS.ColorCodes;

export function getTextColor(color: string): string {
	switch (color) {
		case ColorCodes.White:
		case ColorCodes.Yellow:
			return ColorCodes.Black;
		default:
			return ColorCodes.White;
	}
} 

export function getBorderColor(color: string): string {
	switch (color) {
		case ColorCodes.White:
			return ColorCodes.Black;
		default:
			return ColorCodes.White;
	}
}