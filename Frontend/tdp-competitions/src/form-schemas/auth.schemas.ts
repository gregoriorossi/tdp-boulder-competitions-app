import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";
const EditorLoginForm = STRINGS.Pages.EditorsLoginPage.Form;
const CompetitorLoginForm = STRINGS.Pages.CompetitorsLoginPage.Form;

export const editorLoginFormSchema = yup.object({
	username: yup.string().required(EditorLoginForm.Errors.UsernameMandatory),
	password: yup.string().required(EditorLoginForm.Errors.PasswordMandatory)
});

export const competitorLoginFormSchema = yup.object({
	email: yup.string().required(CompetitorLoginForm.Errors.EmailMandatory),
	competitionId: yup.string().required(CompetitorLoginForm.Errors.CompetitionMandatory)
});