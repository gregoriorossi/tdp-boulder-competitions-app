import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import CompetitorsService from "../services/competitors.service";
import type { IAddCompetitorRegistrationRequest, ICompetitionProblemsResponse, IGetAllCompetitionsResponse, IGetRankingResponse, IGetSentProblemsResponse } from "../models/competitors.api.models";
import { queryClient, queryKeys } from "../api/queryClient";
import type { IResponse } from "../models/api.models";
import type { Gender } from "../models/competitions.models";
import CompetitorsMappers from "../mappers/competitors.mappers";
import type { ICompetition, IDeleteRegistrationData, IGetCompetitionAndRegistrationDataBySlugModel, ISendProblemData, ISendSpecialProblemData, IUnsendProblemData, IUnsendSpecialProblemData } from "../models/competitors.models";

export const useAddCompetitorRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IAddCompetitorRegistrationRequest) => CompetitorsService.addCompetitorRegistration(data, competitionId),
		onSuccess: () => {}
	});
}

export const useDeleteRegistration = () => {
	return useMutation({
		mutationFn: (data: IDeleteRegistrationData) => CompetitorsService.deleteRegistration(data.competitionId, data.registrationId),
		onSuccess: () => { }
	});
}

export const useCompetitions = (): UseQueryResult<IResponse<IGetAllCompetitionsResponse[]>> => {
	return useQuery({
		queryKey: [...queryKeys.competitors.competitions.all],
		queryFn: async () => {
			const result = await CompetitorsService.getCompetitions();
			return result;
		}
	});
}

export const useRankingByCompetitionById = (id: string, gender: Gender | null): UseQueryResult<IResponse<IGetRankingResponse[]>> => {
	return useQuery({
		queryKey: [...queryKeys.competitors.rankings.byCompetitionId(id, gender)],
		queryFn: async () => {
			const result = await CompetitorsService.getRankingByCompetitionId(id, gender);
			return result;
		}
	});
}

export const useProblemsByCompetition = (id: string): UseQueryResult<IResponse<ICompetitionProblemsResponse>> => {
	return useQuery({
		queryKey: [...queryKeys.competitors.problems.byCompetitionId(id)],
		queryFn: async () => {
			const result = await CompetitorsService.getProblemsByCompetitionId(id);
			return result;
		}
	});
}

export const useSentProblems = (competitionId: string, competitorId: string, options?: { enabled?: boolean }): UseQueryResult<IResponse<IGetSentProblemsResponse>> => {
	return useQuery({
		queryKey: [...queryKeys.competitors.problems.sent(competitionId, competitorId)],
		queryFn: async () => {
			const result = await CompetitorsService.getSentProblems(competitionId, competitorId);
			return result;
		},
		enabled: options?.enabled
	});
}

export const useCompetitionBySlug = (slug: string): UseQueryResult<IResponse<ICompetition>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.bySlug(slug)],
		queryFn: async () => {
			const result = await CompetitorsService.getCompetitionBySlug(slug);
			return {
				...result,
				value: result.value ? CompetitorsMappers.ToICompetition(result.value!) : null
			}
		}
	});
}

export const useGetCompetitionAndRegistrationDataBySlug = (slug: string): UseQueryResult<IResponse<IGetCompetitionAndRegistrationDataBySlugModel>> => {
	return useQuery({
		queryKey: [...queryKeys.competitors.competitions.bySlug(slug)],
		queryFn: async () => {
			const result = await CompetitorsService.getCompetitionAndRegistrationDataBySlug(slug);
			const registration = CompetitorsMappers.ToIRegistration(result.value!.registration!);
			const competition = CompetitorsMappers.ToICompetition(result.value!.competition!);
			return {
				...result,
				value: {
					competition,
					registration
				}

			};
		}
	});
}

export const useSendProblem = (competitionId: string, competitorId: string) => {
	return useMutation({
		mutationFn: async (sendProblemRequest: ISendProblemData) => CompetitorsService.sendProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitors.problems.sent(competitionId, competitorId) });
		}
	});
}

export const useUnsendProblem = (competitionId: string, competitorId: string) => {
	return useMutation({
		mutationFn: async (sendProblemRequest: IUnsendProblemData) => CompetitorsService.unsendProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitors.problems.sent(competitionId, competitorId) });
		}
	});
}

export const useSendSpecialProblem = (competitionId: string, competitorId: string) => {
	return useMutation({
		mutationFn: async (sendProblemRequest: ISendSpecialProblemData) => CompetitorsService.sendSpecialProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitors.problems.sent(competitionId, competitorId) });
		}
	});
}

export const useUnsendSpecialProblem = (competitionId: string, competitorId: string) => {
	return useMutation({
		mutationFn: async (sendProblemRequest: IUnsendSpecialProblemData) => CompetitorsService.unsendSpecialProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitors.problems.sent(competitionId, competitorId) });
		}
	});
}