import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/queryClient";
import CompetitionsService from "../services/competitions.service";
import type { IGetAllCompetitionsResponse, IResponse } from "../models/api.models";

export const useCompetitions = (): UseQueryResult<IResponse<IGetAllCompetitionsResponse[]>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.all],
		queryFn: () => CompetitionsService.getAllCompetitions()
	});
}