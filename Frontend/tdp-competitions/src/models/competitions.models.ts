export interface ICompetition {
	id: string;
	title: string;
	registrationsOpen: boolean;
	date: Date;
	status: CompetitionStatus;
	isOpen: boolean;
}

export enum CompetitionStatus {
	DRAFT = 0,
	OPEN = 1,
	CLOSED = 2
}

export interface ICompetitionProblems {
	problemsGroups: IProblemsGroup[];
	specialProblems: ISpecialProblem[];
}

export interface IProblemsGroup {
	id: string
	order: number
	colorCode: string
	competitionId: string
	problems: IProblem[]
}

export interface IProblem {
	id: string
	name: string
	problemGroupId: string
	competitionId: string
}

export interface ISpecialProblem {
	id: string
	name: string
	competitionId: string
}