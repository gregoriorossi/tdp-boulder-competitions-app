export const Routes = {
	EditorsHome: '/editors',
	EditorsLogin: '/editors/login',
	NotFound: '/not-found',
	CompetitorLogin: '/accedi',
	Competition: (slug: string) => `/gare/${slug}`
}

export const QueryParams = {
	Hint: "hint"	
}