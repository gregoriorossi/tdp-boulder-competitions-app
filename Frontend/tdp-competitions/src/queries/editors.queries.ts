import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import type { IMinorRequest } from "../models/api.models";
import EditorsService from "../services/editors.service";

export const useAddMinor = (competitionId: string, registrationId: string) => {
	return useMutation({
		mutationFn: (data: IMinorRequest) => EditorsService.addMinor(data, competitionId, registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateMinor = (competitionId: string, registrationId: string) => {
	return useMutation({
		mutationFn: (data: IMinorRequest) => EditorsService.updateMinor(data, competitionId, registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}