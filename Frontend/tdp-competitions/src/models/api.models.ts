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