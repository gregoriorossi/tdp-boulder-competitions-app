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
	},
	competitors: {
		competitions: {
			all: ["competitor-competitions"] as const,
			bySlug: (slug: string) => ["competitor-competition-slug", slug]
		},
		rankings: {
			byCompetitionId: (id: string, gender: Gender | null) => ["competitor-ranking-competitionid", id, gender]
		},
		problems: {
			byCompetitionId: (id: string) => ["competitor-problems-competition-id", id],
			sent: (competitionId: string, competitorId: string) => ["competitor-sent-problems-competition-id", competitionId, competitorId]
		},
		registrations: {
			byId: (id: string) => ["competitor-registration-id", id]
		}
	}
};