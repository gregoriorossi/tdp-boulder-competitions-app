import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";
import { converDateInForm } from "../utils/date.utils";

export const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AddCompetitionStrings = STRINGS.Modals.NewCompetition;
const SpecialProblemStrings = STRINGS.Modals.SpecialProblem;
const ProblemsStrings = STRINGS.Modals.Problem;
const UpdateCompetitionStrings = STRINGS.Forms.Competition;

export const addCompetitionSchema = yup.object({
	title: yup.string()
		.min(5, AddCompetitionStrings.Errors.TitleLength)
		.required(AddCompetitionStrings.Errors.Title),
	date: yup.date()
		.required(AddCompetitionStrings.Errors.Date)
		.transform(converDateInForm)
		.typeError(AddCompetitionStrings.Errors.DateValid)
});

export const updateCompetitionSchema = yup.object({
	title: yup.string()
		.min(5, UpdateCompetitionStrings.Errors.TitleLength)
		.required(UpdateCompetitionStrings.Errors.Title),
	description: yup.string(),
	emailText: yup.string()
		.required(),
	registrationsOpen: yup.boolean(),
	date: yup.date()
		.required(UpdateCompetitionStrings.Errors.Date)
		.transform(converDateInForm)
		.typeError(UpdateCompetitionStrings.Errors.DateValid),
	privacyAttachmentText: yup.string(),
	privacyAttachmentId: yup.string().nullable(),
	privacyAttachment: yup
		.mixed<File>()
		.nullable()
		.optional()
		.test('fileSize', STRINGS.Errors.FileTooLarge(`${MAX_IMAGE_SIZE}MB`), (file) => !file || file.size <= MAX_FILE_SIZE),
	bannerImage: yup
		.mixed<File>()
		.nullable()
		.optional()
		.test('fileSize', STRINGS.Errors.ImageTooLarge(`${MAX_IMAGE_SIZE}MB`), (file) => !file || file.size <= MAX_IMAGE_SIZE),
	bannerImageId: yup.string().nullable()
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