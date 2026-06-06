import { Gender } from "../models/competitions.models";

export const EditorsEndpoints = {
	getAllCompetitions: '/Editors/competition/all',
	getCompetitionById: (id: string) => `/Editors/competition/getById/${id}`,
	addCompetition: '/Editors/competition/add',
	updateCompetition: (id: string) => `/Editors/competition/${id}`,
	updateCompetitionStatus: '/Editors/competition/updateStatus',
	deleteCompetition: (id: string) => `/Editors/competition/delete/${id}`,
	getRankings: (id: string, gender: Gender | null) => {
		let genderValue: string = "";
		switch (gender) {
			case Gender.MALE:
				genderValue = "?gender=male";
				break;
			case Gender.FEMALE:
				genderValue = "?gender=female";
				break;
			default:
				genderValue = "";
				break;
		}
		return `/Editors/competition/${id}/rankings${genderValue}`;
	},
	getCompetitors: (id: string) => `/Editors/competition/${id}/competitors`,
	getResultsByCompetitionId: (id: string) => `/Editors/results/${id}`,
	deleteCompetitor: (id: string) => `/Editors/registrations/competitor/${id}`,
	getProblemsByCompetitionId: (id: string) => `/Editors/problems/get/${id}`,
	getRegistrationsByCompetitionId: (id: string) => `/Editors/competition/${id}/registrations`,
	addRegistration: (competitionId: string) => `/Editors/registrations/${competitionId}`,
	deleteRegistration: (id: string) => `/Editors/registrations/${id}`,
	addProblemsGroup: `/Editors/problems/addGroup`,
	updateProblemsGroups: '/Editors/problems/groups',
	addProblemToGroup: `/Editors/problems/addToGroup`,
	updateProblem: `/Editors/problems/updateProblem`,
	deleteProblem: (id: string) => `/Editors/problems/deleteFromGroup/${id}`,
	addSpecialProblem: '/Editors/problems/specialProblem',
	updateSpecialProblem: '/Editors/problems/specialProblem',
	deleteSpecialProblem: (id: string) => `/Editors/problems/specialProblem/${id}`,
	sendProblem: '/Editors/problems/send',
	unsendProblem: (id: string) => `/Editors/problems/unsend/${id}`,
	downloadWaiverAll: (competitionId: string) => import.meta.env.VITE_API_URL + `/Editors/competition/${competitionId}/waiver`,
	downloadWaiver: (competitionId: string, registrationId: string) => import.meta.env.VITE_API_URL + `/Editors/competition/${competitionId}/waiver/${registrationId}`,
	downloadReport: (id: string) => import.meta.env.VITE_API_URL + `/Editors/competition/${id}/report`
};

export const CompetitorsEndpoints = {
	addRegistration: (competitionId: string) => `/Competitors/register/${competitionId}`,
	getCompetitionBySlug: (slug: string) => `/Competitors/competition/getBySlug/${slug}`
};

export const FilesEndpoints = {
	get: (id: string) => import.meta.env.VITE_API_URL + `/Files/${id}`,
};
