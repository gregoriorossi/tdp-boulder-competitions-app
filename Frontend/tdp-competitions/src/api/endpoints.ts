import { Gender } from "../models/competitions.models";
import { genderToQueryParam } from "../utils/competitions.utils";

export const AuthEndpoints = {
	competitorLogin: '/Auth/competitor/login',
	editorLogin: '/Auth/editor/login'
};

export const EditorsEndpoints = {
	getAllCompetitions: '/Editors/competitions',
	getCompetitionById: (id: string) => `/Editors/competitions/getById/${id}`,
	addCompetition: '/Editors/competitions',
	updateCompetition: (id: string) => `/Editors/competitions/${id}`,
	updateCompetitionStatus: (id: string) => `/Editors/competitions/${id}/status`,
	deleteCompetition: (id: string) => `/Editors/competitions/${id}`,
	getRankings: (id: string, gender: Gender | null) => {
		const genderValue: string = genderToQueryParam(gender);
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
	updateProblemsGroups: (competitionId: string) => `/Editors/competitions/${competitionId}/problems/groups`,
	addProblemToGroup: (competitionId: string) => `/Editors/competitions/${competitionId}/problems`,
	updateProblem: (competitionId: string) => `/Editors/competitions/${competitionId}/problems`,
	deleteProblem: (competitionId: string, problemId: string) => `/Editors/competitions/${competitionId}/problems/${problemId}`,
	addSpecialProblem: (competitionId: string) => `/Editors/competitions/${competitionId}/specialProblems`,
	updateSpecialProblem: (competitionId: string, specialProblemId: string) => `/Editors/competitions/${competitionId}/specialProblems/${specialProblemId}`,
	deleteSpecialProblem: (competitionId: string, specialProblemId: string) => `/Editors/competitions/${competitionId}/specialProblems/${specialProblemId}`,
	sendProblem: (competitionId: string, problemId: string) => `/Editors/competitions/${competitionId}/problems/${problemId}/send`,
	unsendProblem: (competitionId: string, problemId: string, sentProblemId: string) => `/Editors/competitions/${competitionId}/problems/${problemId}/send/${sentProblemId}`,
	sendSpecialProblem: (competitionId: string, specialProblemId: string) => `/Editors/competitions/${competitionId}/specialproblems/${specialProblemId}/send`,
	unsendSpecialProblem: (competitionId: string, specialProblemId: string, sentSpecialProblemId: string) => `/Editors/competitions/${competitionId}/specialproblems/${specialProblemId}/send/${sentSpecialProblemId}`,
	downloadWaiverAll: (competitionId: string) => import.meta.env.VITE_API_URL + `/Editors/competitions/${competitionId}/waiver`,
	downloadWaiver: (competitionId: string, registrationId: string) => import.meta.env.VITE_API_URL + `/Editors/competitions/${competitionId}/waiver/${registrationId}`,
	downloadReport: (id: string) => import.meta.env.VITE_API_URL + `/Editors/competitions/${id}/report`
};

export const CompetitorsEndpoints = {
	addRegistration: (competitionId: string) => `/Competitors/register/${competitionId}`,
	getCompetitionBySlug: (slug: string) => `/Competitors/competitions/getBySlug/${slug}`,
	getCompetitionAndRegistrationDataBySlug: (slug: string) => `/Competitors/competitions/getBySlug/${slug}/registration`,
	getCompetitions: '/Competitors/competitions',
	getCompetition: (slug: string) => `/Competitors/competitions/${slug}`,
	getRankings: (id: string, gender: Gender | null) => {
		const genderValue: string = genderToQueryParam(gender);
		return `/Competitors/competitions/${id}/rankings${genderValue}`;
	},
	getProblems: (competitionId: string) => `/Competitors/competitions/${competitionId}/problems`,
	getSentProblems: (competitionId: string, competitorId: string) => `/Competitors/competitions/${competitionId}/problems/competitors/${competitorId}`,
	sendProblem: (competitionId: string, problemId: string) => `/Competitors/competitions/${competitionId}/problems/${problemId}/send`
};

export const FilesEndpoints = {
	get: (id: string) => import.meta.env.VITE_API_URL + `/Files/${id}`,
};
