import { AuthEndpoints } from "../api/endpoints";
import type { ILoginCompetitorRequest, ILoginCompetitorResponse, ILoginEditorRequest, ILoginEditorResponse } from "../models/auth.api.models";
import axiosPublicClient from "../api/axiosPublic";
import type { IResponse } from "../models/api.models";

export default class AuthService {

	public static loginEditor = async (loginEditorData: ILoginEditorRequest): Promise<IResponse<ILoginEditorResponse>> => {

		try {
			const data = await axiosPublicClient.post(AuthEndpoints.editorLogin, loginEditorData);
			const response = data.data as IResponse<ILoginEditorResponse>;

			return response;
		} catch (error) {
			console.error('Error logging in:', error);

			return {
				isSuccess: false,
				isFailure: true,
				value: null,
				error: {
					code: '',
					description: `Error: ${error}`,
				}
			}
		}
	}

	public static loginCompetitor = async (loginCompetitorData: ILoginCompetitorRequest): Promise<IResponse<ILoginCompetitorResponse>> => {

		try {
			const data = await axiosPublicClient.post(AuthEndpoints.competitorLogin, loginCompetitorData);
			const response = data.data as IResponse<ILoginCompetitorResponse>;

			return response;
		} catch (error) {
			console.error('Error logging in:', error);

			return {
				isSuccess: false,
				isFailure: true,
				value: null,
				error: {
					code: '',
					description: `Error: ${error}`,
				}
			}
		}
	}
}