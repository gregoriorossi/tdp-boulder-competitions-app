import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BaseModal, type IBaseModalProps } from "../../../../../../components/modals/BaseModal";
import { STRINGS } from "../../../../../../consts/strings.consts";
import classNames from "../../../../../../App.module.scss";
import { Spinner } from "../../../../../../components/Spinner";
import { ErrorMessage } from "../../../../../../components/ErrorMessage";
import { sendSpecialProblemSchema } from "../../../../../../form-schemas/competitions.schemas";
import { useSendSpecialProblem } from "../../../../../../queries/editors.queries";

const FormStrings = STRINGS.Pages.EditorCompetitionPage.ManageResults.Modals.SendSpecialProblem;

interface ISendSpecialProblemModalProps extends IBaseModalProps {
	competitionId: string;
	competitorId: string;	
	specialProblemId: string;
	onSend: () => void;
}

interface ISendSpecialProblemFields {
	date: Date;
}

export function SendSpecialProblemModal(props: ISendSpecialProblemModalProps) {
	const { competitionId } = props;
	const { handleSubmit, control, formState: { errors }, reset } = useForm({
		resolver: yupResolver(sendSpecialProblemSchema),
		defaultValues: {
			date: new Date()
		}
	});

	const { data: sendSpecialProblemResponse, error, mutateAsync: sendSpecialProblemAsync, isPending: sendSpecialProblemIsPending } = useSendSpecialProblem(competitionId);

	const onSubmit = async (data: ISendSpecialProblemFields): Promise<void> => {
		if (sendSpecialProblemIsPending) return;

		const result = await sendSpecialProblemAsync({
			competitionId: competitionId,
			competitorId: props.competitorId,
			specialProblemId: props.specialProblemId,
			sentAt: data.date	
		});

		if (result?.isSuccess) {
			props.onSend();
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
								format={STRINGS.DateFormats.DateTime} />
						)
					}} />

			{
				sendSpecialProblemIsPending && <Spinner />
			}

			{
				(error || sendSpecialProblemResponse?.error?.description) &&
				<ErrorMessage errorCode={sendSpecialProblemResponse?.error?.code ?? ''} />
			}

			<Button type="submit" variant="contained" disabled={sendSpecialProblemIsPending}>
				{STRINGS.Confirm}
			</Button>
		</Box>
	</BaseModal >
}