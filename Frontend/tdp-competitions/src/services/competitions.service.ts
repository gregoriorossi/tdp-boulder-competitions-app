import editorsApi from "../api/axios";
import { EditorsEndpoints } from "../api/endpoints";
import type { IGetAllCompetitionsResponse, IResponse } from "../models/api.models";

export default class CompetitionsService {
	public static getAllCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await editorsApi.get(EditorsEndpoints.getAllCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}
}