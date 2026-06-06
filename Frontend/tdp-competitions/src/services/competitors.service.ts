import editorsApi from "../api/axios";
import { CompetitorsEndpoints } from "../api/endpoints";
import type { IAddCompetitorRegistrationRequest, IGetCompetitionResponse, IResponse } from "../models/api.models";
import type { ICompetition } from "../models/competitions.models";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<any> => {
		const response = await editorsApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
		return response.data as IResponse<ICompetition>;
	}

	public static getBySlug = async (slug: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await editorsApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionResponse>;
	}
}