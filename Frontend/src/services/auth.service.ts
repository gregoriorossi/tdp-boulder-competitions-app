import { AuthEndpoints } from "../api/endpoints";
import type { ILoginCompetitorRequest, ILoginCompetitorResponse, ILoginEditorRequest, ILoginEditorResponse } from "../models/auth.api.models";
import axiosPublicClient from "../api/axiosPublic";
import type { IResponse } from "../models/api.models";
import { AxiosError } from "axios";
import { Errors } from "../consts/errors.consts";

export default class AuthService {

	public static loginEditor = async (loginEditorData: ILoginEditorRequest): Promise<IResponse<ILoginEditorResponse>> => {

		try {
			const data = await axiosPublicClient.post(AuthEndpoints.editorLogin, loginEditorData);
			const response = data.data as IResponse<ILoginEditorResponse>;

			return response;
		} catch (error) {
			let statusCode = '';
			let errorMessage = `Error: ${error}`;

			if (error instanceof AxiosError) {
				statusCode = error.response?.status?.toString() || '';
				errorMessage = error.response?.data?.error?.description || error.message || errorMessage;
			}

			return {
				isSuccess: false,
				isFailure: true,
				value: null,
				error: {
					code: statusCode === '401' ? Errors.Auth.EditorInvalidCredentials : Errors.Generic,
					description: errorMessage,
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
			let statusCode = '';
			let errorMessage = `Error: ${error}`;

			if (error instanceof AxiosError) {
				statusCode = error.response?.status?.toString() || '';
				errorMessage = error.response?.data?.error?.description || error.message || errorMessage;
			}

			return {
				isSuccess: false,
				isFailure: true,
				value: null,
				error: {
					code: statusCode === '401' ? Errors.Auth.CompetitorInvalidCredentials : Errors.Generic,
					description: errorMessage,
				}
			}
		}
	}
}