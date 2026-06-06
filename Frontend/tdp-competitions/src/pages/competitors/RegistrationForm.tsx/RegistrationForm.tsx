import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { STRINGS } from "../../../consts/strings.consts";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Spinner } from "../../../components/Spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema, type IRegistrationForm, type IMinorForm } from "../../../form-schemas/registrations.schemas";
import { Controller, useForm } from "react-hook-form";
import { Errors } from "../../../consts/errors.consts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import classNames from "../../../App.module.scss";
import { genderToString } from "../../../utils/competitions.utils";
import { GENDERS } from "../../../models/competitions.models";
const FormStrings = STRINGS.Forms.Registration;
const FieldsStrings = FormStrings.Fields;
const RegistrationPageStrings = STRINGS.Pages.RegistrationPage;
import dayjs, { Dayjs } from "dayjs";
import type { IAddRegistrationRequest } from "../../../models/api.models";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useAddCompetitorRegistration } from "../../../queries/competitors.queries";
import { MinorForm } from "./MinorForm";
import { Minor } from "./Minor";

interface IRegistrationFormProps {
	competitionId: string;
}

export function RegistrationForm(props: IRegistrationFormProps) {

	const { competitionId } = props;
	const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(registrationSchema)
	});

	const [minors, setMinors] = useState<IMinorForm[]>([]);
	const [isMinorModalOpen, setIsMinorModalOpen] = useState<boolean>(false);

	const { data: addRegistrationData, error: addRegistrationError, mutateAsync: addRegistrationMutateAsync, isPending: addRegistrationIsPending } = useAddCompetitorRegistration(competitionId);
	const errorCode: string | null = addRegistrationData?.error?.code ?? (addRegistrationError ? Errors.Generic : null);

	const onSubmit = async (data: IRegistrationForm) => {
		if (addRegistrationIsPending) return;

		const request: IAddRegistrationRequest = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			gender: data.gender,
			addressCity: data.addressCity,
			addressNumber: data.addressNumber,
			addressProvince: data.addressProvince,
			addressStreet: data.addressStreet,
			birthDate: data.birthDate,
			birthPlace: data.birthPlace,
			birthProvince: data.birthProvince,
			minors: [],
			phoneNumber: data.phoneNumber
		};

		const result = await addRegistrationMutateAsync(request);
		if (result.isSuccess) {
			reset();
		}
	}

	const onMinorAdd = (minor: IMinorForm) => {
		setMinors([...minors, minor]);
	}

	const onMinorDelete = (index: number) => {
		setMinors(minors.filter((_, i) => i !== index));
	}

	const onMinorChange = (minor: IMinorForm, index: number) => {
		setMinors(prev => 
			prev.map((m, i) => i === index ? minor : m)
		);
	}

	return <div className={classNames.formContainer}>
		<Box
			className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label={FieldsStrings.FirstName}
				{...register("firstName")}
				error={!!errors.firstName}
				helperText={errors.firstName?.message} />

			<TextField
				label={FieldsStrings.LastName}
				{...register("lastName")}
				error={!!errors.lastName}
				helperText={errors.lastName?.message} />

			<TextField
				label={FieldsStrings.Email}
				{...register("email")}
				error={!!errors.email}
				helperText={errors.email?.message} />

			<Controller
				name="birthDate"
				control={control}
				render={
					({ field }) => {
						const dayJsValue: Dayjs | null = field.value ? dayjs(field.value) : null;
						return (
							<DatePicker
								label={FormStrings.Fields.BirthDate}
								value={dayJsValue}
								onChange={(newValue) => {
									field.onChange(newValue ? newValue.toDate() : null);
								}}
								slotProps={{
									textField: {
										error: !!errors.birthDate,
										helperText: errors.birthDate?.message as string | undefined,
										fullWidth: true
									}
								}}
								format="DD/MM/YYYY" />
						)
					}} />

			<FormControl error={!!errors.gender} className={classNames.select}>
				<InputLabel>{FieldsStrings.Gender}</InputLabel>
				<Controller
					name="gender"
					control={control}
					render={({ field }) => (
						<Select
							labelId="color-label"
							key={field.value || "empty"}
							label="type" {...field}>
							{
								GENDERS.map((g) =>
									<MenuItem value={g} key={g}>
										{genderToString(g)}
									</MenuItem>
								)
							}
						</Select>
					)} />
				{errors.gender && (
					<Typography variant="caption" color="error">
						{errors.gender.message}
					</Typography>
				)}
			</FormControl>

			<TextField
				label={FieldsStrings.BirthPlace}
				{...register("birthPlace")}
				error={!!errors.birthPlace}
				helperText={errors.birthPlace?.message} />

			<TextField
				label={FieldsStrings.BirthProvince}
				{...register("birthProvince")}
				error={!!errors.birthProvince}
				helperText={errors.birthProvince?.message} />

			<TextField
				label={FieldsStrings.AddressCity}
				{...register("addressCity")}
				error={!!errors.addressCity}
				helperText={errors.addressCity?.message} />

			<TextField
				label={FieldsStrings.AddressProvince}
				{...register("addressProvince")}
				error={!!errors.addressProvince}
				helperText={errors.addressProvince?.message} />

			<TextField
				label={FieldsStrings.AddressStreet}
				{...register("addressStreet")}
				error={!!errors.addressStreet}
				helperText={errors.addressStreet?.message} />

			<TextField
				label={FieldsStrings.AddressNumber}
				{...register("addressNumber")}
				error={!!errors.addressNumber}
				helperText={errors.addressNumber?.message} />

			<TextField
				label={FieldsStrings.PhoneNumber}
				{...register("phoneNumber")}
				error={!!errors.phoneNumber}
				helperText={errors.phoneNumber?.message} />

			{
				addRegistrationIsPending && <Spinner />
			}

			{
				errorCode &&
				<ErrorMessage errorCode={errorCode ?? ''} />
			}

			[TODO] INFORMATIVA PRIVACY

			<div className={classNames.minors}>
				<div className={classNames.header}>
					<h3>{RegistrationPageStrings.MinorsSectionTitle}</h3>
					<Button
						type="submit"
						variant="contained"
						onClick={(e) => {
							e.preventDefault();
							setIsMinorModalOpen(true);
						}}
						title={RegistrationPageStrings.AddMinor}>
						<AddIcon />
					</Button>
				</div>
				<p>{RegistrationPageStrings.MinorsSectionText}</p>
				<div className={classNames.buttonsContainer}>
					{minors.map((m, idx) =>
						<Minor
							index={idx}
							minor={m}
							onDelete={onMinorDelete}
							onChange={onMinorChange}
							key={`${idx}${m.firstName}`} />)}
				</div>
			</div>
			<Button type="submit" variant="contained">
				{STRINGS.Register}
			</Button>
		</Box>
		<MinorForm
			onSubmit={onMinorAdd}
			open={isMinorModalOpen}
			onClose={() => setIsMinorModalOpen(false)} />
	</div>;
}