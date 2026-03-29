import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false
		}
	}
});

export const queryKeys = {
	competitions: {
		all: ["competitions"] as const,
		byId: (id: string) => ["competition-id", id],
		bySlug: (slug: string) => ["competition-slug", slug]
	},
	problems: {
		byCompetitionId: (id: string) => ["problems-competition-id", id]
	},
	registrations: {
		byCompetitionId: (id: string) => ["registrations-competitionid", id]
	}
};