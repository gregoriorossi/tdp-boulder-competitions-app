import { type UseQueryResult, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../api/queryClient";
import EditorsService from "../services/editors.service";
import type { IGetRankingResponse, IResponse, ISendProblemRequest, IUpdateCompetitionRequest, IUpdateCompetitionStatusRequest } from "../models/api.models";
import type { Gender, ICompetition, ICompetitionInfo, ICompetitionProblems, IGetResultsResponse, IProblem, IProblemsGroup, IRanking, ISpecialProblem } from "../models/competitions.models";
import CompetitionsMappers from "../mappers/competitions.mappers";
import CompetitorsService from "../services/competitors.service";

interface IUseAddCompetitionMutation {
	title: string,
	date: Date
}

export const useCompetitions = (): UseQueryResult<IResponse<ICompetition[]>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.all],
		queryFn: async (): Promise<IResponse<ICompetition[]>> => {
			const result = await EditorsService.getAllCompetitions();

			return {
				...result,
				value: (result?.value ?? []).map(c => CompetitionsMappers.ToICompetition(c))
			};
		}
	});
}

export const useAddCompetition = () => {
	return useMutation({
		mutationFn: (data: IUseAddCompetitionMutation) => EditorsService.add(data.title, data.date),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all })
		}
	});
}

export const useCompetitionById = (id: string): UseQueryResult<IResponse<ICompetitionInfo>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.byId(id)],
		queryFn: async () => {
			const result = await EditorsService.getById(id);
			return {
				...result,
				value: result.value ? CompetitionsMappers.ToICompetitionInfo(result.value) : null
			}
		}
	});
}

export const useCompetitionBySlug = (slug: string): UseQueryResult<IResponse<ICompetitionInfo>> => {
	return useQuery({
		queryKey: [...queryKeys.competitions.bySlug(slug)],
		queryFn: async () => {
			const result = await CompetitorsService.getBySlug(slug);
			return {
				...result,
				value: result.value ? CompetitionsMappers.ToICompetitionInfo(result.value) : null
			}
		}
	});
}

export const useUpdateCompetition = (competitionId: string) => {
	return useMutation({
		mutationFn: (competetitionInfo: IUpdateCompetitionRequest) => EditorsService.updateCompetitionInfo(competetitionInfo),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateCompetitionStatus = (competitionId: string) => {
	return useMutation({
		mutationFn: (request: IUpdateCompetitionStatusRequest) => EditorsService.updateCompetitionStatus(request),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitions.byId(competitionId) })
		}
	})
}

export const useDeleteCompetition = () => {
	return useMutation({
		mutationFn: (id: string) => EditorsService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all })
		}
	});
}

export const useUpdateGroups = (competitionId: string) => {
	return useMutation({
		mutationFn: (groups: IProblemsGroup[]) => EditorsService.updateGroups(competitionId, groups),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useAddProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (request: IProblem) => EditorsService.addProblem(request),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: IProblem) => EditorsService.updateProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useRankingByCompetitionById = (id: string, gender: Gender | null): UseQueryResult<IResponse<IRanking[]>> => {
	return useQuery({
		queryKey: [...queryKeys.rankings.byCompetitionId(id, gender)],
		queryFn: async () => {
			const result = await EditorsService.getRankingByCompetitionId(id, gender);
			return {
				...result,
				value: result?.value?.length ? result.value.map(r => CompetitionsMappers.ToIRanking(r)) : []
			}
		}
	});
}

export const useDeleteProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => EditorsService.deleteProblem(problem.id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useProblemsByCompetitionId = (id: string): UseQueryResult<IResponse<ICompetitionProblems>> => {
	return useQuery({
		queryKey: [...queryKeys.problems.byCompetitionId(id)],
		queryFn: () => EditorsService.getProblemsByCompetitionId(id)
	});
}

export const useAddSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => EditorsService.addSpecialProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useUpdateSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => EditorsService.updateSpecialProblem(problem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useDeleteSpecialProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (problem: ISpecialProblem) => EditorsService.deleteSpecialProblem(problem.id!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.problems.byCompetitionId(competitionId) });
		}
	});
}

export const useResults = (competitionId: string) => {
	return useQuery({
		queryKey: [...queryKeys.results.byId(competitionId)],
		queryFn: async (): Promise<IResponse<IGetResultsResponse>> => {
			const result = await EditorsService.getResultsByCompetitionId(competitionId);

			return {
				...result,
				value: result.value ? result.value : null
			};
		}
	});
}

export const useSendProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (sendProblemRequest: ISendProblemRequest) => EditorsService.sendProblem(sendProblemRequest),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.results.byId(competitionId) });
		}
	});
}

export const useUnsendProblem = (competitionId: string) => {
	return useMutation({
		mutationFn: (sentProblemId: string) => EditorsService.unsendProblem(sentProblemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.results.byId(competitionId) });
		}
	});
}