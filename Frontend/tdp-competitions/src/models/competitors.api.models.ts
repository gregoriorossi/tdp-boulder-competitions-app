export interface IAddCompetitorRegistrationRequest {
	firstName: string;
	lastName: string;
	birthDate: Date,
	email: string;
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
	phoneNumber: string;
	minors: IAddRegistrationMinorRequest[]
}

export interface IAddRegistrationMinorRequest {
	firstName: string;
	lastName: string;
	birthDate: Date,
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
}

export interface IGetAllCompetitionsResponse {
	title: string;
	slug: string;
	id: string;
}

export interface IGetCompetitionBySlugResponse {
	title: string;
	description: string;
	slug: string;
	bannerImageId: string | null;
	registrationsOpen: boolean;
	date: Date;
	id: string;
}

export interface IGetRankingResponse {
	position: number;
	score: number;
	competitorId: string;
	firstName: string;
	lastName: string;
	gender: number;
	isMinor: boolean;
}