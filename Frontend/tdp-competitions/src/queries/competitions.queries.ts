import { type UseQueryResult, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import CompetitionsService from "../services/competitions.service";
import type { IResponse } from "../models/api.models";
import type { ICompetition, ICompetitionProblems, IProblemsGroup, ISpecialProblem } from "../models/competitions.models";
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

export const useCompetitionById = (id: string): UseQueryResult<IResponse<ICompetition>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.byId(id)],
		queryFn: () => CompetitionsService.getById(id)
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

export const useUpdateGroups = (competitionId: string) => {
	return useMutation({
		mutationFn: (groups: IProblemsGroup[]) => CompetitionsService.updateGroups(competitionId, groups),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}


export const useUpdateProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => CompetitionsService.updateProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => CompetitionsService.deleteProblem(problem.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useProblemsByCompetitionId = (id: string): UseQueryResult<IResponse<ICompetitionProblems>> => {
	return useQuery({
		queryKey: [...queryKeys.problems.byCompetitionId(id)],
		queryFn: () => CompetitionsService.getProblemsByCompetitionId(id)
	});
}

export const useAddSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => CompetitionsService.addSpecialProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => CompetitionsService.updateSpecialProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => CompetitionsService.deleteSpecialProblem(problem.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

