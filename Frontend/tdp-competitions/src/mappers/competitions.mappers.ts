import type { IGetAllCompetitionsResponse } from "../models/api.models";
import { CompetitionStatus, type ICompetition } from "../models/competitions.models";

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
}

