import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { STRINGS } from "../../consts/strings.consts";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useAddCompetition } from "../../queries/competitions.queries";
import { ErrorMessage } from "../ErrorMessage";
import classNames from "../../App.module.scss";
import { BaseModal, type IBaseModalProps } from "./BaseModal";
import { addCompetitionSchema } from "../../form-schemas/competitions.schemas";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Spinner } from "../Spinner";


const FormStrings = STRINGS.Modals.NewCompetition;

interface INewCompetitionModalProps extends IBaseModalProps {
	onCreated: () => void;
}

interface INewCompetitionFields {
	title: string;
	date: Date;
}

export function NewCompetitionModal(props: INewCompetitionModalProps) {
	const { handleSubmit, register, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(addCompetitionSchema)
	});

	const { data: addCompetitionResponse, error, mutateAsync: addCompetitionAsync, addSpecialProblemIsPending } = useAddCompetition();

	const onSubmit = async (data: INewCompetitionFields): Promise<void> => {
		if (addSpecialProblemIsPending) return;

		const result = await addCompetitionAsync({ title: data.title, date: data.date });
		if (result?.isSuccess) {
			props.onCreated();
			reset();
		}
	}

	return <BaseModal
		title={FormStrings.Title}
		open={props.open}
		onClose={props.onClose}>
		<Box className={classNames.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}>

			<TextField
				label={FormStrings.Fields.Title}
				{...register("title")}
				error={!!errors.title}
				helperText={errors.title?.message} />

			<Controller
				name="date"
				control={control}
				render={
					({ field }) => {
						const dayJsValue: Dayjs | null = field.value ? dayjs(field.value) : null;
						return (
							<DateTimePicker
								label={FormStrings.Fields.Date}
								value={dayJsValue}
								onChange={(newValue) => {
									field.onChange(newValue ? newValue.toDate() : null);
								}}
								slotProps={{
									textField: {
										error: !!errors.date,
										helperText: errors.date?.message as string | undefined,
										fullWidth: true
									}
								}}
								ampm={false}
								format="DD/MM/YYYY HH:mm" />
						)
					}} />

			{
				addSpecialProblemIsPending && <Spinner />
			}

			{
				(error || addCompetitionResponse?.error?.description) &&
				<Alert severity="error">
					<ErrorMessage errorCode={addCompetitionResponse?.error?.code ?? ''} />
				</Alert>
			}

			<Button type="submit" variant="contained" disabled={addSpecialProblemIsPending}>
				{STRINGS.Create}
			</Button>
		</Box>
	</BaseModal >
}