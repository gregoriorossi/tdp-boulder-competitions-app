export interface ICompetition {
	id: string;
	title: string;
	registrationsOpen: boolean;
	date: Date;
	status: CompetitionStatus;
	isOpen: boolean;
}

export interface ICompetitionInfo {
	id: string;
	title: string;
	description: string;
	slug: string;
	bannerImageId: string | null;
	registrationsOpen: boolean;
	date: Date;
	emailText: string;
	privacyText: string;
	privacyAttachmentId: string | null;
	status: CompetitionStatus;
	isOpen: boolean;
}

export enum CompetitionStatus {
	DRAFT = 0,
	OPEN = 1,
	CLOSED = 2
}

export enum Gender {
	MALE = 0, 
	FEMALE = 1
}

export const GENDERS: number[] = [Gender.MALE, Gender.FEMALE];

export interface ICompetitionProblems {
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

export interface IRegistration {
	id: string;
	createdAt: Date;
	email: string;
	competitionId: string;
	competitor: ICompetitor;
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
	phoneNumber: string;
	isMinor: boolean;
	competitionId: string;
	registrationId: string;
}

export interface ICompetitionInfoForm {
	title: string;
	description?: string | undefined;
	registrationsOpen?: boolean | undefined;
	date: Date;
	emailText: string;
	privacyAttachmentText?: string | undefined;
	privacyAttacymentId?: string | null;
	privacyAttachment?: File | null | undefined;
	bannerImage?: File | null | undefined;
	bannerImageId?: string | null;
}