import { FilesEndpoints } from "../api/endpoints"

export default class FilesService {
	public static getFileUrl = (id: string): string => {
		return FilesEndpoints.get(id);
	}
}