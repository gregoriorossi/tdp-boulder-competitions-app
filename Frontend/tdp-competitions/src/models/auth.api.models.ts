export interface ILoginEditorRequest {
	username: string;
	password: string;
}

export interface ILoginCompetitorRequest {
	email: string;
	competitionId: string;
}

export interface ILoginEditorResponse {
	token: string;
	expirationDate: string;
	userInfo: {
		id: string;
		username: string;
		roles: string[];
	}
}

export interface ILoginCompetitorResponse {
	token: string;
	expirationDate: string;
	userInfo: {
		competitionId: string;
		email: string;
		roles: string[];
	}
}