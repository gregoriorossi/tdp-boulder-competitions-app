import type { ICompetitorResponse, IGetAllCompetitionsResponse, IGetCompetitionResponse, IGetRankingResponse, IRegistrationResponse, IUpdateCompetitionRequest } from "../models/api.models";
import { CompetitionStatus, type ICompetition, type IRegistration, type ICompetitor, type ICompetitionInfo, type ICompetitionInfoForm, type IRanking } from "../models/competitions.models";
import { numberToCompetitionStatus, numberToGender } from "../utils/competitions.utils";

export default class CompetitionsMappers {
	public static ToICompetition = (data: IGetAllCompetitionsResponse): ICompetition => {
		const status = numberToCompetitionStatus(data.status);
		return {
			id: data.id,
			registrationsOpen: data.registrationsOpen,
			title: data.title,
			status: status,
			date: new Date(data.date),
			isOpen: status === CompetitionStatus.OPEN
		};
	}

	public static ToICompetitionInfo = (data: IGetCompetitionResponse): ICompetitionInfo => {
		const status = numberToCompetitionStatus(data.status);

		return {
			id: data.id,
			registrationsOpen: data.registrationsOpen,
			rankingsVisible: data.rankingsVisible,
			title: data.title,
			status: status,
			date: new Date(data.date),
			isOpen: status === CompetitionStatus.OPEN,
			bannerImageId: data.bannerImageId,
			description: data.description,
			emailSubject: data.emailSubject,
			emailText: data.emailText,
			privacyAttachmentId: data.privacyAttachmentId,
			privacyText: data.privacyText,
			slug: data.slug
		};
	}

	public static ToIRegistration = (value: IRegistrationResponse): IRegistration => {
		return {
			id: value.id,
			competitionId: value.competitionId,
			competitor: this.ToCompetitor(value.competitor),
			createdAt: new Date(value.createdAt),
			email: value.email,
			phoneNumber: value.phoneNumber,
			minors: value.minors.map(m => this.ToCompetitor(m))
		}
	}

	public static ToCompetitor = (value: ICompetitorResponse): ICompetitor => {
		return {
			id: value.id,
			addressCity: value.addressCity,
			addressNumber: value.addressNumber,
			addressProvince: value.addressProvince,
			addressStreet: value.addressStreet,
			birthDate: new Date(value.birthDate),
			birthPlace: value.birthPlace,
			birthProvince: value.birthProvince,
			competitionId: value.competitionId,
			firstName: value.firstName,
			gender: numberToGender(value.gender),
			isMinor: value.isMinor,
			lastName: value.lastName,
			registrationId: value.registrationId
		};
	}

	public static ToIUpdateCompetitionRequest = (id: string, competition: ICompetitionInfoForm): IUpdateCompetitionRequest => {
		return {
			bannerImageId: competition.bannerImageId,
			bannerImage: competition?.bannerImage ?? null,
			date: competition.date,
			description: competition.description,
			emailSubject: competition.emailSubject,
			emailText: competition.emailText,
			id: id,
			privacyAttachment: competition?.privacyAttachment ?? null,
			privacyAttachmentId: competition.privacyAttachmentId,
			privacyText: competition.privacyAttachmentText,
			title: competition.title,
			registrationsOpen: competition.registrationsOpen ?? false,
			rankingsVisible: competition.rankingsVisible ?? false
		};
	}

	public static ToIRanking = (data: IGetRankingResponse): IRanking => {
		return {
			competitorId: data.competitorId,
			firstName: data.firstName,
			gender: numberToGender(data.gender),
			isMinor: data.isMinor,
			lastName: data.lastName,
			position: data.position,
			score: data.score
		};
	}
}

