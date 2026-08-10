import axios from "axios";
import { AuthConsts } from "../consts/auth.consts";
import StorageService from "../services/storage.service";
import type { ILoginEditorResponse } from "../models/auth.api.models";

const editorsApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

editorsApi.interceptors.request.use(
	(config) => {
		const jwt = StorageService.getItemAsJson<ILoginEditorResponse>(AuthConsts.LOCAL_STORAGE_LOGIN_INFO);

		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt.token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

editorsApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token scaduto o invalido - rimuovi e reindirizza al login
			StorageService.removeItem(AuthConsts.LOCAL_STORAGE_LOGIN_INFO);
			window.location.href = '/editors/login';
		}
		return Promise.reject(error);
	}
);

export default editorsApi;