import *  as yup from "yup";
import { STRINGS } from "../consts/strings.consts";
import { converDateInForm, getDateMinusYears } from "../utils/date.utils";
import { GENDERS } from "../models/competitions.models";
const Errors = STRINGS.Errors;
const RegistrationStrings = STRINGS.Forms.Registration;

export const registrationSchema = yup.object({
	firstName: yup.string()
		.required(Errors.Mandatory)
		.min(2, Errors.MinLength(2)),
	lastName: yup.string()
		.required(Errors.Mandatory)
		.min(2, Errors.MinLength(2)),
	email: yup.string()
		.required(Errors.Mandatory)
		.email(RegistrationStrings.Errors.Email),
	birthDate: yup.date()
		.required(Errors.Mandatory)
		.transform(converDateInForm)
		.test(
			"is-adult",
			Errors.MinAge(18),
			(value) => {
				const minDate = getDateMinusYears(18);
				return value <= minDate;
			})
		.typeError(Errors.DateInvalid),
	gender: yup.number()
		.oneOf(GENDERS)
		.required(Errors.Mandatory),
	birthPlace: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	birthProvince: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressCity: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressProvince: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressStreet: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressNumber: yup.string()
		.required(Errors.Mandatory),
	phoneNumber: yup.string()
		.required(Errors.Mandatory)
		.min(7, (Errors.MinLength(7))),
	acceptPrivacy: yup.boolean()
		.oneOf([true], Errors.PrivacyMandatory)
});

export const minorSchema = yup.object({
	firstName: yup.string()
		.required(Errors.Mandatory)
		.min(2, Errors.MinLength(2)),
	lastName: yup.string()
		.required(Errors.Mandatory)
		.min(2, Errors.MinLength(2)),
	birthDate: yup.date()
		.required(Errors.Mandatory)
		.transform(converDateInForm)
		.test(
			"is-minor",
			Errors.MaxAge(18),
			(value) => {
				const dateThreshold = getDateMinusYears(18);
				return value > dateThreshold;
			}

		)
		.typeError(Errors.DateInvalid),
	gender: yup.number()
		.oneOf(GENDERS)
		.required(Errors.Mandatory),
	birthPlace: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	birthProvince: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressCity: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressProvince: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressStreet: yup.string()
		.required(Errors.Mandatory)
		.min(2, (Errors.MinLength(2))),
	addressNumber: yup.string()
		.required(Errors.Mandatory)
});

export interface IRegistrationForm {
	firstName: string;
	lastName: string;
	email: string;
	birthDate: Date;
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
	phoneNumber: string;
}

export interface IMinorForm {
	firstName: string;
	lastName: string;
	birthDate: Date;
	gender: number;
	birthPlace: string;
	birthProvince: string;
	addressCity: string;
	addressProvince: string;
	addressStreet: string;
	addressNumber: string;
}