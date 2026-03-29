import type { ICompetitor, IRegistration } from "../models/competitions.models";

export function BuildFullName(competitor: ICompetitor): string {
	return `${competitor.lastName} ${competitor.firstName}`;
}

export function sortRegistrations(r1: IRegistration, r2: IRegistration): number {
	const fullName1 = BuildFullName(r1.competitor);
	const fullName2 = BuildFullName(r2.competitor);
	return fullName1 > fullName2 ? 1 : -1;
}