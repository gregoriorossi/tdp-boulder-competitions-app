export interface ILoginEditorRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
	expirationDate: string;
	userInfo: {
		id: string;
		username: string;
		roles: string[];
	}
}