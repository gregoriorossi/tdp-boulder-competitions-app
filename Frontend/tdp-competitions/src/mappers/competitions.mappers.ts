import type { ICompetitorResponse, IGetAllCompetitionsResponse, IGetCompetitionResponse, IRegistrationResponse, IUpdateCompetitionRequest } from "../models/api.models";
import { CompetitionStatus, type ICompetition, type IRegistration, type ICompetitor, Gender, type ICompetitionInfo, type ICompetitionInfoForm } from "../models/competitions.models";

export default class CompetitionsMappers {
	public static ToICompetition = (data: IGetAllCompetitionsResponse): ICompetition => {
		const status = this.numberToCompetitionStatus(data.status);
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
		const status = this.numberToCompetitionStatus(data.status);

		return {
			id: data.id,
			registrationsOpen: data.registrationsOpen,
			title: data.title,
			status: status,
			date: new Date(data.date),
			isOpen: status === CompetitionStatus.OPEN,
			bannerImageId: data.bannerImageId,
			description: data.description,
			emailText: data.emailText,
			privacyAttachmentId: data.privacyAttachmentId,
			privacyText: data.privacyText,
			slug: data.slug
		};
	}

	public static numberToCompetitionStatus = (value: number): CompetitionStatus => {
		switch (value) {
			case 0:
				return CompetitionStatus.DRAFT;
			case 1:
				return CompetitionStatus.OPEN;
			case 2:
				return CompetitionStatus.CLOSED;
			default:
				return CompetitionStatus.DRAFT;
		}
	}

	public static numberToGender = (value: number): Gender => {
		switch (value) {
			case 0:
				return Gender.MALE;
			default:
				return Gender.FEMALE;
		}
	}

	public static ToIRegistration = (value: IRegistrationResponse): IRegistration => {
		return {
			id: value.id,
			competitionId: value.competitionId,
			competitor: this.ToCompetitor(value.competitor),
			createdAt: new Date(value.createdAt),
			email: value.email,
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
			gender: this.numberToGender(value.gender),
			isMinor: value.isMinor,
			lastName: value.lastName,
			phoneNumber: value.phoneNumber,
			registrationId: value.registrationId
		};
	}

	public static ToIUpdateCompetitionRequest = (id: string, competition: ICompetitionInfoForm): IUpdateCompetitionRequest => {
		return {
			bannerImageId: competition.bannerImageId,
			bannerImage: competition.bannerImage,
			date: competition.date,
			description: competition.description,
			emailText: competition.emailText,
			id: id,
			privacyAttachment: competition.privacyAttachment,
			privacyAttachmentId: competition.privacyAttacymentId,
			privacyText: competition.privacyAttachmentText,
			title: competition.title,
			registrationsOpen: competition.registrationsOpen
		};
	}
}

