import { AuthEndpoints } from "../api/endpoints";
import type { ILoginEditorRequest, ILoginResponse } from "../models/auth.api.models";
import axiosPublicClient from "../api/axiosPublic";
import type { IResponse } from "../models/api.models";

export default class AuthService {

	public static loginEditor = async (loginEditorData: ILoginEditorRequest): Promise<IResponse<ILoginResponse>> => {

		try {
			const data = await axiosPublicClient.post(AuthEndpoints.editorLogin, loginEditorData);
			const response = data.data as IResponse<ILoginResponse>;

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