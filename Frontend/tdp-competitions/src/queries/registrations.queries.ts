import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import CompetitionsService from "../services/competitions.service";
import { queryClient, queryKeys } from "../api/queryClient";
import type { IResponse } from "../models/api.models";
import type { IRegistration } from "../models/competitions.models";
import CompetitionsMappers from "../mappers/competitions.mappers";

export const useRegistrationsByCompetitionsId = (id: string): UseQueryResult<IResponse<IRegistration[]>> => {
	return useQuery({
		queryKey: [...queryKeys.registrations.byCompetitionId(id)],
		queryFn: async (): Promise<IResponse<IRegistration[]>> => {
			const result = await CompetitionsService.getRegistrationsByCompetitionId(id);

			return {
				...result,
				value: (result?.value ?? []).map(c => CompetitionsMappers.ToIRegistration(c))
			};
		}
	});
}

export const useDeleteCompetitor = (competitionId: string) => {
	return useMutation({
		mutationFn: (registrationId: string) => CompetitionsService.deleteCompetitor(registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (registrationId: string) => CompetitionsService.deleteRegistration(registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}