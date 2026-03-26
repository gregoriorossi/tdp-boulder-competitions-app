import { STRINGS } from "../consts/strings.consts";
import type { IProblemsGroup } from "../models/competitions.models";

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

export function sortProblemsGroups(g1: IProblemsGroup, g2: IProblemsGroup): number {
	return g1.order > g2.order ? 1 : -1;
}

export function getSelectableColors(allColors: string[], selectedProblemsGroups: IProblemsGroup[]): string[] {
	const selectedColors: string[] = selectedProblemsGroups.map(g => g.colorCode);
	return allColors.filter(c => !selectedColors.includes(c));
}

export const allColors: string[] = [
	ColorCodes.White,
	ColorCodes.Blue,
	ColorCodes.Green,
	ColorCodes.Yellow,
	ColorCodes.Red,
	ColorCodes.Black,
	ColorCodes.Orange,
	ColorCodes.Brown,
	ColorCodes.Cyan,
	ColorCodes.Magenta,
	ColorCodes.Gray,
	ColorCodes.LightGray,
	ColorCodes.Navy,
	ColorCodes.Teal
];