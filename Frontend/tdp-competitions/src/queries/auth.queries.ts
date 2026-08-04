import { useMutation } from "@tanstack/react-query";
import type { ILoginEditorRequest } from "../models/auth.api.models";
import AuthService from "../services/auth.service";
import { queryClient } from "../api/queryClient";
import { AuthConsts } from "../consts/auth.consts";

export const useEditorLogin = () => {
	return useMutation({
		mutationFn: (request: ILoginEditorRequest) => AuthService.loginEditor(request),
		onSuccess: (data) => {
			queryClient.invalidateQueries();
			if (!data?.isSuccess || !data.value?.token) {
				return;
			}

			localStorage.setItem(AuthConsts.LOCAL_STORAGE_LOGIN_INFO, JSON.stringify(data.value));
		}
	})
}