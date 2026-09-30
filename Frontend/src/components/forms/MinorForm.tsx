import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GENDERS, type ICompetitor } from "../../models/competitions.models";
import { STRINGS } from "../../consts/strings.consts";
import classNames from "../../App.module.scss";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { minorSchema, type IMinorForm } from "../../form-schemas/registrations.schemas";
import dayjs, { Dayjs } from "dayjs";
import { genderToString } from "../../utils/competitions.utils";
import type { IMinorRequest } from "../../models/api.models";
import { Spinner } from "../Spinner";
import { Errors } from "../../consts/errors.consts";
import { ErrorMessage } from "../ErrorMessage";
import { useAddMinor, useUpdateMinor } from "../../queries/editors.queries";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const FormStrings = STRINGS.Forms.Registration;
const FieldsStrings = FormStrings.Fields;

interface IMinorFormProps {
	minor?: ICompetitor;
	competitionId: string;
	registrationId: string;	
	onChange: (minor: ICompetitor) => void;
}

export function MinorForm(props: IMinorFormProps) {
	const { minor, competitionId, registrationId, onChange } = props;
	const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(minorSchema)
	});

	const { data: addMinorData, error: addMinorError, mutateAsync: addMinorMutateAsync, isPending: addMinorIsPending } = useAddMinor(competitionId, registrationId);
	const { data: updateMinorData, error: updateMinorError, mutateAsync: updateMinorMutateAsync, isPending: updateMinorIsPending } = useUpdateMinor(competitionId, registrationId);

	const errorCode: string | null = addMinorData?.error?.code ?? updateMinorData?.error?.code ?? (addMinorError ? Errors.Generic : null) ?? (updateMinorError ? Errors.Generic : null);

	const onSubmit = async (data: IMinorForm) => {
		if (addMinorIsPending || updateMinorIsPending) return;

		const request: IMinorRequest = {
			id: minor?.id,
			firstName: data.firstName,
			lastName: data.lastName,
			gender: data.gender,
			addressCity: data.addressCity,
			addressNumber: data.addressNumber,
			addressProvince: data.addressProvince,
			addressStreet: data.addressStreet,
			birthDate: data.birthDate,
			birthPlace: data.birthPlace,
			birthProvince: data.birthProvince
		};

		const result = minor ? await updateMinorMutateAsync(request) : await addMinorMutateAsync(request);
		if (result.isSuccess) {
			reset();
			onChange(result.value!);
		}
	}

	return <Box
		className={classNames.form}
		component="form"
		onSubmit={handleSubmit(onSubmit)}>

		<TextField
			label={FieldsStrings.FirstName}
			{...register("firstName")}
			defaultValue={minor?.firstName}
			error={!!errors.firstName}
			helperText={errors.firstName?.message} />

		<TextField
			label={FieldsStrings.LastName}
			{...register("lastName")}
			defaultValue={minor?.lastName}
			error={!!errors.lastName}
			helperText={errors.lastName?.message} />

		<Controller
			name="birthDate"
			control={control}
			defaultValue={minor?.birthDate ? new Date(minor.birthDate) : undefined}
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
				defaultValue={minor?.gender}
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
			defaultValue={minor?.birthPlace}
			error={!!errors.birthPlace}
			helperText={errors.birthPlace?.message} />

		<TextField
			label={FieldsStrings.BirthProvince}
			{...register("birthProvince")}
			defaultValue={minor?.birthProvince}
			error={!!errors.birthProvince}
			helperText={errors.birthProvince?.message} />

		<TextField
			label={FieldsStrings.AddressCity}
			{...register("addressCity")}
			defaultValue={minor?.addressCity}
			error={!!errors.addressCity}
			helperText={errors.addressCity?.message} />

		<TextField
			label={FieldsStrings.AddressProvince}
			{...register("addressProvince")}
			defaultValue={minor?.addressProvince}
			error={!!errors.addressProvince}
			helperText={errors.addressProvince?.message} />

		<TextField
			label={FieldsStrings.AddressStreet}
			{...register("addressStreet")}
			defaultValue={minor?.addressStreet}
			error={!!errors.addressStreet}
			helperText={errors.addressStreet?.message} />

		<TextField
			label={FieldsStrings.AddressNumber}
			{...register("addressNumber")}
			defaultValue={minor?.addressNumber}
			error={!!errors.addressNumber}
			helperText={errors.addressNumber?.message} />

		{
			addMinorIsPending && <Spinner />
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