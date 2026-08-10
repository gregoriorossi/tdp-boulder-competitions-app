import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import CompetitorsService from "../services/competitors.service";
import type { IAddCompetitorRegistrationRequest, IGetAllCompetitionsResponse, IGetRankingResponse } from "../models/competitors.api.models";
import { queryKeys } from "../api/queryClient";
import type { IResponse } from "../models/api.models";
import type { Gender } from "../models/competitions.models";

export const useAddCompetitorRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IAddCompetitorRegistrationRequest) => CompetitorsService.addCompetitorRegistration(data, competitionId),
		onSuccess: () => {}
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