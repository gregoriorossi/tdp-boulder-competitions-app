import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GENDERS, type IRegistration } from "../../models/competitions.models";
import { STRINGS } from "../../consts/strings.consts";
import classNames from "../../App.module.scss";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema, type IRegistrationForm } from "../../form-schemas/registrations.schemas";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { genderToString } from "../../utils/competitions.utils";
import { useAddRegistration } from "../../queries/registrations.queries";
import type { IAddRegistrationRequest } from "../../models/api.models";
import { Spinner } from "../Spinner";
import { Errors } from "../../consts/errors.consts";
import { ErrorMessage } from "../ErrorMessage";
const FormStrings = STRINGS.Forms.Registration;
const FieldsStrings = FormStrings.Fields;

interface IRegistrationFormProps {
	registration?: IRegistration;
	competitionId: string;
	onChange: () => void;
}

export function RegistrationForm(props: IRegistrationFormProps) {
	const { registration, competitionId } = props;
	const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(registrationSchema)
	});

	const { data: addRegistrationData, error: addRegistrationError, mutateAsync: addRegistrationMutateAsync, isPending: addRegistrationIsPending } = useAddRegistration(competitionId);
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

	return <Box
		className={classNames.form}
		component="form"
		onSubmit={handleSubmit(onSubmit)}	>

		<TextField
			label={FieldsStrings.FirstName}
			{...register("firstName")}
			defaultValue={registration?.competitor?.firstName}
			error={!!errors.firstName}
			helperText={errors.firstName?.message} />

		<TextField
			label={FieldsStrings.LastName}
			{...register("lastName")}
			defaultValue={registration?.competitor?.lastName}
			error={!!errors.lastName}
			helperText={errors.lastName?.message} />

		<TextField
			label={FieldsStrings.Email}
			{...register("email")}
			defaultValue={registration?.email}
			error={!!errors.email}
			helperText={errors.email?.message} />

		<Controller
			name="birthDate"
			control={control}
			defaultValue={registration?.competitor ? new Date(registration.competitor.birthDate) : undefined}
			render={
				({ field }) => {
					const dayJsValue: Dayjs | null = field.value ? dayjs(field.value) : null;
					return (
						<DateTimePicker
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
							ampm={false}
							format="DD/MM/YYYY" />
					)
				}} />

		<FormControl error={!!errors.gender} className={classNames.select}>
			<InputLabel>{FieldsStrings.Gender}</InputLabel>
			<Controller
				name="gender"
				control={control}
				defaultValue={registration?.competitor.gender}
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
			defaultValue={registration?.competitor.birthPlace}
			error={!!errors.birthPlace}
			helperText={errors.birthPlace?.message} />

		<TextField
			label={FieldsStrings.BirthProvince}
			{...register("birthProvince")}
			defaultValue={registration?.competitor.birthProvince}
			error={!!errors.birthProvince}
			helperText={errors.birthProvince?.message} />

		<TextField
			label={FieldsStrings.AddressCity}
			{...register("addressCity")}
			defaultValue={registration?.competitor.addressCity}
			error={!!errors.addressCity}
			helperText={errors.addressCity?.message} />

		<TextField
			label={FieldsStrings.AddressProvince}
			{...register("addressProvince")}
			defaultValue={registration?.competitor.addressProvince}
			error={!!errors.addressProvince}
			helperText={errors.addressProvince?.message} />

		<TextField
			label={FieldsStrings.AddressStreet}
			{...register("addressStreet")}
			defaultValue={registration?.competitor.addressStreet}
			error={!!errors.addressStreet}
			helperText={errors.addressStreet?.message} />

		<TextField
			label={FieldsStrings.AddressNumber}
			{...register("addressNumber")}
			defaultValue={registration?.competitor.addressNumber}
			error={!!errors.addressNumber}
			helperText={errors.addressNumber?.message} />

		<TextField
			label={FieldsStrings.PhoneNumber}
			{...register("phoneNumber")}
			defaultValue={registration?.competitor.phoneNumber}
			error={!!errors.phoneNumber}
			helperText={errors.phoneNumber?.message} />

		{
			addRegistrationIsPending && <Spinner />
		}

		{
			errorCode &&
			<ErrorMessage errorCode={errorCode ?? ''} />
		}

		<Button type="submit" variant="contained">
			{STRINGS.Save}
		</Button>
	</Box>;
}