import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";

const AddCompetition = STRINGS.Modals.NewCompetition;

export const addCompetitionSchema = yup.object({
	title: yup.string()
		.min(5, AddCompetition.Errors.TitleLength)
		.required(AddCompetition.Errors.Title),
	date: yup.date()
		.required(AddCompetition.Errors.Date)
		.transform((_value, originalValue) => {
			// per Day.js
			if (originalValue && typeof originalValue === 'object' && originalValue.$d instanceof Date) {
				return originalValue.$d;
			}

			const asDate = new Date(originalValue);
			return isNaN(asDate.getTime()) ? undefined : asDate;
		})
		.typeError(AddCompetition.Errors.DateValid)
});