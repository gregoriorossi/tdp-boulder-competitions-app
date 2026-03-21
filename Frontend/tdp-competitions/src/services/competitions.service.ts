import editorsApi from "../api/axios";
import { EditorsEndpoints } from "../api/endpoints";
import type { IAddCompetitionRequest, IAddSpecialProblemRequest, IGetAllCompetitionsResponse, IResponse, IUpdateSpecialProblemRequest } from "../models/api.models";
import type { ICompetition, ICompetitionProblems, ISpecialProblem } from "../models/competitions.models";

export default class CompetitionsService {

	public static getAllCompetitions = async (): Promise<IResponse<IGetAllCompetitionsResponse[]>> => {
		const data = await editorsApi.get(EditorsEndpoints.getAllCompetitions);
		return data.data as IResponse<IGetAllCompetitionsResponse[]>;
	}

	public static getById = async (id: string): Promise<IResponse<ICompetition>> => {
		const data = await editorsApi.get(EditorsEndpoints.getCompetitionById(id));
		return data.data as IResponse<ICompetition>;
	}

	public static add = async (title: string, date: Date): Promise<IResponse<ICompetition>> => {
		const payload: IAddCompetitionRequest = {
			title,
			date
		};

		const data = await editorsApi.post(EditorsEndpoints.addCompetition, payload);
		return data.data as IResponse<ICompetition>;
	}

	public static delete = async (id: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteCompetition(id));
		return data.data as IResponse<boolean>;
	}

	public static getProblemsByCompetitionId = async (id: string): Promise<IResponse<ICompetitionProblems>> => {
		const data = await editorsApi.get(EditorsEndpoints.getProblemsByCompetitionId(id));
		return data.data as IResponse<ICompetitionProblems>;
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
}