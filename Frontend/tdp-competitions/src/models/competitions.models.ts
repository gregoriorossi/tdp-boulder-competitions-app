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
	rankingsVisible: boolean;
	date: Date;
	emailSubject: string;
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

export interface ISendProblemData {
	competitionId: string;
	problemId: string;
	competitorId: string;
}

export interface ISendSpecialProblemData {
	competitionId: string;
	specialProblemId: string;
	competitorId: string;
	sentAt: Date;
}

export interface IUnsendProblemData {
	competitionId: string;
	sentProblemId: string;
	problemId: string;
}

export interface IUnsendSpecialProblemData {
	competitionId: string;
	sentSpecialProblemId: string;
	specialProblemId: string;
}
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
	guardianOnly: boolean;
}

export interface ICompetitionInfoForm {
	title: string;
	description?: string | undefined;
	registrationsOpen?: boolean | undefined;
	rankingsVisible?: boolean | undefined;
	date: Date;
	emailSubject: string;
	emailText: string;
	privacyAttachmentText?: string | undefined;
	privacyAttachmentId?: string | null;
	privacyAttachment?: File | null | undefined;
	bannerImage?: File | null | undefined;
	bannerImageId?: string | null;
}


export interface IGetResultsResponse {
	competitors: IGetResultsCompetitor[];
	problemsGroups: IGetResultsProblemsGroup[];
	specialProblems: IGetResultsSpecialProblem[];
}

export interface IGetResultsCompetitor {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	sentProblems: IGetResultsSentProblem[];
	sentSpecialProblems: IGetResultsSentSpecialProblem[];
}

export interface IGetResultsSentProblem {
	id: string;
	problemId: string;
}

export interface IGetResultsSentSpecialProblem {
	competitionId: string;
	competitorId: string;
	specialProblemId: string;
	sentAt: string;
	id: string;
}

export interface IGetResultsProblemsGroup {
	id: string;
	order: number;
	colorCode: string;
	competitionId: string;
	problems: IGetResultsProblem[];
}

export interface IGetResultsProblem {
	id: string;
	name: string;
	problemGroupId: string;
	competitionId: string;
}

export interface IGetResultsSpecialProblem {
	id: string;
	name: string;
	sentBy: IGetResultsSentBy[];
}

export interface IGetResultsSentBy {
	id: string;
	firstName: string;
	lastName: string;
	sentAt: string;
}

export interface onChangeSentProblem {
	problemId: string;
}

export interface IRanking {
	position: number;
	score: number;
	competitorId: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	isMinor: boolean;
}