import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";
import { converDateInForm } from "../utils/date.utils";

const AddCompetitionStrings = STRINGS.Modals.NewCompetition;
const SpecialProblemStrings = STRINGS.Modals.SpecialProblem;
const ProblemsStrings = STRINGS.Modals.Problem;

export const addCompetitionSchema = yup.object({
	title: yup.string()
		.min(5, AddCompetitionStrings.Errors.TitleLength)
		.required(AddCompetitionStrings.Errors.Title),
	date: yup.date()
		.required(AddCompetitionStrings.Errors.Date)
		.transform(converDateInForm)
		.typeError(AddCompetitionStrings.Errors.DateValid)
});

export const specialProblemSchema = yup.object({
	title: yup.string()
		.min(5, SpecialProblemStrings.Errors.TitleLength)
		.required(SpecialProblemStrings.Errors.Title)
});

export const problemSchema = yup.object({
	title: yup.string()
		.required(ProblemsStrings.Errors.Title)
});

export const problemGroupSchema = (colors: string[]) => {
	return yup.object({
		colorCode: yup.string().oneOf(colors).required(STRINGS.Forms.AddProblemsGroup.Errors.Color)
	});
}