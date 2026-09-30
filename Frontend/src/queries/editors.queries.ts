import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import type { IMinorRequest } from "../models/api.models";
import EditorsService from "../services/editors.service";
import type { ISendSpecialProblemData, IUnsendSpecialProblemData } from "../models/competitions.models";

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

export const useSendSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (sendProblemRequest: ISendSpecialProblemData) => EditorsService.sendSpecialProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.results.byId(competitionId) });
		}
	});
}

export const useUnsendSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (unsendSpecialProblemRequest: IUnsendSpecialProblemData) => EditorsService.unsendSpecialProblem(unsendSpecialProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.results.byId(competitionId) });
		}
	});
}

export const useDownloadWaiver = (competitionId: string, registrationId: string) => {
	return useMutation({
		mutationFn: () => EditorsService.downloadWaiver(competitionId, registrationId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.registrations.byCompetitionId(competitionId) });
		}
	});
}