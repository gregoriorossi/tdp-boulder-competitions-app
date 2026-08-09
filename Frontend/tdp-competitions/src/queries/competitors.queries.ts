import { useMutation } from "@tanstack/react-query";
import CompetitorsService from "../services/competitors.service";
import type { IAddCompetitorRegistrationRequest } from "../models/competitors.api.models";

export const useAddCompetitorRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IAddCompetitorRegistrationRequest) => CompetitorsService.addCompetitorRegistration(data, competitionId),
		onSuccess: () => {}
	});
}