import editorsApi from "../api/axios";
import { CompetitorsEndpoints } from "../api/endpoints";
import type { IGetCompetitionResponse, IResponse } from "../models/api.models";

export default class CompetitorsService {


	public static getBySlug = async (slug: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await editorsApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionResponse>;
	}
}