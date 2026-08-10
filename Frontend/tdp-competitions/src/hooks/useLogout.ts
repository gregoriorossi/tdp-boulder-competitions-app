import { AuthConsts } from '../consts/auth.consts';
import { Routes } from '../consts/routes.consts';

/**
 * Utility hook per gestire il logout dell'utente.
 * Rimuove il token JWT e le info di login, poi reindirizza al login.
 */
export function useLogout() {
	const logout = () => {
		// Rimuovi token JWT
		sessionStorage.removeItem(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);

		// Rimuovi anche le info di login dal localStorage
		localStorage.removeItem(AuthConsts.LOCAL_STORAGE_EDITOR_LOGIN_INFO);

		// Reindirizza al login
		window.location.href = Routes.EditorsLogin;
	};

	return { logout };
}
