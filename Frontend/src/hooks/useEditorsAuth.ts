import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthConsts } from '../consts/auth.consts';
import StorageService from '../services/storage.service';
import type { ILoginEditorResponse } from '../models/auth.api.models';
import { Routes } from '../consts/routes.consts';


export interface IUseAuthOptions {
	redirectRoute: string;
}

function checkAuth(): boolean {
	const jwt = StorageService.getItemAsJson<ILoginEditorResponse>(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);
	const isEditor = jwt?.userInfo?.roles.some(r => r === AuthConsts.Roles.EDITOR);

	if (!jwt || !isEditor) {
		return false;
	}

	const date = new Date(jwt.expirationDate);
	const isValid = date.getTime() >= Date.now();

	if (!isValid) {
		StorageService.removeItem(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);
		return false;
	}

	return true;
}

export function useEditorsAuth(options: IUseAuthOptions) {

	const navigate = useNavigate();
	const hasChecked = useRef(false);
	const isAuthenticated = checkAuth();

	useEffect(() => {
		if (!hasChecked.current && !isAuthenticated) {
			hasChecked.current = true;
			navigate(options.redirectRoute);
		}
	}, [isAuthenticated, navigate, options.redirectRoute]);

	return {
		isAuthenticated
	};
}

export function useEditorLogout() {
	const navigate = useNavigate();

	const logout = () => {
		StorageService.removeItem(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);
		navigate(Routes.EditorsLogin);
	};

	return { logout };
}