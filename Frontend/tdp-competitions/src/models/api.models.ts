export interface IResponse<T> {
	value: T;
	isSuccess: boolean;
	isFailure: boolean;
	error?: {
		code: string;
		description: string;
	}
}

export interface IGetAllCompetitionsResponse {
	id: string;
	title: string;
	registrationsOpen: boolean;
	date: string;
	status: number;
}

export interface IAddCompetitionRequest {
	title: string;
	date: Date;
}

export interface IAddProblemRequest {
	name: string;
	competitionId: string;
	problemsGroupId: string;
}

export interface IAddSpecialProblemRequest {
	name: string;
	competitionId: string;
}

export interface IUpdateSpecialProblemRequest {
	name: string;
	competitionId: string;
}

export interface IUpdateProblemRequest {
	name: string;
	competitionId: string;
}

export interface IUpdateProblemsGroupsRequest {
	competitionId: string;
	groups: IUpdateProblemGroup[];
}

interface IUpdateProblemGroup {
	id?: string;
	colorCode: string;
	competitionId: string;
	order: number;
}

export interface IRegistrationResponse {
	id: string;
	createdAt: string;
	email: string;
	competitionId: string;
	competitor: ICompetitorResponse;
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

export interface IAddRegistrationRequest {
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