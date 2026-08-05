import editorsApi from "../api/editorsAxios";
import { EditorsEndpoints } from "../api/endpoints";
import type { IAddCompetitionRequest, IMinorRequest, IAddProblemRequest, IAddSpecialProblemRequest, IGetAllCompetitionsResponse, IGetCompetitionResponse, IGetRankingResponse, IRegistrationResponse, IResponse, ISendProblemRequest, IUpdateCompetitionRequest, IUpdateCompetitionStatusRequest, IUpdateProblemRequest, IUpdateProblemsGroupsRequest, IRegistrationRequest, ISendSpecialProblemRequest } from "../models/api.models";
import type { Gender, ICompetition, ICompetitionInfo, ICompetitionProblems, ICompetitor, IGetResultsResponse, IProblem, IProblemsGroup, IRegistration, ISendProblemData, ISendSpecialProblemData, ISpecialProblem, IUnsendProblemData, IUnsendSpecialProblemData } from "../models/competitions.models";

export default class EditorsService {

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
		const formData = new FormData();
		formData.append('id', competition.id);
		formData.append('title', competition.title);
		formData.append('description', competition.description ?? '');
		formData.append('registrationsOpen', competition.registrationsOpen ? 'true' : 'false');
		formData.append('date', competition.date.toISOString());
		formData.append('emailText', competition.emailText);
		formData.append('privacyText', competition.privacyText ?? '');
		formData.append('privacyAttachmentId', competition.privacyAttachmentId ?? '');
		formData.append('bannerImageId', competition.bannerImageId ?? '');

		if (competition?.bannerImage) {
			formData.append('bannerImage', competition?.bannerImage, competition.bannerImage?.name);
		}

		if (competition?.privacyAttachment) {
			formData.append('privacyAttachment', competition?.privacyAttachment, competition.privacyAttachment?.name);
		}

		const data = await editorsApi.patch(EditorsEndpoints.updateCompetition(competition.id), formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return data.data as IResponse<ICompetitionInfo>;
	}

	public static updateCompetitionStatus = async (request: IUpdateCompetitionStatusRequest): Promise<IResponse<boolean>> => {
		const payload: IUpdateCompetitionStatusRequest = {
			competitionId: request.competitionId,
			status: request.status
		};

		const data = await editorsApi.patch(EditorsEndpoints.updateCompetitionStatus, payload);
		return data.data as IResponse<boolean>;
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
		const data = await editorsApi.post(EditorsEndpoints.addSpecialProblem(problem.competitionId), problem);
		return data.data as IResponse<ISpecialProblem>;
	}

	public static updateSpecialProblem = async (problem: ISpecialProblem): Promise<IResponse<ISpecialProblem>> => {
		const data = await editorsApi.patch(EditorsEndpoints.updateSpecialProblem(problem.competitionId, problem.id!), problem);
		return data.data as IResponse<ISpecialProblem>;
	}

	public static deleteSpecialProblem = async (competitionId: string, specialProblemId: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteSpecialProblem(competitionId, specialProblemId));
		return data.data as IResponse<boolean>;
	}

	public static addProblem = async (problem: IProblem): Promise<IResponse<IProblem>> => {
		const payload: IAddProblemRequest = {
			competitionId: problem.competitionId,
			name: problem.name,
			problemsGroupId: problem.problemGroupId
		};
		const data = await editorsApi.post(EditorsEndpoints.addProblemToGroup(problem.competitionId), payload);
		return data.data as IResponse<IProblem>;
	}

	public static updateProblem = async (problem: IUpdateProblemRequest): Promise<IResponse<IProblem>> => {
		const data = await editorsApi.patch(EditorsEndpoints.updateProblem(problem.competitionId), problem);
		return data.data as IResponse<IProblem>;
	}

	public static deleteProblem = async (problem: IProblem): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteProblem(problem.competitionId, problem.id!));
		return data.data as IResponse<boolean>;
	}

	public static updateGroups = async (competitionId: string, groups: IProblemsGroup[]): Promise<IResponse<boolean>> => {
		const payload: IUpdateProblemsGroupsRequest = {
			competitionId: competitionId,
			groups: groups
		};

		const data = await editorsApi.patch(EditorsEndpoints.updateProblemsGroups(competitionId), payload);
		return data.data as IResponse<boolean>;
	}

	public static deleteMinor = async (competitionId: string, registrationId: string, minorId: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteMinor(competitionId, registrationId, minorId));
		return data.data as IResponse<boolean>;
	}

	public static addRegistration = async (data: IRegistrationRequest, competitionId: string): Promise<IResponse<IRegistration>> => {
		const result = await editorsApi.post(EditorsEndpoints.addRegistration(competitionId), data);
		return result.data as IResponse<IRegistration>;
	}

	public static updateRegistration = async (data: IRegistrationRequest, competitionId: string): Promise<IResponse<IRegistration>> => {
		const result = await editorsApi.patch(EditorsEndpoints.updateRegistration(competitionId, data.id!), data);
		return result.data as IResponse<IRegistration>;
	}

	public static deleteRegistration = async (competitionId: string, registrationId: string): Promise<IResponse<boolean>> => {
		const data = await editorsApi.delete(EditorsEndpoints.deleteRegistration(competitionId, registrationId));
		return data.data as IResponse<boolean>;
	}

	public static addMinor = async (data: IMinorRequest, competitionId: string, registrationId: string): Promise<IResponse<ICompetitor>> => {
		const result = await editorsApi.post(EditorsEndpoints.addMinor(competitionId, registrationId), data);
		return result.data as IResponse<ICompetitor>;
	}

	public static updateMinor = async (data: IMinorRequest, competitionId: string, registrationId: string): Promise<IResponse<ICompetitor>> => {
		const result = await editorsApi.patch(EditorsEndpoints.updateMinor(competitionId, registrationId, data.id!), data);
		return result.data as IResponse<ICompetitor>;
	}

	public static getResultsByCompetitionId = async (id: string): Promise<IResponse<IGetResultsResponse>> => {
		const data = await editorsApi.get(EditorsEndpoints.getResultsByCompetitionId(id));
		return data.data as IResponse<IGetResultsResponse>;
	}

	public static sendProblem = async (data: ISendProblemData): Promise<IResponse<boolean>> => {
		const body: ISendProblemRequest = {
			competitorId: data.competitorId
		};

		const result = await editorsApi.post(EditorsEndpoints.sendProblem(data.competitionId, data.problemId), body);
		return result.data as IResponse<boolean>;
	}

	public static sendSpecialProblem = async (data: ISendSpecialProblemData): Promise<IResponse<boolean>> => {
		const body: ISendSpecialProblemRequest = {
			competitorId: data.competitorId,
			sentAt: data.sentAt
		};

		const result = await editorsApi.post(EditorsEndpoints.sendSpecialProblem(data.competitionId, data.specialProblemId), body);
		return result.data as IResponse<boolean>;
	}

	public static unsendProblem = async (data: IUnsendProblemData): Promise<void> => {
		await editorsApi.delete(EditorsEndpoints.unsendProblem(data.competitionId, data.problemId, data.sentProblemId));
	}

	public static unsendSpecialProblem = async (data: IUnsendSpecialProblemData): Promise<void> => {
		await editorsApi.delete(EditorsEndpoints.unsendSpecialProblem(data.competitionId, data.specialProblemId, data.sentSpecialProblemId));
	}

	public static getRankingByCompetitionId = async (id: string, gender: Gender | null): Promise<IResponse<IGetRankingResponse[]>> => {
		const data = await editorsApi.get(EditorsEndpoints.getRankings(id, gender));
		return data.data as IResponse<IGetRankingResponse[]>;
	}
}