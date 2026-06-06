import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import classNames from "../../../App.module.scss";
import { Controller, useForm } from "react-hook-form";
import { GENDERS } from "../../../models/competitions.models";
import { STRINGS } from "../../../consts/strings.consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { minorSchema, type IMinorForm } from "../../../form-schemas/registrations.schemas";
import { BaseModal, type IBaseModalProps } from "../../../components/modals/BaseModal";
import { genderToString } from "../../../utils/competitions.utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const FormStrings = STRINGS.Forms.Registration;
const FieldsStrings = FormStrings.Fields;
import dayjs, { Dayjs } from "dayjs";

interface IMinorFormProps extends IBaseModalProps {
	minor?: IMinorForm;
	onSubmit: (minor: IMinorForm) => void;
}

export function MinorForm(props: IMinorFormProps) {
	const { onSubmit, open, onClose, minor } = props;

	const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(minorSchema)
	});

	const onSubmitFn = (data: IMinorForm) => {
		onSubmit(data);
		reset();
		onClose();
	}

	return <BaseModal
		className={classNames.editProblemsGroupsModal}
		open={open}
		onClose={onClose}>
		<Box
			className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmitFn)}>

			<TextField
				label={FieldsStrings.FirstName}
				{...register("firstName")}
				error={!!errors.firstName}
				defaultValue={minor?.firstName}
				helperText={errors.firstName?.message} />

			<TextField
				label={FieldsStrings.LastName}
				{...register("lastName")}
				error={!!errors.lastName}
				defaultValue={minor?.lastName}
				helperText={errors.lastName?.message} />

			<Controller
				name="birthDate"
				defaultValue={minor?.birthDate}
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
					defaultValue={minor?.gender}
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
				defaultValue={minor?.birthPlace}
				helperText={errors.birthPlace?.message} />

			<TextField
				label={FieldsStrings.BirthProvince}
				{...register("birthProvince")}
				error={!!errors.birthProvince}
				defaultValue={minor?.birthProvince}
				helperText={errors.birthProvince?.message} />

			<TextField
				label={FieldsStrings.AddressCity}
				{...register("addressCity")}
				error={!!errors.addressCity}
				defaultValue={minor?.addressCity}
				helperText={errors.addressCity?.message} />

			<TextField
				label={FieldsStrings.AddressProvince}
				{...register("addressProvince")}
				error={!!errors.addressProvince}
				defaultValue={minor?.addressProvince}
				helperText={errors.addressProvince?.message} />

			<TextField
				label={FieldsStrings.AddressStreet}
				{...register("addressStreet")}
				error={!!errors.addressStreet}
				defaultValue={minor?.addressStreet}
				helperText={errors.addressStreet?.message} />

			<TextField
				label={FieldsStrings.AddressNumber}
				{...register("addressNumber")}
				error={!!errors.addressNumber}
				defaultValue={minor?.addressNumber}
				helperText={errors.addressNumber?.message} />

			<Button type="submit" variant="contained">
				{minor ? STRINGS.Edit : STRINGS.Add}
			</Button>
		</Box>
	</BaseModal>
}