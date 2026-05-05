export interface IResponse<T> {
	value: T | null;
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

export interface IGetCompetitionResponse {
	title: string;
	description: string;
	slug: string;
	bannerImageId: string | null;
	registrationsOpen: boolean;
	date: Date;
	emailText: string;
	privacyText: string;
	privacyAttachmentId: string | null;
	status: number;
	id: string;
}

export interface IAddCompetitionRequest {
	title: string;
	date: Date;
}

export interface IUpdateCompetitionStatusRequest {
	competitionId: string;
	status: number;
}

export interface IUpdateCompetitionRequest {
	id: string;
	title: string;
	description: string | undefined;
	bannerImageId: string | null | undefined;
	bannerImage: File | null | undefined;
	registrationsOpen: boolean;
	date: Date;
	emailText: string;
	privacyText: string | undefined;
	privacyAttachmentId: string | null | undefined;
	privacyAttachment: File | null | undefined;
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