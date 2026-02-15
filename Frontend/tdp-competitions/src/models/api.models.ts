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