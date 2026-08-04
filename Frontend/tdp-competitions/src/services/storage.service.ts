export default class StorageService {

	public static getItem = (key: string) => sessionStorage.getItem(key);

	public static getItemAsJson = <T>(key: string): T | null => {	
		try {
			return this.getItem(key) ? JSON.parse(this.getItem(key) as string) as T : null;
		} catch (error) {
			console.error(`Error parsing JSON from sessionStorage for key "${key}":`, error);
            return null;
		}
	}

	public static setItem = (key: string, value: string) => sessionStorage.setItem(key, value);

	public static removeItem = (key: string) => sessionStorage.removeItem(key);
}