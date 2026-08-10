import { useMutation } from "@tanstack/react-query";
import type { ILoginCompetitorRequest, ILoginEditorRequest } from "../models/auth.api.models";
import AuthService from "../services/auth.service";
import { queryClient } from "../api/queryClient";
import { AuthConsts } from "../consts/auth.consts";
import StorageService from "../services/storage.service";

export const useEditorLogin = () => {
	return useMutation({
		mutationFn: (request: ILoginEditorRequest) => AuthService.loginEditor(request),
		onSuccess: (data) => {
			queryClient.invalidateQueries();

			if (!data?.isSuccess || !data.value?.token) {
				return;
			}

			StorageService.setItem(AuthConsts.LOCAL_STORAGE_LOGIN_INFO, JSON.stringify(data.value));	
		}
	})
}

export const useCompetitorLogin = () => {
	return useMutation({
		mutationFn: (request: ILoginCompetitorRequest) => AuthService.loginEditor(request),
		onSuccess: (data) => {
			queryClient.invalidateQueries();

			if (!data?.isSuccess || !data.value?.token) {
				return;
			}

			StorageService.setItem(AuthConsts.LOCAL_STORAGE_LOGIN_INFO, JSON.stringify(data.value));
		}
	})
}