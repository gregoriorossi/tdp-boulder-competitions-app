import type { CompetitionStatus } from "./competitions.models";

export interface ICompetition {
	title: string;
	description: string;
	slug: string;
	isOpen: boolean;
	registrationsOpen: boolean;
	rankingsVisible: boolean;
	status: CompetitionStatus;
	date: Date;
	id: string;
}

export interface IRegistration {
	id: string;
	createdAt: Date;
	email: string;
	competitionId: string;
	competitor: ICompetitor;
	phoneNumber: string;
	minors: ICompetitor[];
}

export interface ICompetitor {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: Date;
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
	isMinor: boolean;
	competitionId: string;
	registrationId: string;
}

export interface IGetCompetitionAndRegistrationDataBySlugModel {
	competition: ICompetition;
	registration: IRegistration;
}

export interface ISendProblemData {
	competitionId: string;
	problemId: string;
	competitorId: string;
}

export interface IUnsendProblemData {
	competitionId: string;
	sentProblemId: string;
}

export interface IDeleteRegistrationData {
	competitionId: string;
	registrationId: string;
}