export const EditorsEndpoints = {
	getAllCompetitions: '/Editors/competition/all',
	getCompetitionById: (id: string) => `/Editors/competition/getById/${id}`,
	addCompetition: '/Editors/competition/add',
	updateCompetition: (id: string) => `/Editors/competition/${id}`,
	updateCompetitionStatus: '/Editors/competition/updateStatus',
	deleteCompetition: (id: string) => `/Editors/competition/delete/${id}`,
	getRankings: (id: string) => `/Editors/competition/${id}/competitors`,
	getCompetitors: (id: string) => `/Editors/competition/${id}/rankings`,
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
};

export const CompetitorsEndpoints = {

};

export const FilesEndpoints = {
	get: (id: string) => `/Files/${id}`,
};
