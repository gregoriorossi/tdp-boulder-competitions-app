import publicApi from "../api/axiosPublic";
import competitorsApi from "../api/competitorsAxios";
import { CompetitorsEndpoints } from "../api/endpoints";
import type { IResponse } from "../models/api.models";
import type { Gender } from "../models/competitions.models";
import type { IAddCompetitorRegistrationRequest, IGetAllCompetitionsResponse, IGetCompetitionBySlugResponse, IGetRankingResponse } from "../models/competitors.api.models";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<void> => {
		await publicApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
	}

	public static getCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}

	public static getBySlug = async (slug: string): Promise<IResponse<IGetCompetitionBySlugResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionBySlugResponse>;
	}

	public static getRankingByCompetitionId = async (id: string, gender: Gender | null): Promise<IResponse<IRanking[]>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getRankings(id, gender));
		return data.data as IResponse<IGetRankingResponse[]>;
	}
}