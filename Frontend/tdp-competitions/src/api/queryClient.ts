import { QueryClient } from "@tanstack/react-query";
import type { Gender } from "../models/competitions.models";

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
	results: {
		byId: (id: string) => ["results-id", id]
	},
	registrations: {
		byCompetitionId: (id: string) => ["registrations-competitionid", id]
	},
	rankings: {
		byCompetitionId: (id: string, gender: Gender | null) => ["ranking-competitionid", id, gender]
	}
};