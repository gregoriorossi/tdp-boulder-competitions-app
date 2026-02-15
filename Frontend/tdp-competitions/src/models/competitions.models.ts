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