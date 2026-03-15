import { type UseQueryResult, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import CompetitionsService from "../services/competitions.service";
import type { IResponse } from "../models/api.models";
import type { ICompetition } from "../models/competitions.models";
import CompetitionsMappers from "../mappers/competitions.mappers";

interface IUseAddCompetitionMutation {
	title: string,
	date: Date
}

export const useCompetitions = (): UseQueryResult<IResponse<ICompetition[]>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.all],
		queryFn: async (): Promise<IResponse<ICompetition[]>> => {
			const result = await CompetitionsService.getAllCompetitions();

			return {
				...result,
				value: (result?.value ?? []).map(c => CompetitionsMappers.ToICompetition(c))
			};
		}
	});
}

export const useAddCompetition = () => {
	return useMutation({
		mutationFn: (data: IUseAddCompetitionMutation) => CompetitionsService.add(data.title, data.date),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all })
		}
	});
}

export const useDeleteCompetition = () => {
	return useMutation({
		mutationFn: (id: string) => CompetitionsService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all })
		}
	});
}

