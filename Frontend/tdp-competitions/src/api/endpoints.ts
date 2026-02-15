export const EditorsEndpoints = {
	getAllCompetitions: '/Editors/competition/all',
	getCompetitionById: (id: string) => `/Editors/competition/getById/${id}`,
	addCompetition: '/Editors/competition/add',
	updateCompetition: '/Editors/competition/update',
	updateCompetitionStatus: '/Editors/competition/updateStatus',
	deleteCompetition: (id: string) => `/Editors/competition/delete/${id}`,
	getRankings: (id: string) => `/Editors/competition/${id}/competitors`,
	getCompetitors: (id: string) => `/Editors/competition/${id}/rankings`,
	getProblemsByCompetitionId: (id: string) => `/Editors/problems/get/${id}`,
	addProblemsGroup: `/Editors/problems/addGroup`,
	deleteProblemsGroup: (id: string) => `/Editors/problems/deleteGroup/${id}`,
	addProblemToGroup: `/Editors/problems/addToGroup`,
	updateProblem: `/Editors/problems/updateProblem`,
	deleteProblem: (id: string) => `/Editors/problems/deleteFromGroup/${id}`
};

export const CompetitorsEndpoints = {

};

export const FilesEndpoints = {
	get: (id: string) => `/Files/${id}`,
};
