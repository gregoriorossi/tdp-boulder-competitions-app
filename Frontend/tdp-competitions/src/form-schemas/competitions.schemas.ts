import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";

const AddCompetitionStrings = STRINGS.Modals.NewCompetition;
const SpecialProblemStrings = STRINGS.Modals.SpecialProblem;

export const addCompetitionSchema = yup.object({
	title: yup.string()
		.min(5, AddCompetitionStrings.Errors.TitleLength)
		.required(AddCompetitionStrings.Errors.Title),
	date: yup.date()
		.required(AddCompetitionStrings.Errors.Date)
		.transform((_value, originalValue) => {
			// per Day.js
			if (originalValue && typeof originalValue === 'object' && originalValue.$d instanceof Date) {
				return originalValue.$d;
			}

			const asDate = new Date(originalValue);
			return isNaN(asDate.getTime()) ? undefined : asDate;
		})
		.typeError(AddCompetitionStrings.Errors.DateValid)
});

export const specialProblemSchema = yup.object({
	title: yup.string()
		.min(5, SpecialProblemStrings.Errors.TitleLength)
		.required(SpecialProblemStrings.Errors.Title)
})