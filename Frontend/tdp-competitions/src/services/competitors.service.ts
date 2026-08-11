import publicApi from "../api/axiosPublic";
import competitorsApi from "../api/competitorsAxios";
import { CompetitorsEndpoints } from "../api/endpoints";
import { AuthConsts } from "../consts/auth.consts";
import type { IResponse } from "../models/api.models";
import type { ILoginCompetitorResponse } from "../models/auth.api.models";
import type { Gender } from "../models/competitions.models";
import type { IAddCompetitorRegistrationRequest, ICompetitionProblemsResponse, IGetAllCompetitionsResponse, IGetCompetitionBySlugResponse, IGetRankingResponse, IGetSentProblemsResponse, IRegistration, IRegistrationResponse, ISendProblemData } from "../models/competitors.api.models";
import StorageService from "./storage.service";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<void> => {
		await publicApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
	}

	public static getCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}

	public static getCompetitionBySlug = async (slug: string): Promise<IResponse<IGetCompetitionBySlugResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionBySlugResponse>;
	}

	public static getCompetitionAndRegistrationDataBySlug = async (slug: string): Promise<IResponse<IGetCompetitionBySlugResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getCompetitionAndRegistrationDataBySlug(slug));
		return data.data as IResponse<IGetCompetitionBySlugResponse>;
	}

	public static getRankingByCompetitionId = async (id: string, gender: Gender | null): Promise<IResponse<IGetRankingResponse[]>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getRankings(id, gender));
		return data.data as IResponse<IGetRankingResponse[]>;
	}

	public static getProblemsByCompetitionId = async (id: string): Promise<IResponse<ICompetitionProblemsResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getProblems(id));
		return data.data as IResponse<ICompetitionProblemsResponse>;
	}

	public static getSentProblems = async (competitionId: string, competitorId: string): Promise<IResponse<IGetSentProblemsResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getSentProblems(competitionId, competitorId));
		return data.data as IResponse<IGetSentProblemsResponse>;
	}

	public static sendProblem = async (data: ISendProblemData): Promise<void> => {
		await competitorsApi.post(CompetitorsEndpoints.sendProblem(data.competitionId, data.problemId));
	}

	public static getLoginInfo = (): ILoginCompetitorResponse | null => {
		const jwt = StorageService.getItemAsJson<ILoginCompetitorResponse>(AuthConsts.LOCAL_STORAGE_COMPETITOR_LOGIN_INFO);
		return jwt;
	}
}