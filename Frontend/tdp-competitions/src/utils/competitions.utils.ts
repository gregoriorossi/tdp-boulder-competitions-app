import { STRINGS } from "../consts/strings.consts";
import { CompetitionStatus, Gender, type ICompetitor, type IProblem, type IRegistration } from "../models/competitions.models";

export function buildFullName(competitor: ICompetitor): string {
	return `${competitor.lastName} ${competitor.firstName}`;
}

export function sortRegistrations(r1: IRegistration, r2: IRegistration): number {
	const fullName1 = buildFullName(r1.competitor);
	const fullName2 = buildFullName(r2.competitor);
	return fullName1 > fullName2 ? 1 : -1;
}

export function genderToString(gender: Gender): string {
	return gender === Gender.MALE ? STRINGS.Male : STRINGS.Female;
}

export function sortProblemsFn(p1: IProblem, p2: IProblem): number {
	return p1.name.localeCompare(p2.name, undefined, {
		numeric: true,
		sensitivity: 'base'
	})
}

export function genderToQueryParam(gender: Gender | null): string {
	switch (gender) {
		case Gender.MALE:
			return "?gender=male";
		case Gender.FEMALE:
			return "?gender=female";
		default:
			return "";
	}
}

export function numberToGender(value: number): Gender {
	switch (value) {
		case 0:
			return Gender.MALE;
		default:
			return Gender.FEMALE;
	}
}

export function numberToCompetitionStatus(value: number): CompetitionStatus	 {
	switch (value) {
		case 0:
			return CompetitionStatus.DRAFT;
		case 1:
			return CompetitionStatus.OPEN;
		case 2:
			return CompetitionStatus.CLOSED;
		default:
			return CompetitionStatus.DRAFT;
	}
}