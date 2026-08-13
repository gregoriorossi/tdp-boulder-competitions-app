import publicApi from "../api/axiosPublic";
import competitorsApi from "../api/competitorsAxios";
import { CompetitorsEndpoints } from "../api/endpoints";
import { AuthConsts } from "../consts/auth.consts";
import type { IResponse } from "../models/api.models";
import type { ILoginCompetitorResponse } from "../models/auth.api.models";
import type { Gender } from "../models/competitions.models";
import type { IAddCompetitorRegistrationRequest, ICompetitionProblemsResponse, IGetAllCompetitionsResponse, IGetCompetitionAndRegistrationDataBySlug, IGetCompetitionResponse, IGetRankingResponse, IGetSentProblemsResponse, ISendProblemRequest, ISendProblemResponse } from "../models/competitors.api.models";
import type { ISendProblemData, IUnsendProblemData } from "../models/competitors.models";
import StorageService from "./storage.service";

export default class CompetitorsService {

	public static addCompetitorRegistration = async (data: IAddCompetitorRegistrationRequest, competitionId: string): Promise<IResponse<void>> => {
		const response = await publicApi.post(CompetitorsEndpoints.addRegistration(competitionId), data);
		return response.data as IResponse<void>;
	}

	public static deleteRegistration = async (competitionId: string, registrationId: string): Promise<IResponse<void>> => {
		const response = await competitorsApi.delete(CompetitorsEndpoints.deleteRegistration(competitionId, registrationId));
		return response.data as IResponse<void>;
	}

	public static getCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await publicApi.get(CompetitorsEndpoints.getCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}

	public static getCompetitionBySlug = async (slug: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getCompetitionBySlug(slug));
		return data.data as IResponse<IGetCompetitionResponse>;
	}

	public static getCompetitionAndRegistrationDataBySlug = async (slug: string): Promise<IResponse<IGetCompetitionAndRegistrationDataBySlug>> => {
		const data = await competitorsApi.get(CompetitorsEndpoints.getCompetitionAndRegistrationDataBySlug(slug));
		return data.data as IResponse<IGetCompetitionAndRegistrationDataBySlug>;
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

	public static sendProblem = async (data: ISendProblemData): Promise<IResponse<ISendProblemResponse>> => {
		const body: ISendProblemRequest = {
			competitorId: data.competitorId
		};
		const response = await competitorsApi.post(CompetitorsEndpoints.sendProblem(data.competitionId, data.problemId), body);
		return response.data as IResponse<ISendProblemResponse>;
	}

	public static unsendProblem = async (data: IUnsendProblemData): Promise<void> => {
		await competitorsApi.delete(CompetitorsEndpoints.unsendProblem(data.competitionId, data.sentProblemId));
	}

	public static getLoginInfo = (): ILoginCompetitorResponse | null => {
		const jwt = StorageService.getItemAsJson<ILoginCompetitorResponse>(AuthConsts.LOCAL_STORAGE_COMPETITOR_LOGIN_INFO);
		return jwt;
	}
}