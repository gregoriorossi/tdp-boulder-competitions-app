import publicApi from "../api/axiosPublic";
import { CompetitorsEndpoints } from "../api/endpoints";
import type { IGetCompetitionResponse, IResponse } from "../models/api.models";
import type { IAddCompetitorRegistrationRequest, IGetAllCompetitionsResponse } from "../models/competitors.api.models";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<void> => {
		await publicApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
	}

	public static getBySlug = async (slug: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionResponse>;
	}

	public static getCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}
}