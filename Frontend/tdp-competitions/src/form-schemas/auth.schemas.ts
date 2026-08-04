import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";
const LoginForm = STRINGS.Pages.EditorsLoginPage.Form;

export const editorLoginFormSchema = yup.object({
	username: yup.string().required(LoginForm.Errors.UsernameMandatory),
	password: yup.string().required(LoginForm.Errors.PasswordMandatory)
});