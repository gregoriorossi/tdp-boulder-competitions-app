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

export interface IGetCompetitionResponse {
	title: string;
	description: string;
	slug: string;
	bannerImageId: string | null;
	registrationsOpen: boolean;
	status: number;
	date: string;
	id: string;
}

export interface IGetCompetitionAndRegistrationDataBySlug {
	competition: IGetCompetitionResponse;
	registration: IRegistrationResponse;
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

export interface ICompetitionProblemsResponse {
	problemsGroups: IProblemsGroup[];
	specialProblems: ISpecialProblem[];
}


export interface IProblemsGroup {
	id?: string
	order: number
	colorCode: string
	competitionId: string
	problems: IProblem[]
}

export interface IProblem {
	id?: string
	name: string
	problemGroupId: string
	competitionId: string
}

export interface ISpecialProblem {
	id?: string
	name: string
	competitionId: string
}

export interface ISendProblemData {
	competitionId: string;
	problemId: string;
	competitorId: string;
}

export interface IRegistrationResponse {
	id: string;
	createdAt: string;
	email: string;
	competitionId: string;
	competitor: ICompetitorResponse;
	phoneNumber: string;
	minors: ICompetitorResponse[];
}

export interface ICompetitorResponse {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
	phoneNumber: string;
	isMinor: boolean;
	competitionId: string;
	registrationId: string;
}

export interface IGetSentProblemsResponse {
	sentProblems: ISentProblemResponse[];
	sentSpecialProblems: ISentSpecialProblemResponse[];
}

export interface ISentProblemResponse {
	competitionId: string;
	problemId: string;
	competitorId: string;
	sentAt: string;
}

export interface ISentSpecialProblemResponse {
	competitionId: string;
	specialProblemId: string;
	competitorId: string;
	sentAt: string;
}