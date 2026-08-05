import publicApi from "../api/axiosPublic";
import { CompetitorsEndpoints } from "../api/endpoints";
import type { IGetCompetitionResponse, IResponse } from "../models/api.models";
import type { ICompetition } from "../models/competitions.models";
import type { IAddCompetitorRegistrationRequest } from "../models/competitors.api.models";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<any> => {
		const response = await publicApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
		return response.data as IResponse<ICompetition>;
	}

	public static getBySlug = async (slug: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionResponse>;
	}
}