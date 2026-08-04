import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthConsts } from '../consts/auth.consts';
import StorageService from '../services/storage.service';
import type { ILoginResponse } from '../models/auth.api.models';


export interface IUseAuthOptions {
	redirectRoute: string;
}

function checkAuth(): boolean {
	const jwt = StorageService.getItemAsJson<ILoginResponse>(AuthConsts.LOCAL_STORAGE_LOGIN_INFO);
	const isEditor = jwt?.userInfo?.roles.some(r => r === AuthConsts.Roles.EDITOR);

	if (!jwt || !isEditor) {
		return false;
	}

	const date = new Date(jwt.expirationDate);
	const isValid = date.getTime() >= Date.now();

	if (!isValid) {
		StorageService.removeItem(AuthConsts.LOCAL_STORAGE_LOGIN_INFO);
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
