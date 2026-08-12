import { CompetitionStatus } from "../models/competitions.models";
import type { ICompetitorResponse, IGetCompetitionResponse, IRegistrationResponse } from "../models/competitors.api.models";
import type { ICompetition, ICompetitor, IRegistration } from "../models/competitors.models";
import { numberToCompetitionStatus, numberToGender } from "../utils/competitions.utils";

export default class CompetitorsMappers {


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

	public static ToICompetition = (data: IGetCompetitionResponse): ICompetition => {
		const status = numberToCompetitionStatus(data.status);

		return {
			id: data.id,
			registrationsOpen: data.registrationsOpen,
			title: data.title,
			status: status,
			date: new Date(data.date),
			isOpen: status === CompetitionStatus.OPEN,
			rankingsVisible: data.rankingsVisible,
			bannerImageId: data.bannerImageId,
			description: data.description,
			slug: data.slug
		};
	}
}