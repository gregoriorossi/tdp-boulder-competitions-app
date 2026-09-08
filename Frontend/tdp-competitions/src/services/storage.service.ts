export default class StorageService {

	public static getItem = (key: string) => localStorage.getItem(key);

	public static getItemAsJson = <T>(key: string): T | null => {	
		try {
			return this.getItem(key) ? JSON.parse(this.getItem(key) as string) as T : null;
		} catch (error) {
			console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
            return null;
		}
	}

	public static setItem = (key: string, value: string) => localStorage.setItem(key, value);

	public static removeItem = (key: string) => localStorage.removeItem(key);
}