import { Gender } from "../models/competitions.models";

export const EditorsEndpoints = {
	getAllCompetitions: '/Editors/competitions',
	getCompetitionById: (id: string) => `/Editors/competitions/getById/${id}`,
	addCompetition: '/Editors/competitions',
	updateCompetition: (id: string) => `/Editors/competitions/${id}`,
	updateCompetitionStatus: '/Editors/competition/updateStatus',
	deleteCompetition: (id: string) => `/Editors/competitions/${id}`,
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
		return `/Editors/competitions/${id}/rankings${genderValue}`;
	},
	getCompetitors: (id: string) => `/Editors/competition/${id}/competitors`,
	getResultsByCompetitionId: (id: string) => `/Editors/competitions/${id}/results`,
	getProblemsByCompetitionId: (id: string) => `/Editors/competitions/${id}/problems`,
	getRegistrationsByCompetitionId: (id: string) => `/Editors/competitions/${id}/registrations`,
	addRegistration: (competitionId: string) => `/Editors/competitions/${competitionId}/registrations`,
	updateRegistration: (competitionId: string, registrationId: string) => `/Editors/competitions/${competitionId}/registrations/${registrationId}`,
	deleteRegistration: (competitionId: string, registrationId: string) => `/Editors/competitions/${competitionId}/registrations/${registrationId}`,
	addMinor: (competitionId: string, registrationId: string) => `/Editors/competitions/${competitionId}/registrations/${registrationId}/minors`,
	updateMinor: (competitionId: string, registrationId: string, minorId: string) => `/Editors/competitions/${competitionId}/registrations/${registrationId}/minors/${minorId}`,
	deleteMinor: (competitionId: string, registrationId: string, minorId: string) => `/Editors/competitions/${competitionId}/registrations/${registrationId}/minors/${minorId}`,
	addProblemsGroup: `/Editors/problems/addGroup`,
	updateProblemsGroups: '/Editors/problems/groups',
	addProblemToGroup: (competitionId: string) => `/Editors/competitions/${competitionId}/problems`,
	updateProblem: (competitionId: string) => `/Editors/competitions/${competitionId}/problems`,
	deleteProblem: (competitionId: string, problemId: string) => `/Editors/competitions/${competitionId}/problems/${problemId}`,
	addSpecialProblem: '/Editors/problems/specialProblem',
	updateSpecialProblem: '/Editors/problems/specialProblem',
	deleteSpecialProblem: (id: string) => `/Editors/problems/specialProblem/${id}`,
	sendProblem: '/Editors/problems/send',
	unsendProblem: (id: string) => `/Editors/problems/unsend/${id}`,
	downloadWaiverAll: (competitionId: string) => import.meta.env.VITE_API_URL + `/Editors/competitions/${competitionId}/waiver`,
	downloadWaiver: (competitionId: string, registrationId: string) => import.meta.env.VITE_API_URL + `/Editors/competition/${competitionId}/waiver/${registrationId}`,
	downloadReport: (id: string) => import.meta.env.VITE_API_URL + `/Editors/competitions/${id}/report`
};

export const CompetitorsEndpoints = {
	addRegistration: (competitionId: string) => `/Competitors/register/${competitionId}`,
	getCompetitionBySlug: (slug: string) => `/Competitors/competition/getBySlug/${slug}`
};

export const FilesEndpoints = {
	get: (id: string) => import.meta.env.VITE_API_URL + `/Files/${id}`,
};
