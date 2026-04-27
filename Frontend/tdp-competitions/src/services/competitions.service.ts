import editorsApi from "../api/axios";
import { EditorsEndpoints } from "../api/endpoints";
import type { IAddCompetitionRequest, IAddProblemRequest, IAddSpecialProblemRequest, IGetAllCompetitionsResponse, IGetCompetitionResponse, IRegistrationResponse, IResponse, IUpdateCompetitionRequest, IUpdateProblemRequest, IUpdateProblemsGroupsRequest, IUpdateSpecialProblemRequest } from "../models/api.models";
import type { ICompetition, ICompetitionInfo, ICompetitionProblems, IProblem, IProblemsGroup, ISpecialProblem } from "../models/competitions.models";

export default class CompetitionsService {

	public static getAllCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await editorsApi.get(EditorsEndpoints.getAllCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}

	public static getById = async (id: string): Promise<IResponse<IGetCompetitionResponse>> => {
		const data = await editorsApi.get(EditorsEndpoints.getCompetitionById(id));
		return data.data as IResponse<IGetCompetitionResponse>;
	}

	public static add = async (title: string, date: Date): Promise<IResponse<ICompetition>> => {
		const payload: IAddCompetitionRequest = {
			title,
			date
		};

		const data = await editorsApi.post(EditorsEndpoints.addCompetition, payload);
		return data.data as IResponse<ICompetition>;
	}

	public static updateCompetitionInfo = async (competition: IUpdateCompetitionRequest): Promise<IResponse<ICompetitionInfo>> => {
		const data = await editorsApi.patch(EditorsEndpoints.updateCompetition(competition.id), competition);
		return data.data as IResponse<ICompetitionInfo>;
	}

	public static delete = async (id: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteCompetition(id));
		return data.data as IResponse<boolean>;
	}

	public static getProblemsByCompetitionId = async (id: string): Promise<IResponse<ICompetitionProblems>> => {
		const data = await editorsApi.get(EditorsEndpoints.getProblemsByCompetitionId(id));
		return data.data as IResponse<ICompetitionProblems>;
	}

	public static getRegistrationsByCompetitionId = async (id: string): Promise<IResponse<IRegistrationResponse[]>> => {
		const data = await editorsApi.get(EditorsEndpoints.getRegistrationsByCompetitionId(id));
		return data.data as IResponse<IRegistrationResponse[]>;
	}

	public static addSpecialProblem = async (problem: IAddSpecialProblemRequest): Promise<IResponse<ISpecialProblem>> => {
		const data = await editorsApi.post(EditorsEndpoints.addSpecialProblem, problem);
		return data.data as IResponse<ISpecialProblem>;
	}

	public static updateSpecialProblem = async (problem: IUpdateSpecialProblemRequest): Promise<IResponse<ISpecialProblem>> => {
		const data = await editorsApi.patch(EditorsEndpoints.updateSpecialProblem, problem);
		return data.data as IResponse<ISpecialProblem>;
	}

	public static deleteSpecialProblem = async (id: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteSpecialProblem(id));
		return data.data as IResponse<boolean>;
	}

	public static addProblem = async (problem: IProblem): Promise<IResponse<IProblem>> => {
		const payload: IAddProblemRequest = {
			competitionId: problem.competitionId,
			name: problem.name,
			problemsGroupId: problem.problemGroupId
		};
		const data = await editorsApi.post(EditorsEndpoints.addProblemToGroup, payload);
		return data.data as IResponse<IProblem>;
	}

	public static updateProblem = async (problem: IUpdateProblemRequest): Promise<IResponse<IProblem>> => {
		const data = await editorsApi.patch(EditorsEndpoints.updateProblem, problem);
		return data.data as IResponse<IProblem>;
	}

	public static deleteProblem = async (id: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteProblem(id));
		return data.data as IResponse<boolean>;
	}

	public static updateGroups = async (competitionId: string, groups: IProblemsGroup[]): Promise<IResponse<boolean>> => {
		const payload: IUpdateProblemsGroupsRequest = {
			competitionId: competitionId,
			groups: groups
		};

		const data = await editorsApi.patch(EditorsEndpoints.updateProblemsGroups, payload);
		return data.data as IResponse<boolean>;
	}

	public static deleteCompetitor = async (id: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteCompetitor(id));
		return data.data as IResponse<boolean>;
	}
}