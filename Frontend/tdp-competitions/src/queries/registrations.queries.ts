import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import EditorsService from "../services/editors.service";
import { queryClient, queryKeys } from "../api/queryClient";
import type { IRegistrationRequest, IResponse } from "../models/api.models";
import type { IRegistration } from "../models/competitions.models";
import CompetitionsMappers from "../mappers/competitions.mappers";

export const useRegistrationsByCompetitionsId = (id: string): UseQueryResult<IResponse<IRegistration[]>> => {
	return useQuery({
		queryKey: [...queryKeys.registrations.byCompetitionId(id)],
		queryFn: async (): Promise<IResponse<IRegistration[]>> => {
			const result = await EditorsService.getRegistrationsByCompetitionId(id);

			return {
				...result,
				value: (result?.value ?? []).map(c => CompetitionsMappers.ToIRegistration(c))
			};
		}
	});
}

export const useAddRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IRegistrationRequest) => EditorsService.addRegistration(data, competitionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IRegistrationRequest) => EditorsService.updateRegistration(data, competitionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteMinor = (competitionId: string, registrationId: string) => {
	return useMutation({
		mutationFn: (minorId: string) => EditorsService.deleteMinor(competitionId, registrationId, minorId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (registrationId: string) => EditorsService.deleteRegistration(competitionId, registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}