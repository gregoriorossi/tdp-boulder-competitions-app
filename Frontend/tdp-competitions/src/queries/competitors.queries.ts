import { useMutation } from "@tanstack/react-query";
import type { IAddCompetitorRegistrationRequest } from "../models/api.models";
import CompetitorsService from "../services/competitors.service";

export const useAddCompetitorRegistration = (competitionId: string) => {
	return useMutation({
		mutationFn: (data: IAddCompetitorRegistrationRequest) => CompetitorsService.addCompetitorRegistration(data, competitionId),
		onSuccess: () => {}
	});
}