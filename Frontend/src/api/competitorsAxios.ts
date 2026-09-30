import axios from "axios";
import { AuthConsts } from "../consts/auth.consts";
import StorageService from "../services/storage.service";
import type { ILoginCompetitorResponse } from "../models/auth.api.models";
import { Routes } from "../consts/routes.consts";

const competitorsAxios = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

competitorsAxios.interceptors.request.use(
	(config) => {
		const jwt = StorageService.getItemAsJson<ILoginCompetitorResponse>(AuthConsts.LOCAL_STORAGE_COMPETITOR_LOGIN_INFO);

		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt.token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

competitorsAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token scaduto o invalido - rimuovi e reindirizza al login
			StorageService.removeItem(AuthConsts.LOCAL_STORAGE_COMPETITOR_LOGIN_INFO);
			window.location.href = Routes.CompetitorLogin;
		}
		return Promise.reject(error);
	}
);

export default competitorsAxios;