import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import CompetitorsService from "../services/competitors.service";
import type { IAddCompetitorRegistrationRequest, IGetAllCompetitionsResponse } from "../models/competitors.api.models";
import { queryKeys } from "../api/queryClient";
import type { IResponse } from "../models/api.models";

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